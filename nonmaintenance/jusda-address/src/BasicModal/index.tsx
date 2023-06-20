/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, {
    useState,
    forwardRef,
    useImperativeHandle,
    useRef,
    useEffect,
} from 'react';
import { Modal } from 'antd';
import AddressModal from '../Component/AddressModal';
import CommonAddress from '../Component/CommonAddress';
import Translate from '../Component/Translate';
import { useAddressIntl } from '../useIntl';
import './index.less';
import { basicModalProps } from '../utils/type';
import {
    transformAddAddressFormData,
    intermediateOldInterfaceConversion,
} from '../utils/Fn';
import { saveAddress, getCommonAddressList, getAddressDetail } from '../Api';

const BasicModal = (
    {
        value = {},
        visible,
        setVisible = () => {},
        onChange = () => {},
        disabledShareInternational = false,
        type,
        ...args
    }: basicModalProps,
    ref: any,
) => {
    const { tag = [], dataLanguageType } = args;
    const [isPositive, setIsPositive] = useState(true);
    const { formatMessage } = useAddressIntl();
    const addressModalRef: any = useRef();
    const commonAddressRef: any = useRef();
    const [currentStatus, setCurrentStatus] = useState('ADD');
    const configure: any = {
        ADD: {
            title: 'add address',
        },
        EDIT: {
            title: 'edit address',
        },
    };

    const save = (values, success) => {
        if (!success) return;
        const newValue = transformAddAddressFormData({ ...values, tag });
        // 调取接口保存地址信息.  保存成功后关闭modal框并且将数据植入form表单
        saveAddress(newValue).then((res: any) => {
            if (!intermediateOldInterfaceConversion(res?.code)) return;
            getAddressDetail({ id: res?.result, dataLanguageType }).then(
                (result: any) => {
                    onChange({ ...result?.result });
                    setVisible(false);
                },
            );
        });
    };

    const saveAddressAsync = async (values: any, success: boolean) => {
        const isShipperAndConsignee = tag.some(
            (item: any) => item === 'shipperAddressAndConsigneeAddress',
        );
        const internationalShareData = tag.some(
            (item: any) => item === 'international',
        );
        const internationalShareEq =
      internationalShareData && isShipperAndConsignee;

        if (currentStatus === 'EDIT') {
            await getCommonAddressList({
                contactsCondition: {
                    contactAddressIdIn: values.id ? [values.id] : undefined,
                    internationalShareEq,
                },
                pagingCondition: {
                    pageIndex: 0,
                    pageSize: 1000,
                },
                dataLanguageType,
            }).then((res: any) => {
                if (res?.result?.data?.length) {
                    save(values, success);
                } else {
                    save({ ...values, id: null }, success);
                }
            });
        } else {
            save(values, success);
        }
    };
    useEffect(() => {
    // 初始化获取常用地址
        if (visible) {
            commonAddressRef.current.handleGetCommonAddressList({
                frequentlyUsedEq: true,
                resetData: true,
            });
        } else {
            commonAddressRef?.current?.form.setFieldsValue({ searchValue: null });
        }
    }, [visible]);

    useImperativeHandle(ref, () => {
        return {
            setIsPositive,
            isPositive,
            setCurrentStatus,
            currentStatus,
            addressModalForm: addressModalRef?.current?.form,
            handleOpenEdit: commonAddressRef?.current?.handleOpenEdit,
        };
    });
    return (
    <>
      <Modal
          footer={false}
          visible={visible}
          className={'address-modal'}
          closable={false}
          width={744}
          onCancel={() => setVisible(false)}
          title={false}
      >
          <Translate
              show={isPositive}
              positiveNode={
                  <div className={'basic-container'}>
                      <AddressModal
                          disabledShareInternational={disabledShareInternational}
                          ref={addressModalRef}
                          onChange={saveAddressAsync}
                          setVisible={setVisible}
                          setIsPositive={setIsPositive}
                          setCurrentStatus={setCurrentStatus}
                          {...args}
                          title={formatMessage({
                              id: configure[currentStatus].title,
                          })}
                      />
                  </div>
              }
              reverseNode={
                  <div className={'basic-container'}>
                      <CommonAddress
                          visible={visible}
                          type={type}
                          ref={commonAddressRef}
                          addressModalRef={addressModalRef}
                          onChange={onChange}
                          setVisible={setVisible}
                          setIsPositive={setIsPositive}
                          setCurrentStatus={setCurrentStatus}
                          {...args}
                      />
                  </div>
              }
          />
      </Modal>
    </>
    );
};

export default forwardRef(BasicModal);
