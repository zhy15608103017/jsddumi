import React, { useState, useEffect } from 'react';
import { Select, Input } from 'antd';
import { addressIntl } from '../../Intl';
import { SwitchIcon, SearchIcon } from '../../assets/SvgIcon/Svg';
import debounce from 'lodash/debounce';
import { addressQueryInfo, getAdministrativeRegion } from '../../Api/index';
import { NewButton, Label } from '../CustomElement';

const { Option } = Select;

const { address } = addressIntl;

const SearchAddress = ({
    form,
    Form,
    isCargoInfo = false,
    handleSwitchManualInput = () => {},
    changeInput = () => {},
    setCodeOption = () => {},
    FormDetail = {},
    setIsShowErrorTip = () => {},
}: any) => {
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
        const locationArr = item?.location?.split(',') || [];
        const location = {
            latitude: locationArr[1],
            longitude: locationArr[0],
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
            if (isCargoInfo) {
                // 此方法下个版本做优化更改
                changeInput('test', 'test', [
                    { name: 'location', value: location },
                    { name: 'addressDetail', value: `${adName}${itemAddress}${name}` },
                    {
                        name: 'cascaderCode',
                        value: ['CN', subdivision?.code, city?.code, locationData?.code],
                    },
                ]);
                setCodeOption([
                    'CN',
                    subdivision?.code,
                    city?.code,
                    locationData?.code,
                ]);
            } else {
                form.setFieldsValue({
                    location,
                    addressDetail: `${adName}${itemAddress}${name}`,
                    cascaderCode: [
                        'CN',
                        subdivision?.code,
                        city?.code,
                        locationData?.code,
                    ],
                });
            } // 当返回的结果为空时展示错误提示
            setIsShowErrorTip(!res?.result?.data?.length);
        });
    };

    return (
        <div style={{ paddingBottom: 16 }}>
            <div
                style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                }}
            >
                <Label>{address['Address query']}</Label>
                <NewButton
                    onClick={() => {
                        handleSwitchManualInput(true);
                    }}
                >
                    <span
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <SwitchIcon />
                    </span>
                    {address['Switch to manual input mode']}
                </NewButton>
            </div>
            <div>
                <Select
                    onSearch={handleAddressQuery}
                    showSearch
                    onChange={handleSelectAddressInfo}
                    getPopupContainer={(none) => none}
                    filterOption={false}
                    style={{ width: '100%' }}
                >
                    {addressQueryOption.map((item: any) => {
                        return (
                            <Option value={item?.id} key={JSON.stringify(item || {})}>
                                <div style={{ position: 'relative', paddingLeft: 36 }}>
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
                                    <div style={{ position: 'absolute', top: '8%', left: 0 }}>
                                        <SearchIcon />
                                    </div>
                                </div>
                            </Option>
                        );
                    })}
                </Select>
                <Form.Item noStyle name="location">
                    <Input style={{ display: 'none' }} />
                </Form.Item>
            </div>
        </div>
    );
};

export default SearchAddress;
