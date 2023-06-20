import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import * as Api from '../../Api/index';
const { Option } = Select;

interface SearchSelectProps {
    url: string;
    parentCode: string;
    value?: string;
    onChange?: (e: string, v: string) => void;
    language: string;
    disabled?: boolean;
}

const SearchSelect = ({
    url,
    parentCode = '',
    value = '',
    language = localStorage.umi_locale,
    onChange = () => {},
    disabled=false
}: SearchSelectProps) => {
    const [options, setOptions] = useState([]);
    const [selectedValue, setSelectedValue] = useState(value);
    const [selectedParentCode, setSelectedParentCode] = useState(parentCode);

    useEffect(() => {
        if (!(!selectedParentCode && !selectedValue && value && parentCode)) {
            if (parentCode !== selectedParentCode) {
                // 清空值
                onChange('', '');
                // 清空下拉
                setOptions([]);
            }
        }
    }, [value, parentCode]);

    useEffect(() => {
        setSelectedParentCode(parentCode);
        // 请求对应的下拉数据
        if (parentCode) {
            Api.getArea(parentCode, url).then(({ result }: any) => {
                setOptions(result);
            });
        }
    }, [parentCode]);

    useEffect(() => {
        setSelectedValue(value);
    }, [value]);

    const getOptions = () => {
        if (options && options.length) {
            if (language === 'en-US') {
                return options.map(({ code, name }: any) => (
                    <Option key={code} value={name}>
                        {name}
                    </Option>
                ));
            } else {
                return options.map(({ code, name, nameLocal }: any) => (
                    <Option key={code} value={nameLocal || name}>
                        {nameLocal || name}
                    </Option>
                ));
            }
        }
        return null;
    };

    const handleChange = (e: string, option: any) => {
        onChange(option.key, option.value);
    };

    // 获取name值.
    const getValue = () => {
        if (!(options && options.length)) return null;
        const seletedOptions = options.filter(
            ({ code, name }) => selectedValue === code
        );
        if (seletedOptions && seletedOptions.length) {
            if (language === 'en-US') {
                // @ts-ignore
                return seletedOptions[0].name;
                // @ts-ignore
            } else return seletedOptions[0].nameLocal || seletedOptions[0].name;
        }
    };

    return (
        <Select
            disabled={disabled}
            showSearch={true}
            value={getValue()}
            onChange={handleChange}
            dropdownMatchSelectWidth={false}
        >
            {getOptions()}
        </Select>
    );
};

export default SearchSelect;
