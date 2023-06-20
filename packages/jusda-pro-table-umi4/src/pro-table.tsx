// @ts-nocheck
import React, { useState, useEffect, Fragment } from "react";
import { ProTable } from "@ant-design/pro-components";
import { ConfigProvider } from "antd";
import { currentLanguage } from "@jusda-tools/language-control-panel";
import { useAppData, matchRoutes, useLocation } from 'umi'
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";
import type { ResizeCallbackData } from "react-resizable";
import type { ColumnsType, ColumnType } from "antd/es/table";
import enUS from "antd/lib/locale/en_US";
import zhCN from "antd/lib/locale/zh_CN";
import _ from "lodash";
import type { ProTableProps } from '@ant-design/pro-table';
import'./index.less';

//##pro-table的columnsState的值将会存储在localstorage中proTableConfig中，
//key的命名规则是clientId-cfgType-pathname-customizeKey（一定要区分环境）
//加入Resizable实现表格列的拖动宽度(width:必须给具体的数值<number>，不给的情况下，超过scroll宽度，会出现列消失的bug，)


interface ITableProps {
    resizable?: boolean;
    propColumnsStateValue?: {any: any};
    customizeKey?: string;
}

const ResizableTitle = (props: { [x: string]: any; onResize: any; width: any; }) => {
    const { onResize, width, ...restProps } = props;
    if (width === undefined) {
        return <th {...restProps} ></th>;
    } else {
        return (
            <Resizable
                handle={
                    <span
                        className="react-resizable-handle"
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                        }}
                    />
                }
                minConstraints={[50]}
                width={width}
                draggableOpts={{ enableUserSelectHack: false }}
                height={0}
                onResize={onResize}>
                <th
                    style={{ ...restProps?.style, userSelect: "none" }}
                    {...restProps} ></th>
            </Resizable>
        );
    }
};

