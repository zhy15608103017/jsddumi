/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
    useState,
    forwardRef,
    useImperativeHandle,
    useRef,
} from 'react';
import { Form, Input, Button, InputProps, Row, Col } from 'antd';
import PhoneComponent from './PhoneComponent';
import SearchAddress from './SearchAddress';
import Cascade from './Cascade';
import CheckboxComponent from './Checkbox';
import CheckboxButton from '../CheckboxButton';
import { UsedAddressIcon, CloseIcon } from '../../assets/SvgIcon';
import EnglishInput from '../EnglishInput';
import ButtonAndIcon from '../ButtonAndIcon';
import { useAddressIntl } from '../../useIntl';
import './index.less';
import { addressModalProps } from '../../utils/type';

const AddressModal = (
    {
        setVisible = () => { },
        title = '新增地址',
        setIsPositive = () => { },
        setCurrentStatus = () => { },
        onChange = () => { },
        disabledShareInternational = false,
        tag = [],
        dataLanguageType = 'zh-CN',
        shippingMode,
        ...args
    }: addressModalProps,
    ref: any,
) => {
    const { formatMessage } = useAddressIntl();
    const [form] = Form.useForm();
    const initialValues = {
        cascadeCode: ['', '', '', ''],
        telephoneArea: '86',
        mobileArea: '86',
    };
    const [isManualInput, setIsManualInput] = useState(false);
    const [isShowErrorTip, setIsShowErrorTip] = useState(false);
    const cascadeRef: any = useRef();
    const [monitor, setMonitor] = useState(false); //此参数在组件点击国际国内时起强制渲染的作用
    const showErrorTip = isShowErrorTip && !isManualInput;
    const isInternational = tag?.some((item) => item === 'international');
    const isShipperAndConsignee = tag?.some(
        (item) => item === 'shipperAddressAndConsigneeAddress',
    );

    // 只有国际的收发货人.才只允许输入英文
    const EnglishInputOrInput = (props: InputProps) =>
        isInternational && isShipperAndConsignee ? (
            <EnglishInput {...props} />
        ) : (
            <Input {...props} />
        );

    const onFinish = (values: any) => {
        onChange(values, true);
        form.resetFields();
    };
    const onFinishFailed = (values: any) => {
        onChange(values, false);
    };
    const handleSwitchManualInput = (boolean: boolean) => {
        form.setFieldsValue({
            cascadeCode: ['CN', '', '', ''],
            cascadeName: ['中国', '', '', ''],
            addressDetail: '',
        });
        setIsManualInput(boolean);
    };
    const handleOk = () => {
        form.submit();
        // cascadeRef.current.setRegionTransportLocationOption([]);
    };
    const handleCancel = () => {
        // cascadeRef.current.setRegionTransportLocationOption([]);
        setVisible(false);
    };
    const onFieldsChange = (changedFields: any) => {
        // // 执行setState方法让组件强制刷新
        changedFields?.some((item: any) => {
            if (item?.name?.some((ele: string) => ele === 'internationalShareEq')) {
                setMonitor(item.value);
                return true;
            }
            return false;
        });
    };

    useImperativeHandle(ref, () => {
        return {
            form,
        };
    });
    return (
        <div className={'address-basic-modal-container'}>
            <div className="address-basic-title-container">
                <div className="address-basic-title">{title}</div>
                <div onClick={handleCancel} className="address-modal-close">
                    <CloseIcon />
                </div>
            </div>
            <Form
                onFieldsChange={onFieldsChange}
                initialValues={initialValues}
                onFinishFailed={onFinishFailed}
                onFinish={onFinish}
                form={form}
                layout="vertical"
            >
                <div className={'address-basic-modal-form-container'}>
                    <div className={'address-basic-modal-checkbox-container'}>
                        <div>
                            {/* 先隐藏掉,等字段修改后,再进行删除. */}
                            <Form.Item hidden noStyle name="internationalShare">
                                <CheckboxComponent
                                    disabledShareInternational={disabledShareInternational}
                                    tag={tag}
                                />
                            </Form.Item>
                        </div>
                        <ButtonAndIcon
                            onClick={() => {
                                setIsPositive(false);
                                setCurrentStatus('ADD');
                            }}
                            label={formatMessage({ id: 'common address' })}
                            icon={<UsedAddressIcon />}
                        />
                    </div>
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: formatMessage({ id: 'Please Company name' }),
                            },
                        ]}
                        label={formatMessage({ id: 'Company Name' })}
                        name="companyName"
                    >
                        <EnglishInputOrInput
                            placeholder={formatMessage({
                                id: 'Please Company name',
                            })}
                            maxLength={255}
                        />
                    </Form.Item>
                    <PhoneComponent
                        dataLanguageType={dataLanguageType}
                        tag={tag}
                        form={form}
                    />
                    <Row gutter={36}>
                        <Col span={16}>
                            <Form.Item
                                rules={[
                                    {
                                        pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                                        message: formatMessage({
                                            id: 'Please email',
                                        })
                                    },
                                ]}
                                label={formatMessage({ id: 'email' })}
                                name="email"
                            >
                                <Input
                                    placeholder={formatMessage({
                                        id: 'Please email',
                                    })}
                                    maxLength={50}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                rules={[
                                    {
                                        required: !!(isInternational && shippingMode === 'TPM_EXPRESS'),
                                        message: formatMessage({
                                            id: 'Please Postcode',
                                        })
                                    },
                                ]}
                                label={formatMessage({ id: 'Postcode' })}
                                name="postCode"
                            >
                                <EnglishInputOrInput
                                    placeholder={formatMessage({
                                        id: 'Please Postcode',
                                    })}
                                    maxLength={20}
                                />
                            </Form.Item>
                        </Col>
                    </Row>




                    {!isManualInput && !isInternational && (
                        <SearchAddress
                            isManualInput={isManualInput}
                            setIsShowErrorTip={setIsShowErrorTip}
                            handleSwitchManualInput={handleSwitchManualInput}
                            form={form}
                            Form={Form}
                        />
                    )}
                    <Cascade
                        ref={cascadeRef}
                        isManualInput={isManualInput}
                        handleSwitchManualInput={handleSwitchManualInput}
                        showErrorTip={showErrorTip}
                        form={form}
                        tag={tag}
                        dataLanguageType={dataLanguageType}
                        shippingMode={shippingMode}
                        {...args}
                    />

                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: formatMessage({ id: 'Please Address' }),
                            },
                        ]}
                        label={formatMessage({ id: 'address' })}
                        name="addressDetail"
                    >
                        <EnglishInputOrInput
                            placeholder={formatMessage({
                                id: 'Please Address',
                            })}
                            maxLength={255}
                            disabled={!isManualInput && !isInternational}
                        />
                    </Form.Item>
                    <Form.Item
                        label={formatMessage({ id: 'House number' })}
                        name="houseNumber"
                    >
                        <EnglishInputOrInput
                            maxLength={100}
                            placeholder={formatMessage({
                                id: 'Please enter the house number',
                            })}
                        />
                    </Form.Item>
                    <Form.Item hidden name="id">
                        <Input />
                    </Form.Item>
                    <Form.Item hidden name="version">
                        <Input />
                    </Form.Item>
                    <Form.Item hidden name="location">
                        <Input />
                    </Form.Item>
                </div>
                <div className={'address-basic-footer'}>
                    <Form.Item
                        noStyle
                        name="frequentlyUsed"
                        label={formatMessage({ id: 'common address' })}
                    >
                        <CheckboxButton
                            label={formatMessage({
                                id: 'Save to common address',
                            })}
                        />
                    </Form.Item>
                    <div className={'footer-button-container'}>
                        <Button onClick={handleCancel}>
                            {formatMessage({ id: 'cancel' })}
                        </Button>
                        <Button onClick={handleOk} type="primary">
                            {formatMessage({ id: 'ok' })}
                        </Button>
                    </div>
                </div>
            </Form>
        </div>
    );
};
export default forwardRef(AddressModal);
