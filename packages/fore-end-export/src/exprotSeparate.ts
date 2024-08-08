/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import XLSXStyle from 'zhy-xlsx-style';
import {currentLanguage} from '@jusda-tools/language-control-panel';
import './../utils/index.css';
import './../utils/nprogress.css';
import NProgress from '../utils/nprogress.js';
import { Spin } from '../utils/Spin.js';
import { isFunction,getType } from '../utils/index.js';
import scriptContent from './worker/separate.js';
// import xlsxFullMinContent from "./worker/xlsx.full.min.js"
// import shimMinContent from "./worker/shim.min.js"
interface Columns {
    width?: number;
    title?: string;
    dataIndex?: string;
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
export  function getExportStatus() {
    return exportStatus;
}
interface ExportFnParms {
    data: any[]; columns?: any[];
    flieName?: string;
    lifecycleConfig?: {
        create?: () => void;
        dataHandle?: () => void;
        fileHandle?: () => void;
        end?: () => void;
    };
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


}


export  const exprotSeparate = (
    { data = [],
        columns = [],
        flieName = `${Date.now()}.xlsx`,
        lifecycleConfig = {
            create: () => { },
            dataHandle: () => { },
            fileHandle: () => { },
            end: () => { },
        },
        valueFormat = {
        },
        animationConfig = {

        },
        widthAuto = true,
        headerColor = 'fffbea',
        xlsxFullMinURL=jusdaBaseConfig?._xlsxFullMinURL?jusdaBaseConfig?._xlsxFullMinURL:'https://oss.jus-link.com/staticfiles/fe/xlsx.min.js',
        shimMinURL=jusdaBaseConfig?._shimMinURL? jusdaBaseConfig?._shimMinURL:'https://oss.jus-link.com/staticfiles/fe/shim.min.js',
    }: ExportFnParms,
) => {

    const {
        dataProcessing = false,
        filing = true,
        filiPromptText =currentLanguage()?.includes('zh')? '文件生成中':'File completion',
    } = animationConfig;
    exportStatus = 'start';
    const worker = new Worker(scriptURL);
    if (isFunction(lifecycleConfig.create)) lifecycleConfig.create!();
    async function startWorker() {
        dataProcessing && requestAnimationFrame(() => NProgress.start());
        exportStatus = 'dataProcessing';
        if (isFunction(lifecycleConfig.dataHandle)) lifecycleConfig.dataHandle!();

        const deepcolumns = columns.map((i) => {
            let obj={};
            for (let k in i) {
                if (getType(i[k])==='string'||getType(i[k])==='number') {
                    obj[k]=i[k];
                }
            }
            return obj;
        });

        worker.postMessage({ columns:deepcolumns, data, valueFormat, widthAuto, headerColor,xlsxFullMinURL,shimMinURL});
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
            if (!regex.test(flieName)) {
                flieName = flieName + '.xlsx';
            }
            saveAsFile(new Blob([s2ab(wbout)]), flieName);

            filing && spin.end();

            exportStatus = 'end';
            if (isFunction(lifecycleConfig.end)) lifecycleConfig.end!();
        });
    };
    return;
};


