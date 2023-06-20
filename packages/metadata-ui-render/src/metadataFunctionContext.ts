import { createContext } from 'react';

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
}

const MetadataFunctionContext = createContext<MetadataFunctionContextProps>({
    getUIConfOfCustomAreas() {
        return [];
    },
    getConfOfStandardProperties(){
        return [];
    }
});

export default MetadataFunctionContext;
