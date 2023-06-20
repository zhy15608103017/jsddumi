import { createContext } from 'react';

interface StandardPropConfig {
    collection: boolean;
    defaultValueEnabled: boolean;
    propertyPath: string;
    required: boolean;
    type: 'BASIC' | 'LIST' | 'MAP' | 'OBJECT';
    visible: boolean;
    defaultValue?: any;
}

interface MetadataContextProps {
    rootStandardModelCode: string; // 模型code
    importRecords?: {propertyPath: string; standardModelCode: string}[];
    tenantImplementationModelPropertyConfigurationList?: StandardPropConfig[];
    tenantImplementationUIConfiguration?: {
        language: string;
        propertyPath: string;
        schema: any;
        standardModelCode: string;
        standardPropertyLabelConfigurationList?: {
            propertyPath: string;
            label: string;
        }[];
        extensionalPropertyLabelConfigurationList?: {
            propertyPath: string;
            label: string;
            type: 'FORM_RENDER' | 'TABLE';
        }[];
    }[];
}

const MetadataContext = createContext<MetadataContextProps>({rootStandardModelCode:''});

export default MetadataContext;
