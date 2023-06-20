import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ConfigProvider, Row, Col } from 'antd';
import debounce from 'lodash/debounce';

import AddressSelect from './AddressSelect';
import contents from '../../utils/contents';
import BaseModal from '../FromDialog/BaseModal';
import { getPartnerAddressDetail, getShipList } from '../../Api/index';
import AddressInfo from './AddressInfo';
import EditAddressModal from '../FromDialog/EditAddressModal';
import { addressIntl } from '../../Intl/index';
import { AddressInterface } from '../../types/index';

import {
    StAddressBox,
    StTitleLabel,
    StShipSelectBox,
    StEditIcon,
} from './styles';

const { address } = addressIntl;

const Address = (props: AddressInterface) => {
    const {
        id = '',
        type,
        selectStyle,
        onChange,
        handleChangeDetail,
        value: valueProp,
        codeEq,
        action,
        isInternationalPartner = false,
        language = localStorage.umi_locale,
        isShareLocking = false,
        disable = false,
        disableToEdit = false,
        headerStyle = {},
        addressInfoClass = '',
        showShareButton = true,
        defaultShare = false,
        dataLanguageEnvironment = false,
    } = props;
    const [addressDetail, setAddressDetail] = useState<any>({});
    const [IsFirst, setIsFirst] = useState<boolean>(true);
    const [List, setList] = useState([] as Record<string, any>[]);
    // 获取当前角色的配置信息
    const addressSelectConfig = contents[type];

    const monitor = useRef(true);

    // 修改当前提货收货地址
    const handleChange = (id: string, isValueChange: boolean) => {
        if (isValueChange) {
            if (!id && monitor.current) {
                // @ts-ignore
                setAddressDetail(undefined);
                onChange && onChange(undefined);
                handleChangeDetail && handleChangeDetail(undefined);
                return;
            }
            getDetail(id).then((detail) => {
                if (detail && monitor.current) {
                    setAddressDetail(detail);
                    onChange && onChange(detail);
                    handleChangeDetail && handleChangeDetail(detail);
                }
            });
        }
    };

    // 新增角色信息
    const handleAdd = (params: any) => {
    // 新增之后需要重新获取一下当前角色列表
        if (params?.contactPartnerId) {
            handleChange(params[addressSelectConfig.ctCode], true);
            setTimeout(
                () =>
                    getList(
                        params?.detail?.contactPartnerName,
                        params?.detail?.isInternationalPartner
                    ),
                500
            );
        }
    };

    //获取当前下拉详情数据
    const getDetail = async (id: string) => {
        if (!id && monitor.current) {
            setAddressDetail(undefined);
            return undefined;
        }
        const res: any = await getPartnerAddressDetail({
            id,
            dataLanguageEnvironment,
        });
        if (res && res.code === '00000' && res.result && monitor.current) {
            return res.result;
        }
        return undefined;
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

    // 获取收发货方列表
    const getList = async (nameLike?: string, isIntern?: boolean) => {
        const data: any = await getShipList(
            addressSelectConfig.enumeration,
            codeEq,
            nameLike,
            isIntern || isInternationalPartner,
        );
        if (
            data &&
      data.code === '00000' &&
      data.result &&
      Array.isArray(data.result.data)
        ) {
            const datas = data.result.data;
            setList(datas.map((item: Record<string, any>) => setListItem(item)));
            // 第一次进入 如果收发货方有一条数据， 就默认选中
            if (IsFirst && datas?.length === 1 && !valueProp?.contactPartnerId) {
                setIsFirst(false);
                handleChange(datas[0].contactPartnerId, true);
            }
        } else {
            IsFirst && setIsFirst(false);
        }
    };

    // 点击编辑
    const handleEdit = useCallback((value, cb) => {
        getList(value?.contactPartnerName);
        if (value) {
            handleChange(value[addressSelectConfig.ctCode], true);
        }
    }, []);

    // 当收发货人发生改变时 监听ID和verision 执行的函数改变当前select值
    // useEffect(() => {
    //     if ((disable && contactPartnerIdProp) || (disable && version)) {
    //         getList(contactPartnerIdProp);
    //     } else if (contactPartnerIdProp !== contactPartnerId && monitor.current) {
    //         setAddressDetail(undefined);
    //         onChange && onChange((undefined as unknown) as T);
    //         setContactPartnerId(contactPartnerIdProp);
    //         getList(contactPartnerIdProp, '');
    //     }
    // }, [contactPartnerIdProp, version]);

    useEffect(() => {
    // 组件初次加载 如果detail 有contactPartnerName 的话 就表示是回显，这个时候列表只有当前角色一条信息
        return () => {
            monitor.current = false;
        };
    }, []);

    // 回填时会执行的函数
    useEffect(() => {
        if (valueProp?.contactPartnerId) {
            // valueProp 有值， 但addressDetail 没有值，表示是回显，这个时候列表只有当前角色一条信息
            if (
                !addressDetail?.contactPartnerId ||
        addressDetail === undefined ||
        valueProp !== addressDetail
            ) {
                if (valueProp?.[addressSelectConfig.ctDescribe]) {
                    getList(
                        valueProp?.[addressSelectConfig.ctDescribe],
                        valueProp.isInternationalPartner || isInternationalPartner
                    );
                } else {
                    getList('');
                }
            }
        } else {
            // valueProp 没有值的时候， 包含select清除以及初次进入组件
            getList('');
        }
        setAddressDetail(valueProp || {});
    }, [valueProp]);

    // 用户输入搜索时执行
    const onSearch = debounce((value: string) => {
        if (value) {
            getList(value);
        } else if (addressDetail?.contactPartnerId) {
            setList([setListItem(addressDetail)]);
        } else {
            getList('');
        }
    }, 800);

    const selectProps = {
        onSearch,
        filterOption: false,
    };

    // const selectList = getSelectList();
    // 收发货人组件渲染

    /* ========= render =========== */
    const addModalCmp = (
        <BaseModal
            isShareLocking={isShareLocking}
            isInternationalPartner={isInternationalPartner}
            key={addressSelectConfig.title}
            modalHandleOk={handleAdd}
            addressSelectConfig={addressSelectConfig}
            showShareButton={showShareButton}
            defaultShare={defaultShare}
            codeEq={codeEq}
            language={language}
        />
    );
    let renderFormItem;
    const FormField = (
        <AddressSelect
            style={{ width: '100%', ...selectStyle }}
            optionsData={List}
            addressSelectConfig={addressSelectConfig}
            onChange={handleChange}
            value={addressDetail?.contactPartnerId}
            modal={addModalCmp}
            selectProps={selectProps}
            disable={disable}
        />
    );
    if (action) {
        renderFormItem = (
            <div style={headerStyle}>
                <Row gutter={12}>
                    <Col span={14}>{FormField}</Col>
                    <Col span={10}>{action}</Col>
                </Row>
            </div>
        );
    } else {
        renderFormItem = <div style={headerStyle}>{FormField}</div>;
    }
    let renderEdit;
    if (addressDetail?.contactPartnerId) {
        renderEdit = (
            <StEditIcon>
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
                    <Col span={4}>
                        <StTitleLabel>
                            <div className="icon-img">
                                <img src={addressSelectConfig?.icon?.default} />
                            </div>
                            <div>
                                {type === 'CONSIGNEE' || type === 'SHIPPER' ? (
                                    <span style={{color:'#ff4d4f'}} className="requeue">*</span>
                                ) : null}
                                {addressSelectConfig.partNerTitle}
                            </div>
                        </StTitleLabel>
                    </Col>
                    <Col span={20}>
                        {renderFormItem}
                        <StShipSelectBox>
                            <div className="infoBody">
                                <AddressInfo
                                    addressSelectConfig={addressSelectConfig}
                                    addressInfoClass={addressInfoClass}
                                    title={addressSelectConfig.partNerTitle}
                                    addressCont={addressDetail}
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

export default Address;
