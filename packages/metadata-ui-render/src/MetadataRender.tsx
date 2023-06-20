/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { FormInstance, FRProps } from 'form-render';
import React from 'react';
import MetadataContextProvider from './MetadataContextProvider';
import FormRender from './MetadataFormRender';
import { useForm } from 'form-render';

interface MetadataRenderProps extends Omit<FRProps,'schema'|'form'> {
    code?: string; // 需要获取的模型code
    form?: FormInstance; // 传给FormRender的form实例
    tenantCode?: string; // 租户code
    // pathList?: string[];
    // includeRootPath?: boolean;
}

function MetadataRender(props: MetadataRenderProps){
    const { code, form, tenantCode, ...rest } = props;
    const curForm = form || useForm();
    return <MetadataContextProvider code={code} tenantCode={tenantCode}>
        <FormRender form={curForm} path={''} {...rest}></FormRender>
    </MetadataContextProvider>;
}

export default MetadataRender;