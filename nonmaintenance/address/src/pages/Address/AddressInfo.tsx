import React, { useRef } from 'react';
import styled from 'styled-components';
import { addressIntl } from '../../Intl/index';
import { StAddressInfos } from './styles';

const { address } = addressIntl;

const StInfoItem = styled.span`
  display: inline-block;
  font-size: 12px;
  color: #999;
  margin-right: 10px;
`;

interface AddressInfoProps {
    title: string;
    addressCont?: Record<string, any>;
    style?: React.CSSProperties;
    addressInfoClass?: string;
    addressSelectConfig: any;
}

const AddressInfo = ({
    addressCont,
    title,
    style,
    addressInfoClass,
    addressSelectConfig,
}: AddressInfoProps) => {
    const infoEl: any = useRef(null);
    let InfoBox = null;

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
        <p style={{ margin: 0 }}>
            <StInfoItem>
                {address['Administrative Region']}: {addressCont?.countryName}{' '}
                {addressCont?.provinceName} {addressCont?.cityName}{' '}
                {addressCont?.districtName} {addressCont?.addressDetail}
            </StInfoItem>
        </p>
        <p style={{ margin: 0 }}>
            <StInfoItem>
                {address.Postcode}: {addressCont?.postCode}
            </StInfoItem>
            <StInfoItem>
                {addressSelectConfig?.enumeration === 'ADDADDRESS'
                    ? address['Address Name']
                    : address['Address Abbreviation']}:{' '}
                {addressCont?.addressAbbreviation}
            </StInfoItem>
            <StInfoItem>
                {address['Address Code']}: {addressCont?.addressCode}
            </StInfoItem>
        </p>

        {/* <StInfoItem>
          {address.address}: {addressCont?.addressDetail}
        </StInfoItem> */}
      </>
        );
    }

    return (
        <StAddressInfos className={addressInfoClass} style={style}>
            {addressCont && addressCont.contactPartnerId && (
                <div className="info-container">
                    <div ref={infoEl} className="info-box">
                        {InfoBox}
                    </div>
                </div>
            )}

            {(!addressCont || !addressCont.contactPartnerId) && (
                <div className="nodata-container">
                    {title}
                    {address.information}
                </div>
            )}
        </StAddressInfos>
    );
};

export default AddressInfo;
