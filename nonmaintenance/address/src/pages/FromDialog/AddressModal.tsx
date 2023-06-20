import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Col, Form, Input, Modal, Row, Select, Checkbox } from 'antd';
import CascaderFormComp from '../CascaderFormComp';
import SearchAddress from '../../Components/SearchAddress';
import debounce from 'lodash/debounce';
import { getTransportLocationCode, getAreaCode } from '../../Api/index';
import { AddModalParameter } from '../../types/index';
import { addressIntl } from '../../Intl';
import EnglishInput from '../EnglishInput/index';
import ExternalCityOption from './CityOption';
import { getInterfaceData } from '../Address/tools';
import { Label } from '../../Components/CustomElement';
import SwitchButton from '../../Components/SwitchButton';

// 加载静态资源

const { address } = addressIntl;

const NewModal = styled(Modal)`
  z-index: 1031;
  min-width: 800px;
  .jusda-address-modal-header {
    background-color: #f2f2f2;
    padding-top: 8px;
    padding-bottom: 8px;

    .jusda-address-modal-title {
      font-size: 14px;
    }
  }
  .jusda-address-modal-close-x {
    width: 40px;
    height: 40px;
    line-height: 40px;
  }
  .jusda-address-modal-body {
    padding: 25px 40px;
    height: 632px;
    overflow-y: auto;

    .jusda-address-form-item-label > label {
      color: #8d9aad;
    }
  }
  .jusda-address-modal-footer {
    text-align: center;
    padding: 10px 40px;

    .jusda-address-btn {
      width: 120px;
      margin: 0 10px;

      &.jusda-address-btn-primary {
        color: #444;
      }
    }
  }
`;
// @ts-ignore
const NewRow = styled(Row)`
  display: flex;
  justify-content: space-between;
  ::before {
    content: none !important;
  }
  ::after {
    content: none !important;
  }

  .jusda-address-row::before,
  .jusda-address-row::after {
    content: none !important;
  }
`;

const Cascader = styled(Form.Item)`
  .jusda-address-form-item-control-input-content {
    display: flex;
    width: 80%;
    justify-content: flex-start;
    > div {
      width: 145px;
    }
  }
`;

const LabelRequired = styled.label({
    '::before': {
        display: 'inline-block',
        'margin-right': '4px',
        color: '#ff4d4f !important',
        'font-size': '14px !important',
        'font-family': 'SimSun, sans-serif',
        'line-height': 1,
        content: '"*"',
    },
});

