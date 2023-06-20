import MetadataContext from './metadataContext';
import MetadataContextProvider from './MetadataContextProvider';
import MetadataFormRender from './MetadataFormRender';
import MetadataRender from './MetadataRender';

import MetadataFunctionContext from './metadataFunctionContext';
import MetadataFunctionContextProvider from './MetadataFunctionContextProvider';
import CustomAreaFormRender from './CustomAreaFormRender';
import {
    getUIModal,
    getTenantModelConfiguration,
    getTenantFunctionConfiguration,
} from './service';

const getTenantModalUIMetadata = getUIModal;

export {
    MetadataContext,
    MetadataFormRender,
    MetadataContextProvider,

    MetadataFunctionContext,
    MetadataFunctionContextProvider,
    CustomAreaFormRender,

    getTenantModalUIMetadata,
    getTenantModelConfiguration,
    getTenantFunctionConfiguration,
};

export default MetadataRender;