// @ts-nocheck
import React, {forwardRef} from "react";
import JusdaProTable from "./pro-table";
import MasterProTable from "./masterProTable";
import {MetadataFunctionContextProvider} from '@jusda-tools/metadata-ui-render';


type ProTableRef = React.RefObject<HTMLDivElement>;

function ProTableContainer(props, ref:ProTableRef) {
    const {
        metadataSwitch = false,
        functionCode = '',
    } = props;

    return (
        <div className="jusda-pro-table-umi4">
            {
                metadataSwitch && Boolean(functionCode) ?
                    <MetadataFunctionContextProvider functionCode={functionCode}>
                        <MasterProTable {...props} ref={ref} />
                    </MetadataFunctionContextProvider>
                    :  <JusdaProTable {...props} ref={ref} />
            }
        </div>
    );
}

export default forwardRef(ProTableContainer);


