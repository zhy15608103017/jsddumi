/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';
import MetadataFunctionContext from './metadataFunctionContext';
import { getTenantFunctionConfiguration } from './service';

interface MetadataFunctionContextProviderProps
    extends React.ComponentProps<
    keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
    > {
    functionCode: string;
    tenantCode?: string;
}
function MetadataFunctionContextProvider(props: MetadataFunctionContextProviderProps) {
    const { children, value, tenantCode, functionCode } = props;
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>(null);
    const _tenantCode = tenantCode || (window as any)?.jusdaUserInfo?.data?.userIdentity?.tenant?.tenantCode;


    async function init(code: string, _tenantCode: string) {
        if (loading) return;
        setLoading(true);
        const resp = await getTenantFunctionConfiguration(_tenantCode, {
            functionCode
        });
        const { success, data } = resp;
        setLoading(false);
        if (success) {
            const { customAreaUiList: UIConfigs } = data;
            try {
                const objectedSchemaUIConfig = UIConfigs?.map(uiConfig => {
                    const { schema } = uiConfig;
                    return {
                        ...uiConfig,
                        schema: schema ? JSON.parse(schema) : {},
                    };
                });
                setData({ ...data, customAreaUiList: objectedSchemaUIConfig });
            } catch (err) {
                console.warn('Schema parsing failed!');
            }
            return;
        }

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

    useEffect(() => {
        if (!functionCode || !_tenantCode) return;
        init(functionCode, _tenantCode);
    }, [functionCode, _tenantCode]);

    return (
        <MetadataFunctionContext.Provider
            value={{ ...(data || {}), functionCode, extraValue: value, getConfOfStandardProperties, getUIConfOfCustomAreas }}
        >
            {children}
        </MetadataFunctionContext.Provider>
    );
}

export default MetadataFunctionContextProvider;
