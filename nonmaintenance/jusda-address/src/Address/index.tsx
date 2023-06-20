/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState, useRef, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import EmptyContent from './EmptyContent';
import Title from './Title';
import Content from './Content';
import BasicModal from '../BasicModal';
import { useAddressIntl } from '../useIntl';
import { ShipperIcon, ConsigneeIcon } from '../assets/SvgIcon';
import { addressProps } from '../utils/type';
import { transformCascadeData } from '../utils/Fn';
import './index.less';

const Address = ({
    value,
    onChange = () => {},
    type = 'SHIPPER',
    disabledShareInternational = false,
    readOnlyProperty = false,
    required = true,
    typeConfiguration = undefined,
    ...args
}: addressProps) => {
    const [modalVisible, setModalVisible] = useState(false);
    // true时为正面(新增/编辑),false反面(常用地址)
    // @ts-ignore
    const basicModalRef: {
        current: {
            setIsPositive: Function;
            isPositive: boolean;
            setCurrentStatus: Function;
            currentStatus: string;
            addressModalForm: any;
        };
    } = useRef();
    const { formatMessage } = useAddressIntl();
    const addressType: any = {
        SHIPPER: {
            icon: <ShipperIcon />,
            name: formatMessage({ id: 'shipper' }),
            contentName: formatMessage({ id: 'Shipping address' }),
        },
        CONSIGNEE: {
            icon: <ConsigneeIcon />,
            name: formatMessage({ id: 'consignee' }),
            contentName: formatMessage({ id: 'Delivery address' }),
        },
        NOTIFY: {
            icon: <ConsigneeIcon />,
            name: formatMessage({ id: 'notify' }),
            contentName: formatMessage({ id: 'notify address' }),
        },
    };
    const openAddModal = (isPositive: boolean) => {
        setModalVisible(true);
        if (basicModalRef.current.currentStatus === 'EDIT') {
            basicModalRef.current?.addressModalForm?.resetFields();
        }
        basicModalRef.current.setCurrentStatus('ADD');
        basicModalRef.current.setIsPositive(isPositive);
    };

    const openEditModal = async () => {
        await setModalVisible(true);
        const { address } = value || {};
        const cascadeData = transformCascadeData(value?.address);
        // 如果不结构location在估价审核 打开编辑会报错
        const { location } = address || {};
        const { latitude = '', longitude = '' } = location || {};
        delete address.location;
        basicModalRef.current.setIsPositive(true);
        basicModalRef.current?.addressModalForm?.setFieldsValue({
            ...value,
            ...cascadeData,
            ...address,
            location: {
                latitude,
                longitude,
            },
        });
    };

    useEffect(() => {
        if (!value?.cascadeCode && value && JSON.stringify(value) !== '{}') {
            onChange({ ...value, ...transformCascadeData(value) });
        }
    }, [value]);
    return (
        <ConfigProvider prefixCls={'jusda-new-address'}>
            <div className={'yy-address-container'}>
                <div className={'address-box'}>
                    <Title
                        required={required}
                        readOnlyProperty={readOnlyProperty}
                        openAddModal={openAddModal}
                        title={typeConfiguration?.name || addressType[type].name}
                        {...args}
                    />

                    {/* 内容部分 */}
                    <div className={'address-content-container'}>
                        {/* 左侧图标部分 */}
                        <div className="address-content-icon">
                            <div className="address-content-icon-container">
                                {typeConfiguration?.icon || addressType[type].icon}
                            </div>
                        </div>
                        {/* 右侧内容部分 */}
                        <div className="address-content">
                            {value?.companyName || readOnlyProperty ? (
                                <Content
                                    readOnlyProperty={readOnlyProperty}
                                    setBasicModal={setModalVisible}
                                    openEditModal={openEditModal}
                                    basicModalRef={basicModalRef}
                                    value={value}
                                />
                            ) : (
                                <EmptyContent
                                    onClick={() => openAddModal(true)}
                                    contentLabel={
                                        typeConfiguration?.contentName ||
                    addressType[type].contentName
                                    }
                                />
                            )}
                        </div>
                    </div>
                </div>
                <BasicModal
                    value={value}
                    onChange={onChange}
                    type={type}
                    disabledShareInternational={disabledShareInternational}
                    ref={basicModalRef}
                    title={formatMessage({ id: 'add address"' })}
                    visible={modalVisible}
                    setVisible={setModalVisible}
                    {...args}
                />
            </div>
        </ConfigProvider>
    );
};

export default Address;
