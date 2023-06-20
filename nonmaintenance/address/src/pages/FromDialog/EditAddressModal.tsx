import React,{ useState, useCallback } from 'react';
import styled from 'styled-components';
import { EditFilled } from '@ant-design/icons';
import AddressModal from './AddressModal';
import { editShipperFn, editAddressFn } from '../../utils/addressFn';
import { AddModalParameter } from '../../types/index';

// less文件
const IconA = styled.a({
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingRight: '20px',
    fontSize: '20px',
});

const EditAddressModal = (props: any) => {
    const {
        disable = false,
        disableToEdit = false,
        modalValue,
        addressSelectConfig,
        isInternationalPartner = false,
        handleSubmit,
        ...args
    } = props;
    const [visible, setVisible] = useState(false);
    const handleShowModal = () => {
        setVisible(!visible);
    };
    const handleOk = useCallback(
    // data是由是下面的newData传入此处
        (newData, cb) => {
            const modalOkType = addressSelectConfig?.enumeration || '';
            if(modalOkType === 'ADDADDRESS'){
                editAddressFn({
                    modalValue, 
                    addressConfig: addressSelectConfig,
                    modalHandleOk: ()=>handleSubmit(newData),
                    isInternationalPartner
                })(newData, cb);

            } else {
                editShipperFn({
                    modalValue, 
                    addressConfig: addressSelectConfig,
                    modalHandleOk: ()=>handleSubmit(newData),
                    isInternationalPartner
                })(newData, cb);
            }
        },
        [modalValue, addressSelectConfig, handleSubmit] //第二个参数
    );
    return (
    <>
      {disable || disableToEdit || modalValue?.isDefault ? (
          ''
      ) : (
          <IconA onClick={handleShowModal}>
              {' '}
              <EditFilled />
          </IconA>
      )}

      <AddressModal
          {...args}
          isShareLocking
          modalValue={modalValue}
          isInternationalPartner={isInternationalPartner}
          addressSelectConfig={addressSelectConfig}
          visible={visible}
          setVisible={setVisible}
          showType={'edit'}
          handleSubmit={(newData: any, cb: Function) => {
              return handleOk(newData, cb);
          }}
  
      />
    </>
    );
};
export default EditAddressModal;
