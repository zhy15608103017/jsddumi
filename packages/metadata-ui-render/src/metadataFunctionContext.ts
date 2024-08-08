import { createContext } from 'react';
import { DateElementType } from './enums';

type DataElementHistoryResult ={
    code: string,
    version: string,
    name: string,
    description: string,
    type:'STRING'|'BOOLEAN'|'INTEGER'|'FLOAT'|'DATETIME'
}

type DataElementType={
    standardModelCode: string,
    name: string, 
    enabled: boolean,
    required: boolean,
    allowQuery: boolean,
    dataElement: DataElementHistoryResult
}

interface CustomAreaUiConf {
    areaCode: string;
    standardModelCode: string;
    language: any;
    name: string;
    schema: any;
    extensionalPropertyUiList?: {
        propertyName: string;
        label: string;
    }[];
}

interface PropertyConfig {
    defaultValue: string;
    defaultValueEnabled: boolean;
    propertyPath: string;
    required: boolean;
    rootStandardModelCode: string;
    visible: boolean;
}

interface PropertyUiConfig {
    label: string;
    propertyPath: string;
    rootStandardModelCode: string;
}

interface PropertyConfigWithUI extends PropertyConfig {
    propertyUI: PropertyUiConfig;
}

interface MetadataFunctionContextProps {
    productFunctionTemplateId?: number; //
    propertyConfigs?: PropertyConfig[];
    propertyUiList?: PropertyUiConfig[];
    customAreaUiList?: CustomAreaUiConf[];
    getUIConfOfCustomAreas: (areaCodes: string[]) => CustomAreaUiConf[];
    getConfOfStandardProperties: (
        propertyPaths: string[],
    ) => PropertyConfigWithUI[];
    formatValueAccordToCustomAreaConf: (
        value: any,
        customAreaCode: 'string',
        options?: {
            valueHandler?: (
                value: any,
                propertyConfig: {
                    name: string;
                    [key: string]: any;
                    dataElement: {
                        type: DateElementType;
                        formatStrategy: any;
                        [key: string]: string;
                    };
                },
            ) => any;
        },
    ) => any;
    inverseFormatValueAccordToCustomAreaConf: (
        value: any,
        customAreaCode: 'string',
        options?: {
            valueHandler?: (
                value: any,
                propertyConfig: {
                    name: string;
                    [key: string]: any;
                    dataElement: {
                        type: DateElementType;
                        formatStrategy: any;
                        [key: string]: string;
                    };
                },
            ) => any;
        },
    ) => any;
    getListTypeFunctionQueryPropertyConfig: () => {
        propertyType: 'EXTENSIONAL' | 'STANDARD';
        label?: string;
        extensionalProperty?:DataElementType;
        [key: string]: any;
    }[];
    getListTypeFunctionTablePropertyConfig: () => {
        propertyType: 'EXTENSIONAL' | 'STANDARD';
        label?: string;
        extensionalProperty?:DataElementType;
        [key: string]: any;
    }[];
    getMetadataTableColumns: () =>{
        propertyType: 'EXTENSIONAL' | 'STANDARD';
        label?: string;
        extensionalProperty?:any;
        dataIndex: string, 
        title?: string;
        [key: string]: any;
    }[] ,
    formatQueryValueAccordToFunctionConf: (formdata: {
        [key: string]: any | { start: any; operator: string; end?: any };
    }) => {
        [key: string]: any;
        extendedQueryParameters?: {
            dataType: string;
            propertyName: string;
            operator: string;
            value: any;
        }[];
    };
}

const MetadataFunctionContext = createContext<MetadataFunctionContextProps>({
    getUIConfOfCustomAreas() {
        return [];
    },
    getConfOfStandardProperties() {
        return [];
    },
    formatValueAccordToCustomAreaConf(value) {
        return value;
    },
    inverseFormatValueAccordToCustomAreaConf(value) {
        return value;
    },
    getListTypeFunctionQueryPropertyConfig(): {
        propertyType: 'EXTENSIONAL' | 'STANDARD';
        label?: string;
        extensionalProperty?:any;
        [key: string]: any;
    }[] {
        return [];
    },
    getListTypeFunctionTablePropertyConfig():{
        propertyType: 'EXTENSIONAL' | 'STANDARD';
        label?: string;
        extensionalProperty?:any;
        [key: string]: any;
    }[] {
        return [];
    },
    getMetadataTableColumns():{
        propertyType: 'EXTENSIONAL' | 'STANDARD';
        label?: string;
        extensionalProperty?:any;
        dataIndex: string, 
        title?: string;
        [key: string]: any;
    }[] {
        return []
    },
    formatQueryValueAccordToFunctionConf(formdata: {
        [key: string]: string | { start: any; operator: string; end?: any };
    }) {
        return formdata;
    },
});

export default MetadataFunctionContext;
