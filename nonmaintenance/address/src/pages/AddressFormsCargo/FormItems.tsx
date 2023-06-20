import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Col, Form, Input, Modal, Row, Select, Checkbox, Button } from 'antd';
// import { debounce } from '../../utils/Fn';
import CascaderFormComp from '../CascaderFormComp';
import debounce from 'lodash/debounce';
import * as Api from '../../Api/index';
import { FormItemsInterface } from '../../types/index';
import { addressIntl } from '../../Intl';
import EnglishInput from '../EnglishInput/index';
import ExternalCityOption from '../FromDialog/CityOption';
import { getInterfaceData } from '../Address/tools';
import SwitchButton from '../../Components/SwitchButton';
import SearchAddress from '../../Components/SearchAddress';
import { StringGradients } from 'antd/lib/progress/progress';

// 加载静态资源

const { address } = addressIntl;

const StFormItemsBox = styled.div`
  paddong-top: 5px;
  .jusda-address-form-item-label {
    display: block;
    width: 100%;
    text-align: left;
  }

  label {
    // color: #8D9AAD !important;
    font-size: 14px !important;
    font-weight: 400 !important;
  }
  .cancel-btn {
    border: 1px solid #ea900e;
    color: #ea900e;
  }
`;

// @ts-ignore
const NewRow = styled(Row)`
  display: flex;
  justify-content: space-between;
  width: 100%;
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

const StLabel = styled.div`
  margin: 0;
  padding: 0 0 8px;
  line-height: 1.5715;
  white-space: initial;
  text-align: left;
  color: #8d9aad;
`;

const StLabelRequired = styled.label({
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

const Cascader = styled(Form.Item)`
  .jusda-address-form-item-control-input-content {
    display: flex;
    width: 80%;
    justify-content: flex-start;
    > div {
      width: 100px;
    }
  }