const AddressModal = ({
    title,
    showType,
    modalValue = {},
    addressSelectConfig,
    handleSubmit = () => {},
    visible = false,
    setVisible = () => {},
    codeEq,
    showShareButton = false,
    isInternationalPartner: isInter = false,
    isShareLocking = false,
    language = localStorage.umi_locale,
}: AddModalParameter) => {
    const [form] = Form.useForm(); //取出form实例
    const [isInternationalPartner, setIsInternationalPartner] = useState(isInter);
    const modalOkType = addressSelectConfig?.enumeration || '';
    const [isShowErrorTip, setIsShowErrorTip] = useState(false);
    const [isManualInput, setIsManualInput] = useState(false);
    const showErrorTip =
    isShowErrorTip && !isInternationalPartner && !isManualInput;
    const cleanData = ['mobileNumber-areaCode', 'mobileNumber-number'];
    const [cityOption, setCityOption] = useState([]);
    // 区号数据
    const [areaCodeOption, setAreaCodeOption] = useState([]);
    const values = { mobileArea: 86, ...modalValue };

    const cascaderCode = new Array(4).fill(false);
    cascaderCode[0] = modalValue.countryCode || (codeEq === 'CN' ? codeEq : '');
    cascaderCode[1] = modalValue.provinceCode;
    cascaderCode[2] = modalValue.cityCode;
    cascaderCode[3] = modalValue.districtCode;
    const tel = {
        telephoneNumber: modalValue.telephoneNumber,
        telephoneArea: modalValue.telephoneArea || 86,
    };
    const monitor = useRef(true);

    const getCityOptionFn = () => {
    //获取初始化城市五子码数据
        getInterfaceData(getTransportLocationCode, { codeEq: codeEq }).then(
            (res: any) => {
                if (monitor.current) setCityOption(res);
            }
        );
    };

    const handleCancel = () => {
        getCityOptionFn();
        if (showType !== 'edit') {
            form.resetFields();
        }

        setVisible(false);
    };
    const handleOk = () => {
        getCityOptionFn();
        form.submit();
    };

    const handleClick = () => {
        setIsInternationalPartner(!isInternationalPartner);
        form.resetFields();
    };

    // 五子码下拉框搜索
    const handleSearchTransportLocationCode = debounce((value: string) => {
        getInterfaceData(getTransportLocationCode, {
            idOrNameOrLocalLike: value,
            codeEq: codeEq,
        }).then((res: any) => {
            setCityOption(res);
        });
    }, 700);

    //选择五子码时 直接带出该五子码对应的国家省市区
    const handleCheckAddressInfo = (value: string, option: any) => {
        if (!value) {
            form.setFieldsValue({ cascaderCode: ['', '', '', ''] });
            handleSearchTransportLocationCode(value);
        } else {
            const cascaderCode: any = [];
            const dataObj = JSON.parse(option.key);
            const keyArray: any = Object.keys(dataObj);
            keyArray.forEach((item: string) => {
                if (item !== 'index')
                    cascaderCode.push(dataObj[item] ? dataObj[item] : '');
            });
            form.setFieldsValue({ cascaderCode });
        }
    };
    const handleSwitchManualInput = (boolean: boolean) => {
        form.setFieldsValue({
            cascaderCode: ['CN', '', '', ''],
            addressDetail: '',
        });
        setIsManualInput(boolean);
    };

    const onFinish = (data: any) => {
        const { cascaderCode, telephoneNumber, addressAbbreviation } = data;
        const countryCode = cascaderCode[0];
        const provinceCode = cascaderCode[1];
        const cityCode = cascaderCode[2];
        const districtCode = cascaderCode[3];
        const newData = {
            ...data,
            countryCode,
            provinceCode,
            telephoneNumber: telephoneNumber.telephoneNumber,
            telephoneArea: telephoneNumber.telephoneArea,
            cityCode,
            districtCode,
            contactPartnerType: modalOkType,
            contactPartnerId: modalValue?.contactPartnerId,
            contactPartnerAddressId: modalValue?.contactPartnerAddressId,
            isInternationalPartner,
            isDefault: modalValue?.isDefault,
            addressAbbreviation: addressAbbreviation
                ? addressAbbreviation
                : data?.contactPartnerName,
        };
        cleanData.forEach((item) => {
            delete newData[item];
        });
        handleSubmit(newData, () => {
            setVisible(false);
            form.resetFields();
        });
    };

    const getAreaCodeFn = () => {
    //获取初始区号数据
        getAreaCode().then((res: any) => {
            if (
                res.code === '00000' &&
        Array.isArray(res.result) &&
        monitor.current
            ) {
                setAreaCodeOption(
                    res.result.map((item: Record<string, any>) => ({
                        ctDescribe:
              language === 'en-US' ? item?.countryName : item?.countryNameLocal,
                        ctCode: item.phoneAreaCode,
                    }))
                );
            }
        });
    };

    // 初始读取数据
    useEffect(() => {
        return () => {
            monitor.current = false;
        };
    }, []);
    // 监听国际化设置值
    useEffect(() => {
        if (monitor.current) setIsInternationalPartner(isInter);
    }, [isInter]);

    Object.assign(values, { cascaderCode, telephoneNumber: tel });

    useEffect(() => {
        if (visible && monitor.current) {
            // 点开的时候 如果没有五子码 就初始化
            if (!cityOption.length) {
                getCityOptionFn();
            }
            // 同理 如果没有区号，初始化
            if (!areaCodeOption.length) {
                getAreaCodeFn();
            }
            form.setFieldsValue(values);
            setIsInternationalPartner(isInter);
        }
    }, [visible]);

    return (
        <NewModal
            title={
                <div>
                    {title}
                    <span
                        style={{
                            marginLeft: '30px',
                            display: `${showShareButton ? 'inline-block' : 'none'}`,
                        }}
                    >
                        <Checkbox
                            key={1000 + 'checkboxKey'}
                            disabled={isShareLocking}
                            onClick={handleClick}
                            checked={isInternationalPartner}
                        >
                            <span style={{ fontSize: '12px', fontWeight: 600 }}>
                                {address['Is this data shared at home and abroad']}
                            </span>
                            <span
                                style={{
                                    marginLeft: '30px',
                                    fontSize: '12px',
                                    fontWeight: 600,
                                    color: 'red',
                                    display: `${
                                        isInternationalPartner ? 'inline-block' : 'none'
                                    }`,
                                }}
                            >
                                {address['Please enter value in English']}
                            </span>
                        </Checkbox>
                    </span>
                </div>
            }
            visible={visible}
            onCancel={handleCancel}
            onOk={handleOk}
            okText={address.ok}
            cancelText={address.cancel}
            maskClosable={false}
            zIndex={1031}
        >
            <div>
                <Form
                    onFinish={onFinish}
                    layout="vertical"
                    name="basic"
                    initialValues={values}
                    form={form}
                >
                    {/* // @ts-ignore */}
                    {addressSelectConfig?.enumeration === 'ADDADDRESS' ? (
                        ''
                    ) : (
                        <Form.Item
                            label={`${addressSelectConfig?.partNerTitle}${address.name}`}
                            name="contactPartnerName"
                            rules={[
                                {
                                    max: 50,
                                    required: true,
                                    message: address['Please Company name'],
                                },
                            ]}
                        >
                            {isInternationalPartner ? (
                                <EnglishInput maxLength={50} />
                            ) : (
                                <Input maxLength={50} />
                            )}
                        </Form.Item>
                    )}
                    <NewRow
                        // className={styles.format}
                    >
                        <Col span={11}>
                            <Form.Item
                                label={
                                    addressSelectConfig?.enumeration === 'ADDADDRESS'
                                        ? address['Address Name']
                                        : address['Address Abbreviation']
                                }
                                name="addressAbbreviation"
                                rules={[
                                    {
                                        required: addressSelectConfig?.enumeration === 'ADDADDRESS',
                                        message:
                      addressSelectConfig?.enumeration === 'ADDADDRESS'
                          ? address['Address Name']
                          : address['Address Abbreviation'],
                                    },
                                ]}
                            >
                                {isInternationalPartner ? (
                                    <EnglishInput maxLength={50} />
                                ) : (
                                    <Input maxLength={50} />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item label={address['Address Code']} name="addressCode">
                                {isInternationalPartner ? (
                                    <EnglishInput maxLength={50} />
                                ) : (
                                    <Input maxLength={50} />
                                )}
                            </Form.Item>
                        </Col>
                    </NewRow>
                    <NewRow>
                        <Col span={11}>
                            <Form.Item
                                label={address.Contact}
                                name="contactName"
                                rules={[
                                    {
                                        required: true,
                                        message: address['Please Contact'],
                                    },
                                ]}
                            >
                                {isInternationalPartner ? (
                                    <EnglishInput maxLength={50} />
                                ) : (
                                    <Input maxLength={50} />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Label>
                                <LabelRequired>{address.Tel}</LabelRequired>
                            </Label>
                            <Form.Item name="telephoneNumber">
                                <Input.Group compact style={{ display: 'flex' }}>
                                    <Form.Item
                                        name={['telephoneNumber', 'telephoneArea']}
                                        noStyle
                                        rules={[
                                            {
                                                required: true,
                                                message: address['Please Area Code'],
                                            },
                                        ]}
                                    >
                                        <Select
                                            filterOption={(value: string, option: any) => {
                                                if (
                                                //下拉框筛选false优化
                                                    JSON.stringify(option?.children)
                                                        .toLowerCase()
                                                        .indexOf(value.toLowerCase()) > 0
                                                ) {
                                                    return true;
                                                } else return false;
                                            }}
                                            dropdownMatchSelectWidth={330}
                                            showSearch={true}
                                            style={{
                                                width: '46%',
                                            }}
                                            optionLabelProp="value"
                                        >
                                            {areaCodeOption.map((item: Record<string, any>) => (
                                                <Select.Option key={item.ctCode} value={item.ctCode}>
                                                    {item.ctDescribe}-{item.ctCode}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        name={['telephoneNumber', 'telephoneNumber']}
                                        noStyle
                                        rules={[
                                            {
                                                required: true,
                                                message: address['Please Tel'],
                                            },
                                        ]}
                                    >
                                        {isInternationalPartner ? (
                                            <EnglishInput style={{ width: '77%' }} maxLength={50} />
                                        ) : (
                                            <Input style={{ width: '77%' }} maxLength={50} />
                                        )}
                                    </Form.Item>
                                </Input.Group>
                            </Form.Item>
                        </Col>
                    </NewRow>
                    <NewRow>
                        <Col span={11}>
                            <Label>{address['Mobile phone']}</Label>
                            <Form.Item
                                label={address['Mobile phone']}
                                name="mobileNumber"
                                noStyle
                            >
                                <Input.Group compact style={{ display: 'flex' }}>
                                    <Form.Item name="mobileArea" noStyle>
                                        <Select
                                            filterOption={(value: string, option: any) => {
                                                if (
                                                //下拉框筛选false优化
                                                    JSON.stringify(option?.children)
                                                        .toLowerCase()
                                                        .indexOf(value.toLowerCase()) > 0
                                                ) {
                                                    return true;
                                                } else return false;
                                            }}
                                            dropdownMatchSelectWidth={330}
                                            showSearch={true}
                                            allowClear
                                            style={{
                                                width: '135px',
                                            }}
                                            optionLabelProp="value"
                                        >
                                            {areaCodeOption.map((item: Record<string, any>) => (
                                                <Select.Option key={item.ctCode} value={item.ctCode}>
                                                    {item.ctDescribe}-{item.ctCode}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item name="mobileNumber" noStyle>
                                        {isInternationalPartner ? (
                                            <EnglishInput style={{ width: '77%' }} maxLength={50} />
                                        ) : (
                                            <Input style={{ width: '77%' }} maxLength={50} />
                                        )}
                                    </Form.Item>
                                </Input.Group>
                            </Form.Item>
                        </Col>
                        <Col style={{ height: 86 }} span={11}>
                            {isInternationalPartner ? (
                                <Form.Item
                                    label={address.email}
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            type: 'email',
                                            message: address['Please email'],
                                        },
                                    ]}
                                >
                                    {isInternationalPartner ? (
                                        <EnglishInput maxLength={50} />
                                    ) : (
                                        <Input maxLength={50} />
                                    )}
                                </Form.Item>
                            ) : (
                                <Form.Item
                                    rules={[
                                        {
                                            required: false,
                                            type: 'email',
                                            message: address['Please email'],
                                        },
                                    ]}
                                    label={address.email}
                                    name="email"
                                >
                                    <Input maxLength={50} />
                                </Form.Item>
                            )}
                        </Col>
                    </NewRow>
                    <NewRow>
                        <Col span={11}>
                            <Form.Item label={address.Postcode} name="postCode">
                                {isInternationalPartner ? (
                                    <EnglishInput maxLength={10} />
                                ) : (
                                    <Input maxLength={10} />
                                )}
                            </Form.Item>
                        </Col>
                    </NewRow>
                    {!isInternationalPartner && !isManualInput && (
                        <SearchAddress
                            setIsShowErrorTip={setIsShowErrorTip}
                            handleSwitchManualInput={handleSwitchManualInput}
                            form={form}
                            Form={Form}
                        />
                    )}
                    <NewRow style={{ position: 'relative' }}>
                        <Input.Group compact style={{ display: 'flex' }}>
                            <Cascader
                                label={
                                    <div>
                                        {address['Administrative Region']}
                                        {showErrorTip && (
                                            <span
                                                style={{
                                                    color: '#ff4d4f',
                                                    paddingLeft: '8px',
                                                }}
                                            >
                                                {
                                                    address[
                                                        'This area does not support automatic address search mode'
                                                    ]
                                                }
                                            </span>
                                        )}
                                    </div>
                                }
                                name="cascaderCode"
                                rules={[
                                    {
                                        required: true,
                                    },
                                    () => ({
                                        validator (rule, value) {
                                            let sign = false;
                                            sign = value.every((item: any, index: number) => {
                                                // 国内地址的时候 必须要选到市区
                                                if (index < (value[0] === 'CN' ? 4 : 3)) {
                                                    if (item) {
                                                        return true;
                                                    } else return false;
                                                } else return true;
                                            });
                                            if (sign) return Promise.resolve();
                                            return Promise.reject(
                                                address['Please Administrative Region']
                                            );
                                        },
                                    }),
                                ]}
                            >
                                <CascaderFormComp
                                    form={form}
                                    setCityOption={setCityOption}
                                    codeEq={codeEq}
                                    disabled={!isManualInput && !isInternationalPartner}
                                    isInternationalPartner={isInternationalPartner}
                                    language={language}
                                />
                            </Cascader>
                            {isInternationalPartner ? (
                                <Form.Item //城市五字码部分
                                    style={{
                                        width: '100%',
                                        position: 'relative',
                                        top: '30px',
                                        height: '30px',
                                    }}
                                    rules={[
                                        {
                                            required: true,
                                            message: address['Please CityCode'],
                                        },
                                    ]}
                                    name="transportLocationCode"
                                >
                                    <Select
                                        allowClear
                                        onChange={handleCheckAddressInfo}
                                        showSearch
                                        onSearch={handleSearchTransportLocationCode}
                                        filterOption={false}
                                    >
                                        {cityOption?.map((item, index) => {
                                            return ExternalCityOption({ item, index });
                                        })}
                                    </Select>
                                </Form.Item>
                            ) : (
                                ''
                            )}
                        </Input.Group>
                        {!isInternationalPartner && isManualInput && (
                            <SwitchButton handleSwitchManualInput={handleSwitchManualInput} />
                        )}
                    </NewRow>
                    <Form.Item
                        label={address.address}
                        name="addressDetail"
                        rules={[
                            {
                                required: true,
                                message: address['Please Address'],
                            },
                        ]}
                    >
                        {isInternationalPartner ? (
                            <EnglishInput
                                disabled={!isManualInput && !isInternationalPartner}
                                maxLength={150}
                            />
                        ) : (
                            <Input
                                disabled={!isManualInput && !isInternationalPartner}
                                maxLength={150}
                            />
                        )}
                    </Form.Item>
                    {!isInternationalPartner && (
                        <NewRow style={{ width: '100%' }}>
                            <Form.Item
                                style={{
                                    width: '100%',
                                }}
                                label={address['House number']}
                                name={'houseNumber'}
                            >
                                <Input style={{ width: '100%' }} maxLength={150} />
                            </Form.Item>
                        </NewRow>
                    )}
                </Form>
            </div>
        </NewModal>
    );
};

export default AddressModal;
