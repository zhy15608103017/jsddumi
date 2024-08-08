/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import  XLSXStyle from 'zhy-xlsx-style';
import {currentLanguage} from '@jusda-tools/language-control-panel';
import './../utils/index.css';
import './../utils/nprogress.css';
import NProgress from './../utils/nprogress.js';
import { Spin } from './../utils/Spin.js';
import { isFunction,getType,deepClone } from '../utils/index.js';
import scriptContent from './worker/worker.js';
interface Columns {
    width?: number|string;
    title?: string;
    dataIndex?: string;
    exportColumnName: string;
    [key: string]: any;
}
interface Window{
    jusdaBaseConfig: any;
}
const {jusdaBaseConfig}=window as unknown as Window;
function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}
const saveAsFile = (blob, fileName) => {
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href); // 释放URL 对象
};
const scriptBlob = new Blob([scriptContent], {
    type: 'application/javascript',
});
const scriptURL = URL.createObjectURL(scriptBlob);
// const xlsxFullMinContentBlob = new Blob([xlsxFullMinContent], {
//     type: 'application/javascript',
// });
// const xlsxFullMinURL = URL.createObjectURL(xlsxFullMinContentBlob);

// const shimMinContentBlob = new Blob([shimMinContent], {
//     type: 'application/javascript',
// });
// const shimMinURL = URL.createObjectURL(shimMinContentBlob);
let exportStatus = 'init';
export function getExportStatus() {
    return exportStatus;
}
interface ExportFnParms {
    searchFn?: (pages?: number) => Promise<{
        data: any[];
        page: number;
        total: number;
    }>;
    columns?: any[];
    expandColumns: Columns[];
    fileName?: string;
    lifecycleConfig?: {
        create?: () => void;
        dataHandle?: () => void;
        fileHandle?: () => void;
        end?: () => void;
    };
    proTableKey?: string;
    valueFormat?: object;
    animationConfig?: {
        dataProcessing?: boolean;
        filing?: boolean;
        filiPromptText?: string;
    };
    widthAuto?: boolean;
    headerColor?: string;
    xlsxFullMinURL?: string;
    shimMinURL?: string;
    data: any[];

}

/**
 * 默认获取localStorage中proTableConfig值的集合，当key存在时， 获取对应key的值
 *@param key: 索引
 * **/
const getStorageObj = (key: string) => {
    const result = JSON.parse(
        localStorage.getItem('proTableConfig') || '{}'
    );
    return result[key];
};
export const exportProtable = (
    { searchFn = async (): Promise<{ data: any[]; page: number; total: number }> => { return { data: [], page: 1, total: 1 }; },
        columns = [],
        fileName = `${Date.now()}.xlsx`,
        lifecycleConfig = {
            create: () => { },
            dataHandle: () => { },
            fileHandle: () => { },
            end: () => { },
        },
        proTableKey = '',
        valueFormat = {
        },
        animationConfig = {
   
        },
        expandColumns=[],
        widthAuto=true,
        headerColor='fffbea',
        xlsxFullMinURL=jusdaBaseConfig?._xlsxFullMinURL?jusdaBaseConfig?._xlsxFullMinURL:'https://oss.jus-link.com/staticfiles/fe/xlsx.min.js',
        shimMinURL=jusdaBaseConfig?._shimMinURL? jusdaBaseConfig?._shimMinURL:'https://oss.jus-link.com/staticfiles/fe/shim.min.js',
        data:tableList
    }: ExportFnParms,
) => {
    const {
        dataProcessing = false,
        filing = true,
        filiPromptText =currentLanguage()?.includes('zh')? '文件生成中':'File completion',
    } = animationConfig;
    exportStatus = 'start';
    const worker = new Worker(scriptURL);
    async function getData() {
        let data: any[] = [];
        let page;
        async function send(pages?: any) {
  
            let res;
            if (pages!==null||pages!==undefined) {
                res = await searchFn(pages);
            } else {
                res = await searchFn();
            }
            data = [...data, ...(res.data)];
            page = res.page;
            if(page===null||page===undefined){
                return;
            }
            if (page < res.total && res.data.length ) {
                page++;
                await send(page);
            }

        }
        await send();

        return data;
    }
    if (isFunction(lifecycleConfig.create)) lifecycleConfig.create!();

    async function startWorker() {
        dataProcessing && requestAnimationFrame(() => NProgress.start());
        exportStatus = 'dataProcessing';
        if (isFunction(lifecycleConfig.dataHandle)) lifecycleConfig.dataHandle!();
        
        const data =tableList? tableList:await getData();
        const proTableConfigObj = getStorageObj(proTableKey);

        const deepcolumns = columns.map((i) => {
            let obj={};
            for (let k in i) {
                if (getType(i[k])==='string'||getType(i[k])==='number') {
                    obj[k]=i[k];
                }
            }
            return obj;
        });
        
        worker.postMessage({ columns:deepcolumns, data, valueFormat, proTableConfigObj,widthAuto,headerColor ,expandColumns,xlsxFullMinURL,shimMinURL});
    }

    startWorker();

    worker.onmessage = async (event) => {
        dataProcessing && requestAnimationFrame(() => NProgress.done());
        const spin = new Spin(filiPromptText);

        filing && spin.start();

        exportStatus = 'filing';
        if (isFunction(lifecycleConfig.fileHandle)) lifecycleConfig.fileHandle!();
        requestIdleCallback(() => {
            var wopts = { bookType: 'xlsx', bookSST: false, type: 'binary' };
            var wbout = XLSXStyle.write(event.data.workbook, wopts);// 使用xlsx-style 写入
            const regex = /(\.xlsx|\.csv)$/;
            if(!regex.test(fileName)){
                fileName=fileName+'.xlsx';
            }
            saveAsFile(new Blob([s2ab(wbout)]), fileName);

            filing && spin.end();

            exportStatus = 'end';
            if (isFunction(lifecycleConfig.end)) lifecycleConfig.end!();
        });
    };
    return;
};


