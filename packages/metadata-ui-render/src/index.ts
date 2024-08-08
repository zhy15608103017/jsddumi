//@ts-nocheck
import MetadataFunctionContext from './metadataFunctionContext';
import MetadataFunctionContextProvider from './MetadataFunctionContextProvider';
import CustomAreaFormRender from './CustomAreaFormRender';
import {
    getTenantFunctionConfiguration,
} from './service';
import FR, {
    connectForm,
    createWidget,
    mapping,
    widgets,
    useForm,
} from 'form-render';


export {
    MetadataFunctionContext,
    MetadataFunctionContextProvider,
    CustomAreaFormRender,
    getTenantFunctionConfiguration,
    FR,
    useForm,
    connectForm,
    createWidget,
    mapping,
    widgets,
};

export default MetadataFunctionContextProvider;
