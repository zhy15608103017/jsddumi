import FormRender, { FRProps } from 'form-render';
import React, { useContext, useMemo } from 'react';
import MetadataFunctionContext from '../metadataFunctionContext';

interface MetadataFormRenderProps extends Omit<FRProps, 'schema'> {
    areaCode?: string;
}

function CustomAreaFormRender(props: MetadataFormRenderProps) {
    const value = useContext(MetadataFunctionContext);
    const { areaCode } = props;
    if (!areaCode) return <></>;
    const { getUIConfOfCustomAreas } = value;
    const schema = useMemo(() => {
        let schema = {};
        const areasConfig = getUIConfOfCustomAreas([areaCode]);
        if (areasConfig?.length) {
            console.log('CustomAreaFormRender', areasConfig);
            schema = areasConfig[0]?.schema;
        }
        return schema;
    }, [areaCode, getUIConfOfCustomAreas]);
    return (
        <FormRender
            {...props}
            schema={schema}
        />
    );
}

export default CustomAreaFormRender;
