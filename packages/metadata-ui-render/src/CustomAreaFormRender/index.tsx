import FormRender, { FRProps, useForm } from 'form-render';
import React, { forwardRef, useContext, useImperativeHandle, useMemo } from 'react';
import MetadataFunctionContext from '../metadataFunctionContext';
import { ConfigProvider } from 'antd';
import { getAntdConfig } from '@jusda-tools/jusda-theme-config';
import 'antd/dist/antd.variable.less';

ConfigProvider.config({
    prefixCls: 'jusda-metadataUI',
    theme: getAntdConfig('v4'),
});
interface MetadataFormRenderProps extends Omit<FRProps, 'schema'> {
    areaCode?: string;
}

function CustomAreaFormRender(props: MetadataFormRenderProps, ref: any) {
    const value = useContext(MetadataFunctionContext);
    const { areaCode } = props;
    if (!areaCode) return <></>;
    const { getUIConfOfCustomAreas } = value;
    const schema = useMemo(() => {
        let schema = {};
        const areasConfig = getUIConfOfCustomAreas([areaCode]);
        if (areasConfig?.length) {
            // console.log('CustomAreaFormRender', areasConfig);
            schema = areasConfig[0]?.schema || {};
        }
        return schema;
    }, [areaCode, getUIConfOfCustomAreas]);

    const form = useForm();

    useImperativeHandle(ref, () => {
        return {
            ...form,
            form,
        }
    })

    return (
        <FormRender
            {...props}
            form={form}
            schema={schema}
            configProvider={{
                prefixCls: 'jusda-metadataUI'
            }}
        />
    );
}

export default forwardRef(CustomAreaFormRender);
