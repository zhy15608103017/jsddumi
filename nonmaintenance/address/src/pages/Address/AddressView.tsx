import React, { useEffect, useState, useMemo } from 'react';
import { Col, ConfigProvider, Row } from 'antd';
import { AddressViewInterface } from '../../types/index';
import contents from '../../utils/contents';
import AddressInfo from './AddressInfo';
// import './index.less';


import { StSelectBox, StTitleLabel, StShipViewBox } from './styles';


// todo 1: 传入的detail 和 type 用于显示相关地址信息

const AddressView = (props: AddressViewInterface) => {
    const {
        type,
        addressInfoClass = '',
        addressDetail: addressDetailProp,
    } = props;

    const [addressDetail, setAddressDetail] = useState(
        addressDetailProp || undefined
    );
    // 获取当前角色的配置信息
    const addressSelectConfig = contents[type];

    // 当addressDetail更新的时候，比如回显等
    useEffect(() => {
        if (addressDetailProp !== addressDetail) {
            // @ts-ignore
            setAddressDetail(addressDetailProp);
        }
    }, [addressDetailProp]);


    return useMemo(() => (
        <ConfigProvider prefixCls={'jusda-address'}>
            <StSelectBox>
                <Row gutter={12}>
                    <Col span={4}>
                        <StTitleLabel>
                            <div className="icon">
                                <div>{addressSelectConfig.label}</div>
                                <div className="icon-img">
                                    <img src={addressSelectConfig?.icon?.default} />
                                </div>
                            </div>
                        </StTitleLabel>
                    </Col>
                    <Col span={20}>
                        {addressDetail?.contactPartnerName ? (
                            <StShipViewBox >
                                <div className="title">
                                    {addressDetail.contactPartnerName}
                                </div>
                                <div className="infoBody">
                                    <AddressInfo
                                        addressSelectConfig={addressSelectConfig}
                                        addressInfoClass={addressInfoClass}
                                        title={addressSelectConfig.partNerTitle}
                                        addressCont={addressDetail}
                                    />
                                </div>
                            </StShipViewBox>
                        ) : null}
                    </Col>
                </Row>
            </StSelectBox>
        </ConfigProvider>
    ), [addressDetail]);
};

export default AddressView;
