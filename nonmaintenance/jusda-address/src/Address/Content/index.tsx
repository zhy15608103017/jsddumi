/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { useAddressIntl } from '../../useIntl';
import { EditIcon } from '../../assets/SvgIcon';
import './index.less';

const EmptyContent = ({
    value,
    basicModalRef,
    setBasicModal,
    openEditModal = () => {},
    readOnlyProperty = false,
}: {
    value: any;
    basicModalRef: any;
    setBasicModal: (visible: boolean) => void;
    readOnlyProperty: boolean;
    openEditModal: Function;
}) => {
    const { formatMessage } = useAddressIntl();
    const {
        address = {},
        companyName,
        contactsName,
        mobile,
        mobileArea,
        telephone,
        telephoneArea,
        email,
    } = value || {};

    const {
        addressDetail,
        countryName,
        provinceName,
        cityName,
        districtName,
        houseNumber,
        postCode,
    } = address || {};

    const telephoneName = telephone
        ? `${formatMessage({ id: 'Tel' })}: ${
            telephoneArea ? telephoneArea + '-' : ''
        }${telephone}`
        : '';
    const mobileName = mobile
        ? `${formatMessage({ id: 'Mobile phone' })}: ${
            mobileArea ? mobileArea + '-' : ''
        }${mobile}`
        : '';

    const country = countryName
        ? `${formatMessage({ id: 'country' })}: ${countryName}`
        : '';
    // 暂时先改了布局
    return (
        <div className={'address-detail-container'}>
            <div className="address-detail-content-container">
            <div className={'address-detail-title address-detail-content'} style={{wordBreak:'break-all',whiteSpace:"pre-wrap"}}>{companyName}</div>
                <div className={'address-detail-content'}>
                    {contactsName} {telephoneName} {mobileName} {email} {postCode}
                </div>
                <div className={'address-detail-content'}>
                    {country} {provinceName} {cityName} {districtName} {addressDetail}{' '}
                    {houseNumber}
                </div>
            </div>
            <div className="address-detail-edit">
                {!readOnlyProperty && (
                    <div
                        className="address-detail-edit-container"
                        onClick={() => {
                            openEditModal();
                        }}
                    >
                        <EditIcon />
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmptyContent;