function JusdaProTable(props: ProTableProps & ITableProps) {
    const {
        onChange,
        loading,
        scroll,
        dataSource,
        rowKey,
        pagination,
        toolbar,
        toolBarRender,
        options,
        columnsStateFlag = true,
        customizeKey = "",
        propColumnsStateValue = {},
        className,
        resizable,
        size = "large"
    } = props;
    const clientId = window?.jusdaBaseConfig?.clientId;
    const cfgType = window?.jusdaBaseConfig?.cfgType;
    const appData = useAppData();
    const { clientRoutes } = appData;
    const location = useLocation();
    const matches = matchRoutes(clientRoutes, location.pathname);
    const locationRouter = (matches || []).filter((item: any) => { return item.pathname === location.pathname })
    const pathname = locationRouter.length > 0 ? locationRouter[0].route.path : "";
    // const [columns, setColumns] = useState(() => { return _.cloneDeep(props?.columns || [])});
    // const [initColumns, setInitColumns] = useState(() => { return  _.cloneDeep(props?.columns || [])});

    const [columns, setColumns] = useState(props?.columns.map(i => ({ ...i })));
    const [initColumns, setInitColumns] = useState(props?.columns.map(i => ({ ...i })));
    const [columnsStateValue, setColumnsStateValue] = useState({});
    const [tableSize, setTableSize] = useState(size);

    const components = {
        header: {
            cell: ResizableTitle
        }
    };

    /**
     * 默认获取localStorage中proTableConfig值的集合，当key存在时， 获取对应key的值
     *@param key: 索引
     * **/
    const getStorageObj = (key?: string) => {
        const result =  JSON.parse(
            localStorage.getItem("proTableConfig") || "{}"
        );
        if (key) {
            return result[key];
        }
        return result;
    }

    const setStorageObj = (obj: {}) => {
        localStorage.setItem(
            "proTableConfig",
            JSON.stringify(
                {
                    ... getStorageObj(),
                    ...obj,
                }
            )
        );
    }

    const handleResize = (index: number) => (e: React.SyntheticEvent<Element>, { size }: ResizeCallbackData) => {
        const nextColumns = [...columns];
        nextColumns[index] = {
            ...nextColumns[index],
            width: size?.width
        };
        setColumns(nextColumns);
        const key = nextColumns[index].dataIndex || nextColumns[index].key || index;
        const storageObj = getStorageObj()[initTablePersistenceKey()];
        storageObj[key] = { ...getStorageObj()[initTablePersistenceKey()][key], width: nextColumns[index]?.width };
        setStorageObj({ [initTablePersistenceKey()]: storageObj });
    };

    const mergeColumns: ColumnsType<any> = columns.map((col: ColumnType<[]>, index: number) => ({
        ...col,
        onHeaderCell: (column: any) => ({
            width: column?.width && typeof column?.width === "number" ? column?.width : 100, // 对width容错处理，如果不是number时转化为默认的100
            onResize: handleResize(index) as React.ReactEventHandler<any>
        })
    }));

    const deleteKey = (key: string) => {
        const proTableConfig = localStorage.getItem("proTableConfig")
            ? JSON.parse(localStorage.getItem("proTableConfig") || "")
            : {};
        Reflect.deleteProperty(proTableConfig, key);
        localStorage.setItem("proTableConfig", JSON.stringify(proTableConfig));
    };

    //初始化生成表格的唯一key
    const initTablePersistenceKey = () => {
        return `${clientId}-${cfgType}-${pathname}${customizeKey ? `-${customizeKey}` : ""
        }`;
    };

    /**
     * 计算表格的ColumnsStateValue
     * @param newPropsColumns: [any]  接收的新columns数组
     * **/
    const columnTransformValue = (newPropsColumns?: [any]) => {
        let result = {} as any;
        //如果有自定义ColumnsStateValue,则优先使用自定义的
        if (Object.keys(propColumnsStateValue).length > 0) {
            result = propColumnsStateValue;
            // setColumnsStateInitValue(propColumnsStateValue);
        } else {
            result = columnsStateValueIsUpdate(newPropsColumns);
        }
        setColumnsStateValue(result);
        setStorageObj({ [initTablePersistenceKey()]: result })
    };

    /**
     * 判断目前的ColumnsStateValue和localstorage中的是否一致，一致说明没有更新，否则就是更新了配置，使用新的配置在存储
     * @param newPropsColumns: [any]  接收的新columns数组
     * **/
    const columnsStateValueIsUpdate = (newPropsColumns?: [any]) => {
        const res = {} as any;
        const storageObj = getStorageObj()[initTablePersistenceKey()];
        const data = ((newPropsColumns || columns || []))
        data.forEach((item: any, index: number) => {
            const key = item.dataIndex || item.key || index;
            // 利用localstorage中存储的值覆盖本身的width， 如果没有则取自己的width
            item.width =  storageObj?.[key]?.width || item.width;
            res[key] = {
                // ...item,
                order:  storageObj?.[key]?.order ?? index,
                show:  storageObj?.[key]?.show,
                fixed: item?.fixed,
                disable: item?.disable,
                width: item?.width,
            };
        });
        setColumns(data);
        // 在localstorage中存在配置与否不重要，重点是存在时和当前columnsStateValue的dataIndex和长度是否一致。
        if (
            getStorageObj([initTablePersistenceKey()]) &&
            _.isEqual(
                Object.keys(getStorageObj([initTablePersistenceKey()])),
                Object.keys(res)
            )
        ) {
            return getStorageObj([initTablePersistenceKey()]);
        }
        return res;
    };

    useEffect(() => {
        // console.log('start', customizeKey, props.columns);
        columnTransformValue();
    }, []);

    useEffect(() => {
        const newPropsColumns = props.columns || [];
        // console.log('props.columns', customizeKey, props.columns);
        setInitColumns(newPropsColumns.map(i => ({ ...i })));
        columnTransformValue(newPropsColumns);
    }, [props.columns, customizeKey]);

    /**
     * 使用localstorage中的proTableConfig的width值
     * **/
    const useStorageProTableConfigData = (result: []) => {
        const data = getStorageObj(initTablePersistenceKey());
        const mergeResult = (result);
        Object.keys(mergeResult).forEach(item => {
            mergeResult[item] = {
                ...result[item],
                width: data[item]?.width,
                order: typeof result[item]?.order === 'number' ?  result[item]?.order : data[item]?.order,
            }
        })
        return mergeResult;
    }

    const columnsStateRes = () => {
        if (columnsStateFlag) {
            return {
                value: columnsStateValue,
                onChange(value: any) {
                    if (Object.keys(value).length < 1) {
                        //重置时清除配置
                        deleteKey(initTablePersistenceKey());
                        columnTransformValue(initColumns);
                    } else {
                        const result = useStorageProTableConfigData(value);
                        // 单独选中或取消一行 和 全选列展示  返回的value不一样，缺少order等参数
                        setColumnsStateValue(result);
                        setStorageObj({ [initTablePersistenceKey()]: result });
                    }
                }
            };
        }
        return {};
    };
    return (
        <div className="jusda-pro-table-umi4">
            <ConfigProvider locale={currentLanguage()?.includes("zh") ? zhCN : enUS}>
                <ProTable
                    {...props}
                    onChange={onChange}
                    loading={loading}
                    columnEmptyText={false}
                    scroll={scroll || { x: 1100 }}
                    columns={resizable ? mergeColumns : columns}
                    components={components}
                    dataSource={dataSource}
                    columnsState={columnsStateRes()}
                    rowKey={rowKey}
                    locale={{locale: currentLanguage()?.includes('zh') ? zhCN : enUS, ...props?.locale}}
                    pagination={pagination}
                    toolbar={toolbar}
                    options={
                        options || {
                            reload: false
                        }
                    }
                    size={ getStorageObj('proTableSize') || tableSize}
                    onSizeChange={(size: any) => { setTableSize(size); setStorageObj({  proTableSize: size });}}
                    toolBarRender={toolBarRender}
                />
            </ConfigProvider>
        </div>
    );
}

export default JusdaProTable;


