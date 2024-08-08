

import debounce from 'lodash/debounce';
import { BasicType } from './type';
import React, { useEffect, useState } from 'react';
import useGetBasicOptions from './useGetBasicOptions';
import { getAntdConfig } from "@jusda-tools/jusda-theme-config";
import { ConfigProvider, Select, } from 'antd';
import { SelectProps } from 'antd/lib/select';


interface EnhancedProFormSelectProps extends SelectProps<any> {
    type: BasicType;
}
const BasicTemplateSelect = (props: EnhancedProFormSelectProps) => {
    const { type, value } = props
    const [keyword, setKeyword] = useState('')
    const [page, setPage] = useState(0)
    const { options, loading, totalPage } = useGetBasicOptions({
        type,
        keyword,
        page
    })

    const onPopupScroll = () => {
        if (page < totalPage) {
            setPage(page + 1)
        }
    }

    useEffect(() => {
        if (value) {
            setKeyword(value)
        }
    }, [value])

    return (
        //@ts-ignore
        <ConfigProvider prefixCls={'juslink'} theme={{
            token: getAntdConfig('v5'),
        }} >
            <Select
                value={value}
                allowClear
                showSearch
                loading={loading}
                optionFilterProp='label'
                onPopupScroll={onPopupScroll}
                onSearch={debounce((newValue: string) => {
                    setKeyword(newValue)
                }, 500)}
                options={options}
                {...props}
            />
        </ConfigProvider>

    )
}
export default BasicTemplateSelect