import * as React from 'react';
import AddressModal from './AddressModal';
import { addShipperFn, addAddressFn } from '../../utils/addressFn';
import { addressIntl } from '../../Intl';

const { address } = addressIntl;

const Addmodal = (props: any) => {
    const {
        showType,
        modalValue,
        modalHandleOk,
        addressSelectConfig,
        setVisible,
        isInternationalPartner,
    } = props;
    const handleOk = React.useCallback(
    // data是由是下面的newData传入此处
        (data, cb) => {
            const modalOkType = addressSelectConfig?.enumeration || '';
            if(modalOkType === 'ADDADDRESS'){
                addAddressFn({
                    modalValue, 
                    addressConfig: addressSelectConfig,
                    modalHandleOk,
                    isInternationalPartner
                })(data, cb);
            } else {
                addShipperFn({
                    modalValue, 
                    addressConfig: addressSelectConfig,
                    modalHandleOk,
                    isInternationalPartner
                })(data, cb);
            }
        },
        [showType, modalValue, addressSelectConfig, modalHandleOk, setVisible] //第二个参数
    );
    return (
        <AddressModal
            {...props}
            title={`${address.add}${addressSelectConfig?.partNerTitle}`}
            isInternationalPartner={isInternationalPartner}
            modalValue={modalValue}
            showType={'add'}
            handleSubmit={(newData: any, cb: Function) => {
                return handleOk(newData, cb);
            }}
        />
    );
};

export default Addmodal;
