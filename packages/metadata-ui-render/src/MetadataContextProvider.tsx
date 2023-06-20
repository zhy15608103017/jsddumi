/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';
import { LoadStrategy } from './enums';
import MetadataContext from './metadataContext';
import { getTenantModelConfiguration } from './service';

interface MetadataContextProviderProps
    extends React.ComponentProps<
    keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
    > {
    code?: string;
    tenantCode?: string;
    pathList?: string[];
    includeRootPath?: boolean;
    propertyLoadStrategyEq?: LoadStrategy;
}
function MetadataContextProvider(props: MetadataContextProviderProps) {
    const { code, children, value, tenantCode, pathList, includeRootPath = true, propertyLoadStrategyEq = LoadStrategy.ALL } = props;
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>(null);
    const _tenantCode = tenantCode || (window as any)?.jusdaUserInfo?.data?.userIdentity?.tenant?.tenantCode;
    
    const defaultPath = pathList?pathList:[];

    async function init(code: string, _tenantCode: string) {
        if(loading)return;
        setLoading(true);
        const resp = await getTenantModelConfiguration(_tenantCode, {
            standardModelCodeEq: code,
            propertyPathIn: includeRootPath ? ['', ...defaultPath] : defaultPath,
            propertyLoadStrategyEq
        });
        const { success, data } = resp;
        setLoading(false);
        if (success) {
            const { tenantImplementationUIConfiguration: UIConfigs } = data;
            try {
                const objectedSchemaUIConfig = UIConfigs?.map(uiConfig => {
                    const { schema } = uiConfig;
                    return {
                        ...uiConfig,
                        schema: schema ? JSON.parse(schema) : {},
                    };
                });
                setData({ ...data, tenantImplementationUIConfiguration: objectedSchemaUIConfig });
            } catch (err) {
                console.warn('Schema parsing failed!');
            }
            return;
        }

    }

    useEffect(() => {
        if (!code || !_tenantCode ) return;
        init(code, _tenantCode);
    }, [code, _tenantCode, pathList, includeRootPath, propertyLoadStrategyEq]);

    return (
        <MetadataContext.Provider
            value={{ ...(data || {}), code, extraValue: value }}
        >
            {children}
        </MetadataContext.Provider>
    );
}

export default MetadataContextProvider;
