import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ConfigProvider, Row, Col } from 'antd';
import debounce from 'lodash/debounce';

import AddressSelect from './AddressSelect';
import contents from '../../utils/contents';
import BaseModal from '../FromDialog/BaseModal';
import * as Api from '../../Api/index';
import AddressInfo from './AddressInfo';
import EditAddressModal from '../FromDialog/EditAddressModal';
import { addressIntl } from '../../Intl/index';
import { AddressFormItemInterface } from '../../types/index';

import { StAddressBox, StTitleLabel, StShipSelectBox, StEditIcon } from './styles';

const { address } = addressIntl;


const AddressFormItem = <T extends Record<string, any>>(
    props: AddressFormItemInterface<T>
) => {
    const {
        id = '',
        type,
        selectStyle,
        onChange,
        label = '',
        size = 'default',
        contactPartnerId: contactPartnerIdProp,
        value: valueProp,
        codeEq,
        version,
        addressInfoStyle = {},
        isInternationalPartner = false,
        language = localStorage.umi_locale,
        isShareLocking = true,
        disable = false,
        disableToEdit = false,
        // addressInfoClass = '',
        showShareButton = true,
        dataLanguageEnvironment = false,
    } = props;
    const [contactPartnerId, setContactPartnerId] = useState(
        contactPartnerIdProp
    );
    const [addressDetail, setAddressDetail] = useState<any>(valueProp || {});
    const [List, setList] = useState([] as Record<string, any>[]);
    const addressType = 'ADDRESS';

    const monitor = useRef(true);

    let addressSelectConfig = contents[addressType];
    addressSelectConfig = {
        ...addressSelectConfig,
        partNerTitle: label ? label : (type ? address[type]?.name : ''),
    };

    // 修改当前提货收货地址
    const handleChange = (id: string, isValueChange: boolean) => {
        if (isValueChange) {
            if (!id && monitor.current) {
                getList(contactPartnerId, '');
                // @ts-ignore
                onChange && onChange(undefined);
                setAddressDetail(undefined);
                return;
            }
            getDetail(id).then((detail) => {
                if (detail && monitor.current) {
                    onChange && onChange({
                        ...detail,
                        contactPartnerId: detail?.contactPartner?.contactPartnerId || contactPartnerId,
                    });

                    // 设置detail，同时加入contactPartnerId
                    setAddressDetail({
                        ...detail,
                        contactPartnerId: detail?.contactPartner?.contactPartnerId || contactPartnerId,
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
        if (!id && monitor.current) {
            setAddressDetail({} as T);
            return undefined;
        }
        const res: any = await Api.getDeliveryAddressInfo({
            id,
            isInternationalPartner,
            dataLanguageEnvironment,
        });
        if (res && res.code === '00000' && res.result && monitor.current) {
            return res.result;
            // setAddressDetail(result);
            // return result;
        }
        return undefined;
    };

    // 获取同发货方或收货方的地址
    const getAddressDetail = async () => {
        const data: any = await Api.getAddressByPartnerAddressDetail({
            id: contactPartnerId,
            dataLanguageEnvironment,
        });
        
        if (data && data.code === '00000' && data.result?.length ) {
            const addressArr = data.result || [];
            let selDefaultAddress = addressArr.find((item: any) => {
                return item.isDefault;
            });
            // 数据格式修改， 将收发货方的地址数据 放到contactPartner里面
            selDefaultAddress = {
                ...selDefaultAddress,
                contactPartnerId: data.result?.contactPartner?.contactPartnerId || contactPartnerId
            };
            onChange && onChange(selDefaultAddress);
            //   接口调用成功就返回到外层
            // onChange && onChange(data.result);
            setAddressDetail(selDefaultAddress);
            //   接口调用成功就返回到外层
            // onChange && onChange(data.result);

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
        // ('getList', contactPartnerId);
        if (contactPartnerId && monitor.current) {
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
                    Array.isArray(res.result.data) &&
                    monitor.current
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
            if (monitor.current) setList([]);
        }
    }, 500, { 'leading': true, 'trailing': false });

    // 点击编辑
    const handleEdit = useCallback((value, cb) => {
        getList(value?.contactPartnerId);
        if (value) {
            handleChange(value[addressSelectConfig.ctCode], true);
        }
    }, []);

    // 当收发货人发生改变时 监听ID和verision 执行的函数改变当前select值
    useEffect(() => {
        if ((disable && contactPartnerIdProp) || (disable && version)) {
            getList(contactPartnerIdProp);
        } else if (contactPartnerIdProp !== contactPartnerId && monitor.current) {
            setAddressDetail(undefined);
            onChange && onChange((undefined as unknown) as T);
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
        const contactPartnerName = addressDetail ? addressDetail[addressSelectConfig.ctDescribe] : '';
        if (addressDetail && contactPartnerName) {
            setList([
                setListItem(addressDetail)
            ]);
        } else {
            getList(
                contactPartnerId
            );
        }

        return () => {
            monitor.current = false;
        };
    }, []);

    // 回填时会执行的函数
    useEffect(() => {
        if(valueProp !== null || !valueProp){
            setAddressDetail(valueProp);
        }
    }, [valueProp]);

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
    
    const getSelectList = useCallback(() => {
        if (!addressDetail || !addressDetail[addressSelectConfig.ctCode]) {
            return List;
        }
        if (
            List.find(
                (item) => item.ctCode === addressDetail[addressSelectConfig.ctCode]
            )
        ) {
            return List.map((item: any) => {
                if (item.ctCode === addressDetail[addressSelectConfig.ctCode]) {
                    return {
                        ...item,
                        ...setListItem(addressDetail)
                    };
                } else {
                    return item;
                }
            });
        } else {
            // 回显添加当前选择的数据
            return [
                ...List,
                setListItem(addressDetail)
            ];
        }
    }, [addressDetail]);

    // const selectList = getSelectList();

    /* ========= render =========== */
    const addModalCmp = (
        <BaseModal
            showShareButton={showShareButton}
            isShareLocking={isShareLocking}
            key={addressSelectConfig.title}
            modalHandleOk={handleAdd}
            language={language}
            addressSelectConfig={addressSelectConfig}
            modalValue={{ contactPartnerId }}
            codeEq={codeEq}
            isInternationalPartner={isInternationalPartner}
        />
    );
    let renderEdit;
    if (addressDetail?.contactPartnerId) {
        renderEdit = (
            <StEditIcon>
                {/* <a className="icon"><EditFilled /></a> */}
                <EditAddressModal
                    disable={disable}
                    disableToEdit={disableToEdit}
                    showShareButton={showShareButton}
                    isInternationalPartner={isInternationalPartner}
                    language={language}
                    addressSelectConfig={addressSelectConfig}
                    title={`${address.edit}${addressSelectConfig.partNerTitle}`}
                    modalValue={addressDetail}
                    handleSubmit={handleEdit}
                    codeEq={codeEq}
                />
            </StEditIcon>
        );
    } else {
        renderEdit = null;
    }

    return (
        <ConfigProvider prefixCls={'jusda-address'}>
            <StAddressBox id={id}>
                <Row gutter={12} align="middle">
                    <Col span={size === 'small' ? 0 : 3}>
                        <StTitleLabel>
                            <div className="icon-img">
                                <img src={addressSelectConfig?.icon[type]?.default} />
                            </div>
                            <div><span className="reque">*</span>{addressSelectConfig.partNerTitle}</div>
                        </StTitleLabel>
                    </Col>
                    <Col span={size === 'small' ? 24 : 5}>
                        <AddressSelect
                            style={{ 'width': '100%', ...selectStyle }}
                            optionsData={List}
                            addressSelectConfig={addressSelectConfig}
                            onChange={handleChange}
                            modal={addModalCmp}
                            value={addressDetail?.contactPartnerAddressId || addressDetail?.contactPartnerId}
                            selectProps={selectProps}
                            disable={disable}
                            language={language}
                            isInternationalPartner={isInternationalPartner}
                        />
                    </Col>
                    <Col span={size === 'small' ? 24 : 16}>
                        <StShipSelectBox>
                            <div className="infoBody" style={{marginTop: size === 'small' ? '10px': 0}}>
                                <AddressInfo
                                    type={type}
                                    addressSelectConfig={addressSelectConfig}
                                    addressInfoClass={size}
                                    title={addressSelectConfig.partNerTitle}
                                    addressCont={addressDetail}
                                    style={{ background: 'unset', ...addressInfoStyle }}
                                    handleAddress={getAddressDetail}
                                />

                                {renderEdit}
                            </div>
                        </StShipSelectBox>
                    </Col>
                </Row>
            </StAddressBox>
        </ConfigProvider>
    );
};

export default AddressFormItem;
