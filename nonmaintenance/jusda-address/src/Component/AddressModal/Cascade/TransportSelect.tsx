/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import { debounce } from 'throttle-debounce';

import './index.less';
import { getTransportLocationCode } from '../../../Api';

const { Option } = Select;

interface PropsType {
    value?: any;
    onChange?: Function;
    defineTransportLocationRange?: {
        api?: Function;
        params?: { shippingMode: string };
    };
}

const TransportSelect = ({
    value,
    defineTransportLocationRange = {},
    onChange,
}: PropsType) => {
    const [
        regionTransportLocationOption,
        setRegionTransportLocationOption,
    ] = useState([]);
    const [selectVal, setSelectVal] = useState();
    // 获取当前需要调取的接口
    const getTransportOptionApi =
    defineTransportLocationRange?.api || getTransportLocationCode;

    const debounceSearch = debounce(500, async (val: any) => {
        if (!val) {
            return;
        }
        try {
            const getTransportParams = defineTransportLocationRange?.params
                ? {
                    ...defineTransportLocationRange?.params,
                    idOrNameOrLocalLike: val,
                }
                : { idOrNameOrLocalLike: val };

            getTransportOptionApi(getTransportParams).then((res: any) => {
                const optionData = res?.result?.data || res?.data || [];
                setRegionTransportLocationOption(optionData || []);
            });
        } catch (error) {
            console.log('error: ', error);
        }
    });
    // 编辑时
    useEffect(() => {
        setSelectVal(value);
        if (value) {
            debounceSearch(value);
        } else {
            setRegionTransportLocationOption([]);
        }

        return () => {
            setRegionTransportLocationOption([]);
        };
    }, [value]);
    const handleChange = (id: any) => {
        onChange?.(id);
    };
    const titleFormat = (data: any) => {
        return `(${data?.id}) ${data?.name && `${data?.name},`} ${
            data?.subdivision && `${data?.subdivision?.name},`
        } ${data?.country && `${data?.country?.name},`}`;
    };

    return (
        <Select
            allowClear
            showSearch
            onSearch={debounceSearch}
            dropdownMatchSelectWidth={500}
            optionLabelProp="value"
            value={selectVal}
            optionFilterProp="children"
            onChange={handleChange}
            placement="bottomRight"
            getPopupContainer={triggerNode => triggerNode.parentNode}
        >
            {regionTransportLocationOption?.map((item: any) => (
                <Option
                    value={item?.id}
                    key={item?.id}
                    label={item?.name}
                    title={titleFormat(item)}
                >
          ({item?.id}){item?.name && `${item?.name},`}
                    {item?.subdivision?.name && `${item?.subdivision?.name},`}
                    {item?.country?.name && `${item?.country?.name}`}
                </Option>
            ))}
        </Select>
    );
};

export default TransportSelect;
