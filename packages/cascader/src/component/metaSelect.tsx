import React, { useEffect, useState, useLayoutEffect } from 'react';
import { isEqual } from '../utils';
// @ts-ignore
import { currentLanguage } from '@jusda-tools/language-control-panel';
import { Select } from 'antd';

const { Option } = Select;
const currentLocale = currentLanguage();

function MetaSelect(props: any) {
    const [value, setValue] = useState(props.value);
    const [selectOptionData, setSelectOptionData] = useState([]);

    // useEffect(() => {
    //     // // 两值相等则说明依赖项没有发生变化，不进行清空本select的值和optionList等操作
    //     // if (props?.dependencyCode && !isEqual(value[`${props?.dependencyCode}`], props.value?.[`${props?.dependencyCode}`])) {
    //     //     props?.changeValue(props?.code, { value: '', label:''});
    //     //     getOptionDataFn();
    //     // }
    //     setValue(props.value);
    // }, [props.value])

    useEffect(() => {
        if (props?.dependencyCode && props.isOperation) {
            props?.changeValue(props?.code, { value: '', label:''});
        }
        getOptionDataFn();
        setValue(props.value);
    }, [props.dependencyValue]);

    const onSelectChange = (code: string, e) => {
        props?.changeValue(code, { value: e.value, label: e.label});
    }

    const getOptionDataFn = async () => {
        if (props?.optionDataFn && typeof props?.optionDataFn === 'function') {
            const result = await props?.optionDataFn(props.code, props?.dependencyValue?.value);
            setSelectOptionData(result);
        } else {
            setSelectOptionData([]);
        }
    }

    // selec-option 展示
    const getOptionJsx = (data: [any]) => {
        return (data || []).map(
            (item: {
                code: string | number;
                name: string;
            }) => {
                return (
                    <Option
                        value={item?.code}
                        key={item.code}
                    >
                        {/* eslint-disable-next-line no-nested-ternary */}
                        {item.name}
                    </Option>
                );
            },
        );
    };

    return (
        // @ts-ignore
            <Select
                key={props?.code}
                style={props?.ui?.style}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                    // @ts-ignore
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                placeholder={
                    props?.ui?.placeholder
                }
                onSelect={e => {
                    onSelectChange(props?.code, e);
                }}
                labelInValue
                {...(props?.value?.value  ? {value: {value: props?.value?.value}} : null)}
                suffixIcon={props?.ui?.suffixIcon}
                disabled={props?.disabled}
            >
                {getOptionJsx(props?.optionData || selectOptionData)}
            </Select>
    );
}

export default MetaSelect;
