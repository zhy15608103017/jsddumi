/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Select, Input } from 'antd';
// import { addressIntl } from "../../Intl";
import { GPS_Icon } from '../../../assets/SvgIcon';
import debounce from 'lodash/debounce';
import {
    addressQueryInfo,
    getAdministrativeRegion,
    getTransportLocationCode,
} from '../../../Api';
import SwitchButton from '../../SwitchButton';
import { useAddressIntl } from '../../../useIntl';
import './index.less';

const { Option } = Select;

// const { address } = addressIntl;

const SearchAddress = ({
    form,
    Form,
    isCargoInfo = false,
    handleSwitchManualInput = () => {},
    changeInput = () => {},
    setCodeOption = () => {},
    FormDetail = {},
    setIsShowErrorTip = () => {},
    isManualInput = false,
}: any) => {
    const { formatMessage } = useAddressIntl();
    const [addressQueryOption, setAddressQueryOption] = useState([]);
    const handleAddressQuery = debounce((value: string) => {
        if (value) {
            addressQueryInfo({ keywords: value, offset: 10 })
                .then((response: any) => response.json())
                .then((res: any) => {
                    const pois = res?.pois || [];
                    setAddressQueryOption(pois);
                });
        }
    }, 700);

    const handleSelectAddressInfo = (value: any, params: any) => {
        const { key } = params;
        const item = JSON.parse(key || {});
        console.log(
            '%c 🍬 item: ',
            'font-size:20px;background-color: #3F7CFF;color:#fff;',
            item,
            key,
        );

        const locationArr = item?.location?.split(',') || [];
        const location = {
            latitude: locationArr?.[1],
            longitude: locationArr?.[0],
        };
        const adName = item?.adname ? item?.adname : '';
        const itemAddress = item?.address ? item.address : '';
        const adcode = item?.adcode ? item.adcode : '';
        const name = item?.name ? item.name : '';

        getAdministrativeRegion({
            externalCodeEq: adcode,
        }).then(async (res: any) => {
            const locationData = res?.result?.data?.[0] || {};
            const { city = {}, subdivision = {} } = locationData;
            getTransportLocationCode({ cityCodeEq: city?.code }).then(
                (result: any) => {
                    const transportLocationCode = result?.result?.data?.[0]?.id || null;
                    form.setFieldsValue({
                        location,
                        addressDetail: `${adName}${itemAddress}${name}`,
                        cascadeCode: [
                            'CN',
                            subdivision?.code,
                            city?.code,
                            locationData?.code,
                        ],
                        cascadeName: ['中国', item?.pname, item?.cityname, adName],
                        transportLocationCode,
                    });
                    setIsShowErrorTip(!res?.result?.data?.length);
                },
            );
        });
    };

    return (
        <div style={{ paddingBottom: 16, position: 'relative' }}>
            <div className={'search-address-label-container'}>
                {/* {address["Address query"]} */}
                {formatMessage({ id: 'Address query' })}
            </div>
            {/* 非手动模式.进行展示切换 */}
            {!isManualInput && (
                <span style={{ position: 'absolute', top: '-6px', right: 0 }}>
                    <SwitchButton
                        label={formatMessage({
                            id: 'Switch to manual input mode',
                        })}
                        handleClick={() => handleSwitchManualInput(true)}
                    />
                </span>
            )}

            <div>
                <Select
                    placeholder={formatMessage({
                        id: 'Please enter address keyword query',
                    })}
                    allowClear
                    onSearch={handleAddressQuery}
                    showSearch
                    onChange={handleSelectAddressInfo}
                    getPopupContainer={(none) => none}
                    filterOption={false}
                    style={{ width: '100%' }}
                >
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    {addressQueryOption.map((item: any) => {
                        return (
                            <Option value={item?.id} key={JSON.stringify(item || {})}>
                                <div
                                    style={{
                                        position: 'relative',
                                        paddingLeft: 36,
                                    }}
                                >
                                    <div>{item?.name}</div>
                                    <div
                                        style={{
                                            fontSize: 12,
                                            color: 'rgb(153, 153, 153)',
                                        }}
                                    >
                                        {item?.cityname}
                                        {item?.adname}
                                    </div>
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: '8%',
                                            left: 0,
                                        }}
                                    >
                                        <GPS_Icon />
                                    </div>
                                </div>
                            </Option>
                        );
                    })}
                </Select>
                <Form.Item hidden={true} noStyle name="location">
                    <Input />
                </Form.Item>
            </div>
        </div>
    );
};

export default SearchAddress;
