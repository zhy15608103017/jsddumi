import FormRender, { FRProps } from 'form-render';
import React, { useContext } from 'react';
import MetadataContext from '../metadataContext';

interface MetadataFormRenderProps extends Omit<FRProps, 'schema'> {
    path?: string;
}

function MetadataFormRender(props: MetadataFormRenderProps) {
    const value = useContext(MetadataContext);
    const { path = '' } = props;
    const { tenantImplementationUIConfiguration } = value;
    let schema = {};
    if (tenantImplementationUIConfiguration?.length) {
        const uiconfigUnderPath = tenantImplementationUIConfiguration.find(ele => ele.propertyPath === path);
        if (uiconfigUnderPath) {
            schema = uiconfigUnderPath.schema;
        }
    }
    return (
        <FormRender
            {...props}
            schema={schema}
        />
    );
}

export default MetadataFormRender;
