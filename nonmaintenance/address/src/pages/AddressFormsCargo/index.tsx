import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ConfigProvider, Row, Col, Checkbox, Button } from 'antd';
import { EditFilled, RollbackOutlined } from '@ant-design/icons';
import debounce from 'lodash/debounce';

import AddressSelect from './AddressSelect';
import contents from '../../utils/contents';
import * as Api from '../../Api/index';
import AddressInfo from './AddressInfo';
import FormItems from './FormItems';
import { addressIntl } from '../../Intl/index';
import { AddressFormItemCargosInterface } from '../../types/index';

import {
    StAddressBox,
    StTitleLabel,
    StShipSelectTitle,
    StShipSelectBody,
    StEditIcon,
} from './styles';

const { address } = addressIntl;

// todo 1: 默认情况下展示AddressInfo 的相关内容， select中的 新增地址按钮迁移到select 组件右侧
// todo 2: FormItems 展示的时候 隐藏 AddressInfo 反之亦然。点击编辑按钮的时候新增按钮隐藏或者disable
// todo 3: FormItems 中的验证使用自定义表单验证

const AddressFormsCargo = <T extends Record<string, any>>(
    props: AddressFormItemCargosInterface<T>
) => {
    const {
        id = '',
        Form,
        type,
        selectStyle,
        onChange,
        RandomNumber,
        contactPartnerId: contactPartnerIdProp,
        value: valueProp,
        codeEq,
        version,
        addressInfoStyle = {},
        isInternationalPartner: isInter = false,
        language = localStorage.umi_locale,
        isShareLocking = false,
        disable = false,
        addressInfoClass = '',
        showShareButton = true,
        dataLanguageEnvironment = false,
        form,
    } = props;
    const [contactPartnerId, setContactPartnerId] =
    useState(contactPartnerIdProp);
    const [addressDetail, setAddressDetail] = useState<any>(valueProp || {}); // 地址详情
    const [FormDetail, setFormDetail] = useState<any>(valueProp || {}); // 新增或者修改使用的地址详情
    const [ShowForms, setShowForms] = useState(false); // 显示表单框
    const [IsEdit, setIsEdit] = useState(false); // 是否是编辑状态
    const [IsCheck, setIsCheck] = useState(false); // 是否处于验证状态

    const [isInternationalPartner, setIsInternationalPartner] = useState(isInter);

    const [List, setList] = useState([] as Record<string, any>[]);
    const addressType = 'ADDRESS';

    const monitor = useRef(true);
    const selectRef: any = useRef();

    let addressSelectConfig = contents[addressType];
    addressSelectConfig = {
        ...addressSelectConfig,
        // partNerTitle: label,
        partNerTitle: address[type]?.name || '',
    };

    // 随机数发生改变， 表示验证失败 需要显示验证提示
    useEffect(() => {
        setIsCheck(true);
    }, [RandomNumber]);

    // 修改当前提货收货地址
    const handleChange = (id: string, isValueChange: boolean) => {
        if (isValueChange) {
            if (!id) {
                getList(contactPartnerId, '');
                // @ts-ignore
                onChange && onChange({} as T);
                setAddressDetail({});
                return;
            }
            getDetail(id).then((detail) => {
                if (detail) {
                    onChange &&
            onChange({
                ...detail,
                contactPartnerId:
                detail?.contactPartner?.contactPartnerId || contactPartnerId,
            });

                    // 设置detail，同时加入contactPartnerId
                    setAddressDetail({
                        ...detail,
                        contactPartnerId:
              detail?.contactPartner?.contactPartnerId || contactPartnerId,
                    });
                }
            });
        }
    };

    // 添加提货收货地址
    const handleAdd = (e: T) => {
        getList(e?.contactPartnerId);
        if (e) {
            handleChange(e[addressSelectConfig.ctCode], true);
        }

    // onChange && onChange(e.detail);
    // setAddressDetail(e.detail);
    };
    //获取当前下拉详情数据
    const getDetail = async (id: string) => {
        if (!id) {
            setAddressDetail({} as T);
            return undefined;
        }
        const res: any = await Api.getDeliveryAddressInfo({
            id,
            isInternationalPartner,
            dataLanguageEnvironment,
        });
        if (res && res.code === '00000' && res.result) {
            return res.result;
        }
        return undefined;
    };

    // 获取同发货方或收货方的地址
    const getAddressDetail = async () => {
        const data: any = await Api.getAddressByPartnerAddressDetail({
            id: contactPartnerId,
            dataLanguageEnvironment,
        });
        if (data && data.code === '00000' && data.result?.length) {
            const addressArr = data.result || [];
            let selDefaultAddress = addressArr.find((item: any) => {
                return item.isDefault;
            });
            // 数据格式修改， 将收发货方的地址数据 放到contactPartner里面
            selDefaultAddress = {
                ...selDefaultAddress,
                contactPartnerId:
          data.result?.contactPartner?.contactPartnerId || contactPartnerId,
            };
            onChange && onChange(selDefaultAddress);
            //   接口调用成功就返回到外层
            // onChange && onChange(data.result);
            setAddressDetail(selDefaultAddress);
            // setAddressDetail({
            //     ...selDefaultAddress,
            //     contactPartnerId: data.result?.contactPartnerId,
            // });
        }
    };

    // 给list的单个项给予数据
    const setListItem = (item: any) => {
        return {
            ctCode: item?.[addressSelectConfig.ctCode],
            ctDescribe: item?.[addressSelectConfig.ctDescribe],
            ctAbbreviation: item[addressSelectConfig.ctAbbreviation],
            ctAddressCode: item[addressSelectConfig.ctAddressCode],
        };
    };

    // 调取接口拿到address下拉框数据
    const getList = debounce((contactPartnerId: string, nameLike?: string) => {
        if (contactPartnerId) {
            setList([]);
            Api.getDeliveryAddressOption({
                id: contactPartnerId,
                nameLike,
                isDefault: disable,
                codeEq,
                dataLanguageEnvironment,
            }).then((res: any) => {
                if (
                    res &&
          res.code === '00000' &&
          res.result.data &&
          Array.isArray(res.result.data)
                ) {
                    setList(
                        res.result.data.map((item: Record<string, any>) => ({
                            ...item,
                            ...setListItem(item),
                        }))
                    );
                }
            });
        } else {
            setList([]);
        }
    }, 500);

    // 点击编辑
    const handleEdit = () => {
        setFormDetail(addressDetail);
        setIsEdit(true);
        setIsCheck(false);
        setShowForms(true);
    };
    const handleCancel = () => {
    // setFormDetail({});
        setIsEdit(false);
        setIsCheck(false);
        setShowForms(false);
        onChange && onChange(addressDetail);
    };

    // 监听国际化设置值
    useEffect(() => {
        setIsInternationalPartner(isInter);
    }, [isInter]);

    // 当收发货人发生改变时 监听ID和verision 执行的函数改变当前select值
    useEffect(() => {
        if ((disable && contactPartnerIdProp) || (disable && version)) {
            getList(contactPartnerIdProp);
        } else if (contactPartnerIdProp !== contactPartnerId) {
            setAddressDetail({});
            onChange && onChange({} as T);
            setContactPartnerId(contactPartnerIdProp);
            getList(contactPartnerIdProp, '');
        }
    }, [contactPartnerIdProp, version]);

    //  判断只有一条数据.且为default且为disable
    useEffect(() => {
        disable && getList(contactPartnerIdProp);
    }, [disable]);

    // 渲染时会立刻执行的函数
    useEffect(() => {
    // 如果有地址信息，就直接使用地址信息作为select的option列表， 一般用作回显
        const contactPartnerName = addressDetail
            ? addressDetail[addressSelectConfig.ctDescribe]
            : '';
        if (addressDetail && contactPartnerName) {
            setList([setListItem(addressDetail)]);
        } else {
            getList(contactPartnerId);
        }

        return () => {
            monitor.current = false;
        };
    }, []);


    // 用户输入搜索时执行
    const onSearch = debounce((value: string) => {
        getList(contactPartnerId, value);
        if (value) {
            getList(contactPartnerId, value);
        } else {
            getList(
                contactPartnerId,
                addressDetail ? addressDetail[addressSelectConfig.ctDescribe] : ''
            );
        }
    }, 800);

    const selectProps = {
        onSearch,
        filterOption: false,
    };

    const onChangeAdd = (e: any) => {
        setShowForms(e.target.checked);
        if (e.target.checked) {
            setIsCheck(false);
            setFormDetail({
                mobileArea: 86,
                telephoneArea: 86,
            });
            onChange && onChange({} as T);
        }else{
            selectRef.current.selectChange();
        }
       
    };

    /* ========= render =========== */
    let renderEdit;
    if (addressDetail?.contactPartnerId && !addressDetail?.isDefault) {
        renderEdit = (
            <StEditIcon>
                <a className="icon" onClick={handleEdit}>
                    <EditFilled />
                </a>
            </StEditIcon>
        );
    } else {
        renderEdit = null;
    }
    const cancelBtn = (
        <Button
            className="cancel-btn"
            onClick={handleCancel}
            type="primary"
            ghost
            icon={<RollbackOutlined />}
            size={'small'}
        >
            {address['cancel']}
        </Button>
    );

    return (
        <ConfigProvider prefixCls={'jusda-address'}>
            <StAddressBox id={id}>
                <Row gutter={12} align="top">
                    <Col span={3}>
                        <StTitleLabel>
                            <div className="icon">
                                <div>
                                    <span className="reque">*</span>
                                    {addressSelectConfig.partNerTitle}
                                </div>
                                <div className="icon-img">
                                    <img src={addressSelectConfig?.icon[type]?.default} />
                                    {/* <img src={addressSelectConfig?.icon?.default} /> */}
                                </div>
                            </div>
                        </StTitleLabel>
                    </Col>
                    <Col span={21}>
                        <StShipSelectTitle>
                            <div
                                style={{
                                    display: `${!ShowForms ? 'block' : 'none'}`,
                                }}
                            >
                                <AddressSelect
                                    ref={selectRef}
                                    style={{ width: '500px', ...selectStyle }}
                                    optionsData={List}
                                    addressSelectConfig={addressSelectConfig}
                                    onChange={handleChange}
                                    value={addressDetail?.contactPartnerAddressId}
                                    selectProps={selectProps}
                                    disable={IsEdit || disable}
                                    language={language}
                                    isInternationalPartner={isInternationalPartner}
                                />
                            </div>
                            <div
                                style={{
                                    display: `${
                                        showShareButton && ShowForms ? 'inline-block' : 'none'
                                    }`,
                                }}
                            >
                                <Checkbox
                                    key={1000 + 'checkboxKey'}
                                    disabled={isShareLocking}
                                    onClick={() =>
                                        setIsInternationalPartner(!isInternationalPartner)
                                    }
                                    checked={isInternationalPartner}
                                >
                                    <span style={{ fontSize: '14px', fontWeight: 400 }}>
                                        {address['Is this data shared at home and abroad']}
                                    </span>
                                    <span
                                        style={{
                                            marginLeft: '10px',
                                            fontSize: '14px',
                                            color: '#ff4d4f',
                                            display: `${
                                                isInternationalPartner ? 'inline-block' : 'none'
                                            }`,
                                        }}
                                    >
                                        {address['Please enter value in English']}
                                    </span>
                                </Checkbox>
                            </div>
                            <div>
                                <Checkbox
                                    disabled={IsEdit}
                                    checked={!IsEdit && ShowForms}
                                    onChange={onChangeAdd}
                                >
                                    {address['add address']}
                                </Checkbox>
                            </div>
                        </StShipSelectTitle>
                        <div>
                            <StShipSelectBody>
                                <div className={`infoBody ${!ShowForms ? 'show' : ''}`}>
                                    <AddressInfo
                                        addressSelectConfig={addressSelectConfig}
                                        type={type}
                                        addressInfoClass={addressInfoClass}
                                        addressCont={addressDetail}
                                        style={{ background: 'unset', ...addressInfoStyle }}
                                        handleAddress={getAddressDetail}
                                    />
                                    {renderEdit}
                                </div>
                                <div className={`FormItemsBody ${ShowForms ? 'show' : ''}`}>
                                    <FormItems
                                        type={type}
                                        Form={Form}
                                        form={form}
                                        disable={disable}
                                        isShareLocking={isShareLocking}
                                        showShareButton={showShareButton}
                                        isInternationalPartner={isInternationalPartner}
                                        language={language}
                                        onChange={(val: any) => onChange(val)}
                                        addressSelectConfig={addressSelectConfig}
                                        contactPartnerId={contactPartnerId}
                                        title={`${address.edit}${addressSelectConfig.partNerTitle}`}
                                        modalValue={FormDetail}
                                        handleSubmit={handleEdit}
                                        codeEq={codeEq}
                                        showType={IsEdit ? 'edit' : 'add'}
                                        cancelBtn={cancelBtn}
                                        isCheck={IsCheck}
                                    />
                                </div>
                            </StShipSelectBody>
                        </div>
                    </Col>
                </Row>
            </StAddressBox>
        </ConfigProvider>
    );
};

export default AddressFormsCargo;
