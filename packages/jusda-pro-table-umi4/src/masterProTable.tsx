// @ts-nocheck
import React, {forwardRef, useContext, useEffect} from "react";
import JusdaProTable from "./pro-table";
import {MetadataFunctionContext} from "@jusda-tools/metadata-ui-render";


type ProTableRef = React.RefObject<HTMLDivElement>;

function MasterProTable(props, ref:ProTableRef) {
    const {
        metadataSwitch,
    } = props;

    const contextValue = useContext(MetadataFunctionContext);
    const { getMetadataTableColumns, ...rest    } = contextValue;


    useEffect(() => {
        console.log('rest', rest);
        if (rest?.dataFetchState === 2) {
            props.onMasterDataChange(getMetadataTableColumns(), contextValue);
        }
    }, [rest?.dataFetchState]);

    return (
        <JusdaProTable {...props} columns={metadataSwitch && !props.columns ? getMetadataTableColumns() : props.columns} ref={ref} />
    );
}

export default forwardRef(MasterProTable);


