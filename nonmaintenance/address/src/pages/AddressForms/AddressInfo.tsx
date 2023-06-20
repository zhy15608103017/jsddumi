import React, { useEffect, useState, useRef } from 'react';
import { Popover, Button } from 'antd';
import styled from 'styled-components';
import { addressIntl } from '../../Intl/index';
import { StAddressInfos } from './styles';
import { SyncOutlined } from '@ant-design/icons';
const { address } = addressIntl;

const StInfoItem = styled.span`
  font-size: 12px;
  color: #999;
  margin-right: 10px;
`;

interface addressInfo {
    type: string;
    title: string;
    addressSelectConfig: any;
    addressCont?: Record<string, any>;
    style?: React.CSSProperties;
    icon?: any;
    addressInfoClass?: string;
    handleAddress: () => void;
}

const AddressInfo = ({
    type,
    addressCont,
    style,
    addressInfoClass,
    handleAddress,
    addressSelectConfig,
}: addressInfo) => {
    const infoEl: any = useRef(null);

    const [Loading, setLoading] = useState(false);
    // const [ShowPop, setShopPop] = useState(false);
    let InfoBox = null;

    const handleClick = () => {
        if (Loading) return;
        setLoading(true);
        handleAddress();
    };

    const noDataFn = (text: string) => {
        return (
            <div className="info-btn">
                <Button
                    style={{ marginLeft: '8px' }}
                    size="small"
                    onClick={handleClick}
                >
                    {text}
                </Button>
            </div>
        );
    };
    // console.log('address[type]', address)
    let noDataDom = address[type]?.info1 || '';
    // if(type === 'SHIPPER') {
    //   noDataDom = `请选择起运地址信息或“`;
    // }else{
    //   noDataDom = `请选择起运地址信息或“`;
    // }

    useEffect(() => {
        if (addressCont?.contactPartnerId) {
            setLoading(false);
        }
    // 判断 infoEl 存在的时候计算一个高度，超过高度表示有溢出，就使用Popover 这里有bug 溢出对于有<span>等标签的内容不起作用
    // if(typeof infoEl?.current === 'object') {
    //   const clientHeight: any = infoEl?.current?.clientHeight || 0
    //   setShopPop((clientHeight && clientHeight > 50))
    // }else{
    //   setShopPop(false)
    // }
    }, [infoEl, addressCont]);

    if (addressCont && addressCont.contactPartnerId) {
        InfoBox = (
      <>
        <StInfoItem>
            {address.Contact}: {addressCont?.contactName}
        </StInfoItem>
        <StInfoItem>
            {address.Tel}: {addressCont?.telephoneArea}-
            {addressCont?.telephoneNumber}
        </StInfoItem>
        <StInfoItem>
            {address['Mobile phone']}: {addressCont?.mobileArea}-
            {addressCont?.mobileNumber}
        </StInfoItem>
        <StInfoItem>
            {address.email}: {addressCont?.email}
        </StInfoItem>
        <br />
        <StInfoItem>
            {address['Administrative Region']}: {addressCont?.countryName}{' '}
            {addressCont?.provinceName} {addressCont?.cityName}{' '}
            {addressCont?.districtName} {addressCont?.addressDetail}
        </StInfoItem>
        <br />
        <StInfoItem>
            {address.Postcode}: {addressCont?.postCode}
        </StInfoItem>
        <StInfoItem>
            {addressSelectConfig?.enumeration === 'ADDADDRESS'
                ? address['Address Name']
                : address['Address Abbreviation']}
          : {addressCont?.addressAbbreviation}
        </StInfoItem>
        <StInfoItem>
            {address['Address Code']}: {addressCont?.addressCode}
        </StInfoItem>
      </>
        );
    }
    return (
        <StAddressInfos className={addressInfoClass} style={style}>
            {addressCont && addressCont.contactPartnerId && (
                <div ref={infoEl} className="info-container">
                    {InfoBox}
                </div>
            )}
            {(!addressCont || !addressCont.contactPartnerId) &&
        (Loading ? (
            <div className="nodata-container">
                <SyncOutlined spin />
            </div>
        ) : (
            <div className="nodata-container">
                <span className="noDataText">{noDataDom}</span>
                {noDataFn(address[type]?.info2 || '')}
            </div>
        ))}
        </StAddressInfos>
    );
};

export default AddressInfo;