`;

const FormItems = <T extends Record<string, any>>({
    Form,
    modalValue,
    onChange,
    codeEq,
    contactPartnerId,
    isInternationalPartner = false,
    language = localStorage.umi_locale,
    cancelBtn,
    isCheck,
    form = {},
}: FormItemsInterface<T>) => {
    const [cityOption, setCityOption] = useState([]);
    const [FormDetail, setFormDetail] = useState(modalValue);
    const [isManualInput, setIsManualInput] = useState(false);
    const [isShowErrorTip, setIsShowErrorTip] = useState(false);
    const showErrorTip =
    isShowErrorTip && !isInternationalPartner && !isManualInput;
    // 区号数据
    const [areaCodeOption, setAreaCodeOption] = useState([]);
    const addressCodes = [
        'countryCode',
        'provinceCode',
        'cityCode',
        'districtCode',
    ];
    const addressNames = [
        'countryName',
        'provinceName',
        'cityName',
        'districtName',
    ];

    let cascaderCode = new Array(4).fill(false);
    cascaderCode[0] = codeEq === 'CN' ? codeEq : false;
    const [CodeOption, setCodeOption] = useState(
        modalValue?.cascaderCode || cascaderCode
    );

    const monitor = useRef(true);

    const processCascaderCode = (value: any) => {
        const { codes, values } = value;
        let isWriteCode = true;
        // 修改数据的时候触发， 修改地址cascaderCode的时候部分情况会同时修改 transportLocationCode，单独调用本函数会使用旧的modalValue数据
        let otherJson: any = {};
        // 由于需要返回对应的地址name 所以在单独点击select 地址信息的时候, 除了cascaderCode 同时也将对应的name也保存
        codes.forEach((item: any, index: number) => {
            isWriteCode = isWriteCode && (index > 2 ? true : item);
            otherJson[addressCodes[index]] = item;
            // 存在code 的时候，如果有name， 表示该条地址修改过，这里就把name保存
            if (item) {
                if (values[index]) {
                    otherJson[addressNames[index]] = values[index];
                }
            } else {
                // 不存在code 表示地址联动还没有到当前级别，name也置空
                otherJson[addressNames[index]] = '';
            }
        });
        if (!isWriteCode) {
            // 在国际共享的情况下， 修改cascaderCode 的时候如果没有扩展到市级区域， 五子码就修改为null
            otherJson['transportLocationCode'] = null;
        }
        return otherJson;
    };

    const changeInput = (name: string, value?: any, moreParameters?: any) => {
        let formData: any;
        // 因此多数据修改的时候直接name 传递为一个对象，包含需要修改的所有数据
        let otherJson: any = {};
        let moreJson: any = {};
        const { codes, values } = value;
        if (moreParameters) {
            moreParameters.forEach((item: any, index: number) => {
                moreJson[item.name] = item.value;
            });
        } else if (name === 'cascaderCode') {
            otherJson = processCascaderCode(value);
        }

        formData = {
            ...FormDetail,
            [name]: name === 'cascaderCode' ? codes : value,
            ...otherJson,
            ...moreJson,
            contactPartnerId: formData?.contactPartnerId || contactPartnerId,
        };

        // 此方法下个版本做优化更改
        if (name === 'test') delete formData['test'];
        setFormDetail(formData);
        onChange(formData);
    };

    const handleSwitchManualInput = (boolean: boolean) => {
        changeInput('test', 'test', [
            { name: 'location', value: undefined },
            { name: 'addressDetail', value: undefined },
            {
                name: 'cascaderCode',
                value: ['CN', '', '', ''],
            },
        ]);
        setCodeOption(['CN', '', '', '']);
        setIsManualInput(boolean);
    };

    // 五子码下拉框搜索
    const handleSearchTransportLocationCode = debounce((value: string) => {
        getInterfaceData(Api.getTransportLocationCode, {
            idOrNameOrLocalLike: value,
            codeEq: codeEq,
        }).then((res: any) => {
            setCityOption(res);
        });
    }, 700);

    //选择五子码时 直接带出该五子码对应的国家省市区
    const handleCheckAdderssInfo = async (value: string, option: any) => {
    // ('asasa', value, option)
        if (!value) {
            await changeInput('transportLocationCode', '');
            setCodeOption(['', '', '', '']);
            handleSearchTransportLocationCode(value);
        } else {
            const caCode: any = [];
            const dataObj = JSON.parse(option.key);
            const keyArray: any = Object.keys(dataObj);
            keyArray.forEach((item: string) => {
                if (item !== 'index') caCode.push(dataObj[item] ? dataObj[item] : '');
            });
            await changeInput('transportLocationCode', value);
            await setCodeOption(caCode);
        }
    };

    const getCityOptionFn = () => {
    //获取初始化城市五子码数据
        getInterfaceData(Api.getTransportLocationCode, { codeEq: codeEq }).then(
            (res: any) => {
                if (monitor.current) setCityOption(res);
            }
        );
    };

    const getAreaCodeFn = () => {
    //获取初始区号数据
        Api.getAreaCode().then((res: any) => {
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

    const isError = ({
        key,
        value,
        required = true,
        rules,
    }: {
        key: string;
        value: any;
        required?: boolean;
        rules?: RegExp;
    }) => {
        if (!isCheck || value === undefined) {
            return false;
        }
        if (key === 'cascaderCode' && value[key]) {
            const sign = value[key].every((item: any, index: number) => {
                // 国内地址的时候 必须要选到市区
                if (index < (value[key][0] === 'CN' ? 4 : 3)) {
                    return item || false;
                } else return true;
            });
            return !sign;
        }
        if (required) {
            if (rules && value[key]) {
                return value[key] ? (rules.test(value[key]) ? false : true) : true;
            }

            if (isCheck) {
                if (rules && value[key]) {
                    return value[key] ? (rules.test(value[key]) ? false : true) : true;
                }
                // ('aaa', !value[key] && value[key] !== false)
                return !value[key] && value[key] !== false ? true : false;
            } else {
                if (rules && value[key]) {
                    return value[key] ? (rules.test(value[key]) ? false : true) : true;
                }
                return value.hasOwnProperty(key) && !value[key] && value[key] !== false
                    ? true
                    : false;
            }
        } else {
            if (rules && value[key]) {
                return value[key] ? (rules.test(value[key]) ? false : true) : true;
            }
            return '';
        }
    };

    // 初始读取数据
    useEffect(() => {
        if (!cityOption.length) {
            getCityOptionFn();
        }
        // 同理 如果没有区号，初始化
        if (!areaCodeOption.length) {
            getAreaCodeFn();
        }
        //获取初始区号数据
        return () => {
            monitor.current = false;
        };
    }, []);

    useEffect(() => {
        if (modalValue !== undefined && Object.keys(modalValue).length) {
            // 如果modalValue 中包含cascaderCode
            if (modalValue?.cascaderCode) {
                cascaderCode = modalValue?.cascaderCode;
            } else if (modalValue[addressCodes[0]]) {
                cascaderCode[0] =
          modalValue[addressCodes[0]] || (codeEq === 'CN' ? codeEq : '');
                cascaderCode[1] = modalValue[addressCodes[1]] || '';
                cascaderCode[2] = modalValue[addressCodes[2]] || '';
                cascaderCode[3] = modalValue[addressCodes[3]] || '';
            }
            setCodeOption(cascaderCode);
            setFormDetail(modalValue);
        }
    }, [modalValue]);

    return (
        <StFormItemsBox>
            <Row gutter={20} align="top">
                <Col span={8}>
                    <StLabel>
                        <StLabelRequired>{address['Address Name']}</StLabelRequired>
                    </StLabel>
                    <Form.Item
                        {...(isError({
                            key: 'addressAbbreviation',
                            value: FormDetail,
                        })
                            ? {
                                help: address['Please Address Name'],
                                validateStatus: 'error',
                            }
                            : {})}
                    >
                        {isInternationalPartner ? (
                            <EnglishInput
                                onChange={(val: any) => changeInput('addressAbbreviation', val)}
                                value={FormDetail?.addressAbbreviation}
                                maxLength={50}
                            />
                        ) : (
                            <Input
                                onChange={(e) =>
                                    changeInput('addressAbbreviation', e.target.value)
                                }
                                value={FormDetail?.addressAbbreviation}
                                maxLength={50}
                            />
                        )}
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <StLabel>{address['Address Code']}</StLabel>
                    <Form.Item>
                        {isInternationalPartner ? (
                            <EnglishInput
                                onChange={(val: any) => changeInput('addressCode', val)}
                                value={FormDetail?.addressCode}
                                maxLength={50}
                            />
                        ) : (
                            <Input
                                onChange={(e) => changeInput('addressCode', e.target.value)}
                                value={FormDetail?.addressCode}
                                maxLength={50}
                            />
                        )}
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <StLabel>
                        <StLabelRequired>{address.Contact}</StLabelRequired>
                    </StLabel>
                    <Form.Item
                        {...(isError({
                            key: 'contactName',
                            value: FormDetail,
                        })
                            ? { help: address['Please Contact'], validateStatus: 'error' }
                            : {})}
                    >
                        {isInternationalPartner ? (
                            <EnglishInput
                                onChange={(val: any) => changeInput('contactName', val)}
                                value={FormDetail?.contactName}
                                maxLength={50}
                            />
                        ) : (
                            <Input
                                onChange={(e) => changeInput('contactName', e.target.value)}
                                value={FormDetail?.contactName}
                                maxLength={50}
                            />
                        )}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20} align="top">
                <Col span={8}>
                    <StLabel>
                        <StLabelRequired>{address.Tel}</StLabelRequired>
                    </StLabel>
                    <Form.Item
                        {...(isError({
                            key: 'telephoneArea',
                            value: FormDetail,
                        })
                            ? { help: address['Please Area Code'], validateStatus: 'error' }
                            : {})}
                        {...(isError({
                            key: 'telephoneNumber',
                            value: FormDetail,
                        })
                            ? { help: address['Please Tel'], validateStatus: 'error' }
                            : {})}
                    >
                        <Input.Group compact style={{ display: 'flex' }}>
                            <Form.Item
                                noStyle
                                {...(isError({
                                    key: 'telephoneArea',
                                    value: FormDetail,
                                })
                                    ? {
                                        help: address['Please Area Code'],
                                        validateStatus: 'error',
                                    }
                                    : {})}
                            >
                                <Select
                                    onChange={(val: any) => changeInput('telephoneArea', val)}
                                    value={FormDetail?.telephoneArea}
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
                                {...(isError({
                                    key: 'telephoneNumber',
                                    value: FormDetail,
                                })
                                    ? { help: address['Please Tel'], validateStatus: 'error' }
                                    : {})}
                                noStyle
                            >
                                {isInternationalPartner ? (
                                    <EnglishInput
                                        style={{ width: '77%' }}
                                        onChange={(val: any) => changeInput('telephoneNumber', val)}
                                        value={FormDetail?.telephoneNumber}
                                        maxLength={50}
                                    />
                                ) : (
                                    <Input
                                        style={{ width: '77%' }}
                                        onChange={(e) =>
                                            changeInput('telephoneNumber', e.target.value)
                                        }
                                        value={FormDetail?.telephoneNumber}
                                        maxLength={50}
                                    />
                                )}
                            </Form.Item>
                        </Input.Group>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <StLabel>{address['Mobile phone']}</StLabel>
                    <Form.Item noStyle>
                        <Input.Group compact style={{ display: 'flex' }}>
                            <Form.Item noStyle>
                                <Select
                                    onChange={(val: any) => changeInput('mobileArea', val)}
                                    value={FormDetail?.mobileArea}
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
                            <Form.Item noStyle>
                                {isInternationalPartner ? (
                                    <EnglishInput
                                        style={{ width: '77%' }}
                                        onChange={(val: any) => changeInput('mobileNumber', val)}
                                        value={FormDetail?.mobileNumber}
                                        maxLength={50}
                                    />
                                ) : (
                                    <Input
                                        style={{ width: '77%' }}
                                        onChange={(e) =>
                                            changeInput('mobileNumber', e.target.value)
                                        }
                                        value={FormDetail?.mobileNumber}
                                        maxLength={50}
                                    />
                                )}
                            </Form.Item>
                        </Input.Group>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <StLabel>
                        {isInternationalPartner ? (
                            <StLabelRequired>{address['email']}</StLabelRequired>
                        ) : (
                            address['email']
                        )}
                    </StLabel>
                    <Form.Item
                        {...(isError({
                            key: 'email',
                            value: FormDetail,
                            required: isInternationalPartner ? true : false,
                            rules:
                /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                        })
                            ? { help: address['Please email'], validateStatus: 'error' }
                            : {})}
                    >
                        {isInternationalPartner ? (
                            <EnglishInput
                                maxLength={50}
                                onChange={(val: any) => changeInput('email', val)}
                                value={FormDetail?.email}
                            />
                        ) : (
                            <Input
                                maxLength={50}
                                onChange={(e) => changeInput('email', e.target.value)}
                                value={FormDetail?.email}
                            />
                        )}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20} align="top">
                <Col span={16}>
                    {!isInternationalPartner && !isManualInput && (
                        <SearchAddress
                            setIsShowErrorTip={setIsShowErrorTip}
                            FormDetail={FormDetail}
                            setCodeOption={setCodeOption}
                            isCargoInfo={true}
                            changeInput={changeInput}
                            form={form}
                            Form={Form}
                            handleSwitchManualInput={handleSwitchManualInput}
                        />
                    )}
                    <div style={{ position: 'relative' }}>
                        <StLabel>
                            <StLabelRequired>
                                {address['Administrative Region']}
                            </StLabelRequired>
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
                        </StLabel>
                        <Input.Group compact style={{ display: 'flex' }}>
                            <Cascader
                                {...(isError({
                                    key: 'cascaderCode',
                                    value: FormDetail,
                                })
                                    ? {
                                        help: address['Please Administrative Region'],
                                        validateStatus: 'error',
                                    }
                                    : {})}
                            >
                                <CascaderFormComp
                                    disabled={!isManualInput && !isInternationalPartner}
                                    value={CodeOption}
                                    onChange={(val: any) => changeInput('cascaderCode', val)}
                                    setCityOption={setCityOption}
                                    codeEq={codeEq}
                                    isInternationalPartner={isInternationalPartner}
                                    language={language}
                                    needValue
                                />
                            </Cascader>
                            {isInternationalPartner ? (
                                <Form.Item //城市五字码部分
                                    style={{
                                        width: '95px',
                                        position: 'relative',
                                        height: '30px',
                                    }}
                                    {...(isError({
                                        key: 'transportLocationCode',
                                        value: FormDetail,
                                    })
                                        ? {
                                            help: address['Please CityCode'],
                                            validateStatus: 'error',
                                        }
                                        : {})}
                                >
                                    <Select
                                        style={{ width: '95px' }}
                                        allowClear
                                        value={FormDetail?.transportLocationCode || ''}
                                        onChange={handleCheckAdderssInfo}
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
                            <SwitchButton
                                style={{ top: 0 }}
                                handleSwitchManualInput={handleSwitchManualInput}
                            />
                        )}
                    </div>
                </Col>
                <Col span={8}>
                    <div>
                        <StLabel>{address['Postcode']}</StLabel>
                        <Form.Item>
                            {isInternationalPartner ? (
                                <EnglishInput
                                    maxLength={10}
                                    onChange={(val: any) => changeInput('postCode', val)}
                                    value={FormDetail?.postCode}
                                />
                            ) : (
                                <Input
                                    maxLength={10}
                                    onChange={(e) => changeInput('postCode', e.target.value)}
                                    value={FormDetail?.postCode}
                                />
                            )}
                        </Form.Item>
                    </div>
                </Col>
            </Row>

            <Row gutter={20} align="top">
                <Col span={24}>
                    <StLabel>
                        <StLabelRequired>{address.address}</StLabelRequired>
                    </StLabel>
                    <Form.Item
                        {...(isError({
                            key: 'addressDetail',
                            value: FormDetail,
                        })
                            ? { help: address['Please Address'], validateStatus: 'error' }
                            : {})}
                    >
                        {isInternationalPartner ? (
                            <EnglishInput
                                maxLength={150}
                                onChange={(val: any) => changeInput('addressDetail', val)}
                                value={FormDetail?.addressDetail}
                            />
                        ) : (
                            <Input
                                disabled={!isManualInput && !isInternationalPartner}
                                maxLength={150}
                                onChange={(e) => changeInput('addressDetail', e.target.value)}
                                value={FormDetail?.addressDetail}
                            />
                        )}
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                {!isInternationalPartner && (
                    <NewRow style={{ width: '100%' }}>
                        <Form.Item
                            style={{
                                width: '100%',
                            }}
                            label={address['House number']}
                        >
                            <Input
                                onChange={(e) => changeInput('houseNumber', e.target.value)}
                                style={{ width: '100%' }}
                                maxLength={150}
                            />
                        </Form.Item>
                    </NewRow>
                )}
            </Row>
            <div>
                <Row gutter={20} align="top" justify="space-between">
                    <Col span={10}></Col>
                    <Col>{cancelBtn}</Col>
                </Row>
            </div>
        </StFormItemsBox>
    );
};

export default FormItems;
