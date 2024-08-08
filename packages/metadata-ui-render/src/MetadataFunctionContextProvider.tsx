/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';
import MetadataFunctionContext from './metadataFunctionContext';
import { getTenantFunctionConfiguration } from './service';
import moment from 'moment';
import { DateElementType } from './enums';

enum DataFetchState {
    'DEFAULT', 'PENDING', 'FULFILLED'
}

interface MetadataFunctionContextProviderProps
    extends React.ComponentProps<
        keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
    > {
    functionCode: string;
    tenantCode?: string;
}

function mergeSchemaWithLabelConf(schema: any, propsConf: any[]) {
    if (!schema) return schema;
    const { properties } = schema;
    if (!properties || !propsConf?.length) return schema;
    Object.keys(properties).forEach((propName) => {
        const propInfo = propsConf.find(ele => ele.propertyName === propName);
        if (!propInfo) return;
        properties[propName].title = propInfo.label || propInfo.propertyName;
    });
    return schema;
}
function MetadataFunctionContextProvider(props: MetadataFunctionContextProviderProps) {
    const { children, value, tenantCode, functionCode } = props;
    const [loading, setLoading] = useState(false);
    const [dataFetchState, setDataFetchState] = useState<DataFetchState>(DataFetchState.DEFAULT);
    const [data, setData] = useState<any>(null);
    const _tenantCode = tenantCode || (window as any)?.jusdaUserInfo?.data?.userIdentity?.tenant?.tenantCode;


    async function init(code: string, _tenantCode: string) {
        setDataFetchState(DataFetchState.PENDING);
        setLoading(true);
        const resp = await getTenantFunctionConfiguration(_tenantCode, {
            functionCode: code
        });
        const { success, data } = resp;
        setDataFetchState(DataFetchState.FULFILLED);
        setLoading(false);
        if (success) {
            const { tenantFunctionConfig } = data;
            const { customAreaUiList: UIConfigs, extensionalPropertyUiList = [] } = tenantFunctionConfig;
            try {
                const objectedSchemaUIConfig = UIConfigs?.map(uiConfig => {
                    const { schema, standardModelCode, ...rest } = uiConfig;
                    if (rest.extensionalPropertyUiList) {
                        delete rest.extensionalPropertyUiList;  //  v1.3.0版本移除customAreaUiList下extensionalPropertyUiList字段
                    }
                    return {
                        ...rest,
                        schema: schema ? mergeSchemaWithLabelConf(JSON.parse(schema), extensionalPropertyUiList?.filter(item => item.modelCode === standardModelCode)) || [] : {},
                    };
                });
                setData({ ...tenantFunctionConfig, customAreaUiList: objectedSchemaUIConfig });
            } catch (err) {
                setData(null);
                console.warn('Schema parsing failed!');
            }
            return;
        }
        setData(null);

    }

    function getConfOfStandardProperties(pathLists: string[]) {
        const { propertyConfigs, propertyUiList } = data || {};
        return pathLists?.map((path) => {
            const propertyConfig = propertyConfigs?.find(ele => ele.propertyPath === path);
            const propertyUI = propertyUiList?.find(ele => ele.propertyPath === path);
            return {
                ...propertyConfig,
                propertyUI
            };

        });
    }

    function getUIConfOfCustomAreas(areaCodes: string[]) {
        const { customAreaUiList } = data || {};
        return areaCodes?.map((code) => {
            const propertyConfig = customAreaUiList?.find(ele => ele.areaCode === code);
            return propertyConfig;
        });
    }

    function formatValueAccordToCustomAreaConf(
        value: { [key: string]: any },
        areaCode: string,
        options?: {
            valueHandler?: (
                value: any,
                propertyConfig: { name: string;[key: string]: any; dataElement: { type: DateElementType; formatStrategy: any;[key: string]: string } }
            ) => any;
        }) {
        if (!value || !areaCode || !data) return value;
        const {  customAreaUiList, extensionalPropertyConfigs } = data;
        const targetModelCode = customAreaUiList?.find(ele => ele.areaCode === areaCode)?.standardModelCode;
        if (!targetModelCode) return value;
        // const { extensionalProperties } = targetModelInfo || {};
        const extensionalProperties = extensionalPropertyConfigs?.filter(ele=> ele.modelCode === targetModelCode)||[];
        if (!extensionalProperties?.length) return value;
        // const newValue = { ...value };
        const newValue = {};
        const { valueHandler } = options || {};
        Object.keys(value).forEach(propertyName => {
            if (!value[propertyName]) {
                newValue[propertyName] = value[propertyName];
                return;
            }
            const targetPropConf = extensionalProperties.find(ele => propertyName === ele.propertyName);
            if (typeof valueHandler === 'function') {
                newValue[propertyName] = valueHandler(value[propertyName], targetPropConf);
                return;
            }
            if (targetPropConf && targetPropConf?.dataElement?.type === DateElementType.DATETIME) {
                const timestamp = typeof value[propertyName] === 'string' ? Number(value[propertyName]) : value[propertyName];
                newValue[propertyName] = moment(timestamp);
                return;
            }
            newValue[propertyName] = value[propertyName];
        });
        return newValue;
    }

    function inverseFormatValueAccordToCustomAreaConf(
        value: { [key: string]: any },
        areaCode: string,
        options?: {
            valueHandler?: (
                value: any,
                propertyConfig: { name: string;[key: string]: any; dataElement: { type: string; formatStrategy: any;[key: string]: string } }
            ) => any;
        }) {
        return formatValueAccordToCustomAreaConf(value, areaCode, {
            valueHandler: typeof options?.valueHandler === 'function' ? options.valueHandler : (value, propertyConfig) => {
                if (!value || propertyConfig.dataElement.type !== DateElementType.DATETIME) return value;
                if (moment.isMoment(value)) {
                    // 此处value作为moment实例时，会丢失原型链，所以必须使用_i取时间戳数据进行format
                    return propertyConfig.dataElement.formatStrategy?.pattern ? moment((value as any)._i).format(propertyConfig.dataElement.formatStrategy?.pattern) : (value as any)._i;
                }
                return moment(value).format(propertyConfig.dataElement.formatStrategy?.pattern || 'x');
            }
        });
    }

    function formatQueryValueAccordToFunctionConf(formdata: { [key: string]: string | { start: any; operator: string; end?: any } }) {
        // 根据列表类型功能的搜索配置整理传入的formdata为查询接口接收类型的数据
        if (!formdata) return null;
        const { queryExtensionalPropertyConfigs } = data || {};
        const propertyKeys = Object.keys(formdata);
        const result = {} as any;
        propertyKeys?.forEach((key) => {
            const cur = formdata[key];
            const extensionalPropConf = queryExtensionalPropertyConfigs?.find(ele => ele.propertyName === key);
            if (!extensionalPropConf) {
                result[key] = cur;
                return;
            }
            if (!result.extendedQueryParameters) {
                result.extendedQueryParameters = [];
            }
            const conditionConf = queryExtensionalPropertyConfigs?.filter(ele => ele.modelCode ===  extensionalPropConf.modelCode);
            if (Object.prototype.toString.call(cur) === '[object Object]') {
                // 数据为对象
                const { start, end, operator } = cur as any;
                result.extendedQueryParameters.push({
                    dataType: conditionConf?.dataElement?.type,
                    propertyName: key,
                    operator: operator === 'BETWEEN' ? extensionalPropConf?.operatorConfigs?.find(ele => ele.operator === operator)?.startOperator : operator,
                    value: start
                });
                if (operator === 'BETWEEN') {
                    result.extendedQueryParameters.push({
                        dataType: conditionConf?.dataElement?.type,
                        propertyName: key,
                        operator: extensionalPropConf?.operatorConfigs?.find(ele => ele.operator === operator)?.endOperator,
                        value: Array.isArray(start) ? start[1] : end
                    });
                }

            } else {
                // 普通数据
                const firstOperator = extensionalPropConf?.operatorConfigs?.[0];
                result.extendedQueryParameters.push({
                    dataType: conditionConf?.dataElement?.type,
                    propertyName: key,
                    operator: firstOperator.operator,
                    value: cur
                });
            }
        });
        return result;

    }

    function getListTypeFunctionQueryPropertyConfig() {
        // 获取列表功能中配置的搜索区域标准字段和扩展字段列表，并添加字段标识及字段显示名配置，按照sequence属性升序排序
        const { queryExtensionalPropertyConfigs, queryExtensionalPropertyUiList, queryPropertyConfigs, queryPropertyUiList } = data || {};
        const queryPropConfigsWithLabel = queryExtensionalPropertyConfigs?.map(ele => {
            const { modelCode, propertyName } = ele;
            const eleUiConf = queryExtensionalPropertyUiList?.find(conf => conf.modelCode === modelCode && conf.propertyName === propertyName);
            return { ...ele, propertyType: 'EXTENSIONAL', label: eleUiConf ? eleUiConf.label : undefined, extensionalProperty: ele.dataELement };
        }) || [];
        const propConfigsWithLabel = queryPropertyConfigs?.map(ele => {
            const { propertyPath, rootStandardModelCode } = ele;
            const eleUiConf = queryPropertyUiList?.find(conf => conf.rootStandardModelCode === rootStandardModelCode && conf.propertyPath === propertyPath);
            return { ...ele, propertyType: 'STANDARD', label: eleUiConf ? eleUiConf.label : undefined };
        }) || [];
        return queryPropConfigsWithLabel.concat(propConfigsWithLabel).sort((a, b) => a.sequence - b.sequence);
    }

    function getListTypeFunctionTablePropertyConfig() {
        // 获取列表功能中配置的列表区域标准字段和扩展字段列表，并添加字段标识及字段显示名配置，按照sequence属性升序排序
        const { extensionalPropertyConfigs, extensionalPropertyUiList, propertyConfigs, propertyUiList } = data || {};
        const queryPropConfigsWithLabel = extensionalPropertyConfigs?.map(ele => {
            const { modelCode, propertyName } = ele;
            const eleUiConf = extensionalPropertyUiList?.find(conf => conf.modelCode === modelCode && conf.propertyName === propertyName);
            return { ...ele, propertyType: 'EXTENSIONAL', label: eleUiConf ? eleUiConf.label : undefined, extensionalProperty: ele.dataElement };

        }) || [];
        const propConfigsWithLabel = propertyConfigs?.map(ele => {
            const { propertyPath, rootStandardModelCode } = ele;
            const eleUiConf = propertyUiList?.find(conf => conf.rootStandardModelCode === rootStandardModelCode && conf.propertyPath === propertyPath);
            return { ...ele, propertyType: 'STANDARD', label: eleUiConf ? eleUiConf.label : undefined };
        }) || [];
        return queryPropConfigsWithLabel.concat(propConfigsWithLabel).sort((a, b) => a?.sequence - b?.sequence);
    }

    function getMetadataTableColumns() {
        const properties = getListTypeFunctionTablePropertyConfig();
        return properties?.map(ele => {
            return {
                ...ele,
                dataIndex: ele.propertyType === 'EXTENSIONAL' ? ele.name : ele.propertyPath,
                title: ele.label || ele.propertyAlias || (ele.propertyType === 'EXTENSIONAL' ? ele.name : ele.propertyName)
            }
        })
    }

    useEffect(() => {
        if (dataFetchState !== DataFetchState.DEFAULT) { setDataFetchState(DataFetchState.DEFAULT); }
        if (!functionCode || !_tenantCode) return;
        init(functionCode, _tenantCode);
    }, [functionCode, _tenantCode]);

    return (
        <MetadataFunctionContext.Provider
            value={{
                ...(data || {}),
                dataFetchState,
                loading,
                functionCode,
                extraValue: value,
                getConfOfStandardProperties,
                getUIConfOfCustomAreas,
                formatValueAccordToCustomAreaConf,
                inverseFormatValueAccordToCustomAreaConf,
                getListTypeFunctionQueryPropertyConfig,
                getListTypeFunctionTablePropertyConfig,
                getMetadataTableColumns,
                formatQueryValueAccordToFunctionConf,
            }}
        >
            {children}
        </MetadataFunctionContext.Provider>
    );
}

export default MetadataFunctionContextProvider;
