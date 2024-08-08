/* eslint-disable @typescript-eslint/no-object-literal-type-assertion */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Button, Input, InputProps, Space, Tag, ConfigProvider, ButtonProps } from 'antd';
import React, { ReactElement, useEffect, useState } from 'react';
import './index.less';
import { RedoOutlined } from '@ant-design/icons';
import { getAntdConfig } from '@jusda-tools/jusda-theme-config';


export enum OperatorType {
    '等于' = 'EQUALS',
    '属于' = 'IS_ONE_OF'
}

export interface SubParamItem {
    conditionName: string | { label: string; value: string };
    conditionValue: string | { label: string; value: any };
    operator: OperatorType | { label: string; value: OperatorType };
}

interface CombinedSearchFormProps {
    singleSearchFilterKey?: string;
    mode?: 'single' | 'multiple';
    value?: SubParamItem[];
    defaultValue?: SubParamItem[];
    onChange?: (nextValue: SubParamItem[]) => void;
    addFilterButtonRender?: (reactNode: any, func: (data: SubParamItem) => void) => void;
    editorFilterButtonRender?: (defaultNode: any, condition: SubParamItem) => ReactElement;
    className?: string;
    style?: React.CSSProperties;
    loading?: boolean;
    searchInputProps?: Omit<InputProps, 'value' | 'onChange' | 'onPressEnter' | 'bordered'>;
    valueRender?: (item: SubParamItem) => string;
    resetButtonProps?: ButtonProps;
    onTagClose?: (item: SubParamItem) => void;
}

const genFiltersMapFromConditions = (newConditions: SubParamItem[] | undefined) => {
    if (!newConditions) return {} as { [key: string]: SubParamItem };
    const newFilterMap = {} as { [key: string]: SubParamItem };
    newConditions.forEach(ele => {
        newFilterMap[typeof ele.conditionName === 'string' ? ele.conditionName : ele.conditionName.value] = ele;
    },);
    return newFilterMap;
};

function CombinedSearchForm(props: CombinedSearchFormProps) {
    const {
        addFilterButtonRender,
        editorFilterButtonRender,
        value,
        defaultValue = [] as SubParamItem[],
        onChange,
        className = '',
        loading = false,
        style,
        mode = 'single',
        searchInputProps = {},
        singleSearchFilterKey = '',
        valueRender,
        resetButtonProps,
        onTagClose,
    } = props;

    const [baseSearchValue, setBaseSearchValue] = useState(defaultValue ? (defaultValue[0]?.conditionValue as any)?.value || defaultValue[0]?.conditionValue : '');
    const [filtersMap, setFiltersMap] = useState<{ [key: string]: SubParamItem }>(genFiltersMapFromConditions(defaultValue || []));

    const { onClick: onResetClick } = resetButtonProps || {};

    const resetAll = (e) => {
        if (!props.hasOwnProperty('value')) {
            setBaseSearchValue('');
            setFiltersMap({});
        }
        onResetClick && onResetClick(e);
        onChange && onChange([]);
    };

    const handleClose = (tag) => {
        onTagClose && onTagClose({ ...filtersMap[tag], conditionName: tag });
        if (props.hasOwnProperty('value')) {
            onChange && onChange(
                Object.values(filtersMap)?.filter(item =>
                    typeof item.conditionName === 'string' ? item.conditionName !== tag : item.conditionName.value !== tag) || []
            );
            return;
        }
        const newFiltersMap = {};
        Object.keys(filtersMap).forEach(key => {
            if (key !== tag) newFiltersMap[key] = filtersMap[key];
        });
        setFiltersMap(newFiltersMap);
        onChange && onChange(Object.values(newFiltersMap));
    };

    const addFilter = (newItem: SubParamItem) => {
        const { conditionName, conditionValue, operator } = newItem; //form.getValues();
        const newFiltersMap = {
            ...filtersMap,
            [typeof conditionName === 'string' ? conditionName : conditionName.value]: {
                conditionName,
                conditionValue,
                operator
            }
        };
        setFiltersMap(newFiltersMap);
        onChange && onChange(Object.values(newFiltersMap));
    };

    useEffect(() => {
        const newFiltersMap = genFiltersMapFromConditions(value || []);
        if (mode === 'single') {
            setBaseSearchValue(value ? value[0]?.conditionValue : '');
            return;
        }
        setFiltersMap(newFiltersMap);
    }, [value]);

    return (
        <ConfigProvider
            prefixCls="juslink"
            theme={{
                token: getAntdConfig('v5'),
            }}
        >
            <div className={`juslink-muti-filters-search-form juslink-muti-filters-wrapper ${className}`} style={style}>
                <div className={'juslink-muti-filters'}>
                    {mode === 'single' ?
                        <Input
                            {...searchInputProps}
                            className={`juslink-muti-filters-search-input ${searchInputProps?.className || ''}`}
                            disabled={loading}
                            value={baseSearchValue}
                            onChange={e => setBaseSearchValue(e.target.value)}
                            onPressEnter={(e) => {
                                onChange && onChange([{ conditionValue: (e.target as any).value, conditionName: singleSearchFilterKey, operator: OperatorType.属于 }]);
                            }}
                        />
                        : <Space wrap className={'juslink-muti-filters-sub-filters'}>
                            {
                                Object.keys(filtersMap).map((key) => {
                                    const item = filtersMap[key];
                                    if (typeof valueRender === 'function') { return valueRender(item); }
                                    const getFilterContent = (): string => {
                                        const { conditionName, conditionValue, operator } = item;
                                        let content = `${typeof conditionName === 'string' ? conditionName : conditionName.label || conditionName.value || '-'} 
              ${typeof operator === 'string' ? operator : operator.label || operator.value || '-'} `;
                                        if (Object.prototype.toString.call(conditionValue) === '[object Object]') {
                                            return content + ((conditionValue as any).label || (conditionValue as any).value);
                                        }
                                        if (Array.isArray(conditionValue)) {
                                            return content + conditionValue.join(',');
                                        }
                                        return content + conditionValue;
                                    };
                                    const itemContent = getFilterContent();
                                    if (typeof editorFilterButtonRender === 'function') {
                                        return editorFilterButtonRender(<Tag closable={!loading} key={key} style={{
                                            maxWidth: 'calc(100% - 8px)',
                                            wordBreak: 'break-all',
                                            whiteSpace: 'normal',
                                        }} onClose={() => handleClose(key)}>{itemContent}</Tag>, item);
                                    }
                                    return <Tag closable={!loading} key={key} style={{
                                        maxWidth: 'calc(100% - 8px)',
                                        wordBreak: 'break-all',
                                        whiteSpace: 'normal',
                                    }} onClose={() => handleClose(key)}>{itemContent}</Tag>;
                                })
                            }
                            {
                                typeof addFilterButtonRender === 'function' ? addFilterButtonRender(<Button disabled={loading} type='text' className={'juslink-muti-filters-add-btn'}>添加搜索条件</Button>, addFilter) : <Button type='text' disabled={loading} className={'juslink-muti-filters-add-btn'}>添加搜索条件</Button>
                            }
                        </Space>}
                    <Button className='juslink-muti-filters-reset-btn' {...resetButtonProps} loading={loading} onClick={(e) => resetAll(e)} type='primary' icon={<RedoOutlined rotate={-90} rev={undefined} />}>重置</Button>
                </div>
            </div>
        </ConfigProvider>
    );
}

export default CombinedSearchForm;
