//@ts-nocheck

import { Checkbox, DatePicker, Input, Popover, Select, Space, theme, Tag } from "antd";
import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { SearchTermOption, TermType, classNamePrefix } from "../../constant";
import { CaretDownOutlined, CloseCircleFilled } from '@ant-design/icons';
import { datetimeInputStyle, dropdownStyle, formItemStyle, noPaddingPopoverStyle, plainTextStyle, selectStyle, termPopoverStyle } from './styles';
import dayjs, { ManipulateType } from "dayjs";
import { LanguageType } from '../../constant';
import { useLocaleContent } from '../../hooks';

const { useToken } = theme;

const { RangePicker } = DatePicker;

type BaseTermItemType = {
    value?: any,
    onChange?: (value: any) => void,
    onCancel?: () => void,
    locale?: LanguageType,
}

const PlainTerm: React.FC<any> = (props) => {
    const { value, type, icon, locale } = props;
    const localeData = useLocaleContent(locale);

    const content = useMemo(() => {
        if (!value) return localeData.all;
        switch (type) {
            case TermType.SELECT:
                return value.label || value.value;
            case TermType.MULTI_SELECT:
                return Array.isArray(value) ? value.map(ele => ele.label).join(',') : 'N/A';
            case TermType.DATETIME:
                const [start, end] = value || [];
                return `${start ? start.format('YYYY-MM-DD') : 'N/A'} - ${end ? end.format('YYYY-MM-DD') : 'N/A'}`;
            default:
                return value
        }
    }, [value, type])

    return <Space>
        <span className={plainTextStyle(!value)}>{content}</span>
        {icon}
    </Space>
}

const InputTerm: React.FC<BaseTermItemType> = forwardRef((props, ref) => {
    const { value, onChange, onCancel, locale, ...rest } = props;
    const [selfValue, setSelfValue] = useState(value);
    const localeData = useLocaleContent(locale);
    const inputRef = useRef(null);

    useImperativeHandle(ref, () => {
        return {
            getValue: () => selfValue,
            focus: () => inputRef.current?.focus(),
        }
    })

    useEffect(() => {
        setSelfValue(value)
    }, [value])
    return <>
        <Input
            {...rest}
            ref={inputRef}
            value={selfValue}
            allowClear
            onPressEnter={(e) => {
                onChange && onChange((e.target as any).value);
                rest.onPressEnter && rest.onPressEnter(e)
                if (!rest.disableAutoSearch) {
                    rest.onPressSearch && rest.onPressSearch(e);
                }
            }}
            onChange={(e) => setSelfValue(e.target.value)}
        />
        {/* <div className="btn-box">
            <Space>
                <Button type="primary" size="small" onClick={() => { onChange && onChange(selfValue) }}>{localeData.confirm}</Button>
                <Button type="text" size="small" onClick={() => { onCancel && onCancel() }}>{localeData.close}</Button>
            </Space>
        </div> */}
    </>
})


const DatetimeTerm: React.FC<BaseTermItemType & { showShortCut: boolean }> = (props) => {
    const { value, onChange, onCancel, showShortCut = true, locale, ...rest } = props;
    const [selfValue, setSelfValue] = useState(value || []);
    const { token } = useToken();
    const localeData = useLocaleContent(locale);

    const ref = useRef(null);

    const [start, end] = selfValue || []
    const shortCurArr = [{ label: localeData.oneWeek, value: '1-week' }, { label: localeData.oneMonth, value: '1-month' }, { label: localeData.threeMonth, value: '3-month' }]

    useEffect(() => {
        setSelfValue(value)
    }, [value])
    return <div ref={ref} className={datetimeInputStyle(token)}>
        <div>
            <RangePicker
                {...rest}
                onChange={(selfValue) => onChange && onChange(selfValue)}
                value={selfValue}
                getPopupContainer={() => ref?.current || document.body}
            />
        </div>
        {showShortCut && <Space>
            {shortCurArr.map(ele => <div
                className="shortcut"
                onClick={() => {
                    const end = dayjs();
                    const [number, unit] = ele.value.split('-');
                    const start = end.subtract(Number(number), unit as ManipulateType)
                    setSelfValue([start, end])
                    onChange && onChange([start, end])
                }}>{ele.label}</div>)}
        </Space>}
        {/* <div className="btn-box">
            <Space>
                <Button size="small" type="primary" onClick={() => { onChange && onChange(selfValue) }}>{localeData.confirm}</Button>
                <Button size="small" type="text" onClick={() => { onCancel && onCancel() }}>{localeData.close}</Button>
            </Space>
        </div> */}
    </div>
}

type TermItemProps = {
    config: SearchTermOption & {onPressSearch?: (value: string) => void},
    value?: any,
    onChange?: (data: any) => void,
    locale?: LanguageType,

}

const TermItem: React.FC<TermItemProps> = (props) => {
    const { config, value, onChange, locale } = props;
    const [open, setOpen] = useState(false);
    const domRef = useRef(null);
    const interfaceDomDef = useRef(null);
    const itemRef = useRef(null);
    const { token } = useToken();

    const rendeContent = (config: SearchTermOption) => {
        const { widget, label, sticky, searchPlaceholder, ...rest } = config as any;
        const localeData = useLocaleContent(locale);
        switch (config.widget) {
            case TermType.SELECT:
                return <div ref={interfaceDomDef}>
                    <Select
                        {...rest}
                        value={value}
                        labelInValue={true}
                        open={true}
                        className={`${selectStyle()} ${config.className || ''}`}
                        popupClassName={`${dropdownStyle(token)} ${config.popupClassName || ''}`}
                        onChange={(v) => { onChange && onChange(v); setOpen(false); }}
                        getPopupContainer={() => {
                            return interfaceDomDef?.current || document.body
                        }}
                        dropdownRender={(defaultNode) => {
                            return <div className="custom-dropdown-box">
                                {/* search */}
                                {config?.onSearch && <Input ref={itemRef} placeholder={searchPlaceholder} onChange={(e) => { config.onSearch && config.onSearch(e.target.value) }} />}
                                {/* options */}
                                <div className="option-wrapper">
                                    {defaultNode}
                                </div>
                            </div>
                        }}
                    />
                </div>

            case TermType.MULTI_SELECT:
                return <div ref={interfaceDomDef}>
                    <Select
                        optionRender={(option: any) => {
                            return <Space className='checkable-option'>
                                <Checkbox disabled={!!option.disabled} checked={!!value?.find(ele => ele.value === option.value)} />
                                {option.label}
                            </Space>
                        }}
                        {...rest}
                        value={value}
                        labelInValue={true}
                        open={true}
                        className={`${selectStyle()} ${config.className}`}
                        popupClassName={`${dropdownStyle(token)} ${config.popupClassName}`}
                        mode="multiple"
                        onChange={onChange}
                        getPopupContainer={() => {
                            return interfaceDomDef?.current || document.body
                        }}
                        dropdownRender={(defaultNode) => {
                            return <>
                                {/* search */}
                                {config?.onSearch ? <Input onChange={(e) => { config.onSearch && config.onSearch(e.target.value) }} /> : false}
                                {/* options */}
                                {defaultNode}
                            </>
                        }}
                    />
                </div>

            case TermType.DATETIME:
                return <DatetimeTerm
                    {...rest}
                    locale={locale}
                    value={value}
                    onChange={(v) => { onChange && onChange(v); setOpen(false); }}
                    onCancel={() => { setOpen(false) }}
                />

            default:
                return <InputTerm
                    {...rest}
                    ref={itemRef}
                    locale={locale}
                    value={value}
                    onChange={(v) => { onChange && onChange(v); setOpen(false); }}
                    onCancel={() => { setOpen(false) }}
                />
        }
    }
    return <Popover
        trigger="click"
        open={open}
        destroyTooltipOnHide
        onOpenChange={(newV) => {
            setOpen(newV);
            if ([TermType.DATETIME].includes(config.widget)) return;
            if (!newV) {
                if (![TermType.SELECT, TermType.MULTI_SELECT].includes(config.widget)) {
                    const newV = itemRef.current?.getValue && itemRef.current?.getValue();
                    onChange && onChange(newV);
                }
                return;
            }
            setTimeout(() => {
                itemRef.current?.focus && itemRef.current?.focus();
            }, 200)
        }}
        className={`${termPopoverStyle()} ${config.widget && [TermType.SELECT, TermType.MULTI_SELECT].includes(config.widget) ? noPaddingPopoverStyle() : ''}`}
        content={rendeContent(config)}
        placement="bottomLeft"
        getPopupContainer={() => {
            return domRef?.current || document.body
        }}>
        <Space ref={domRef} className={`${formItemStyle(token)} ${open ? 'focused' : ''}`}>
            <label className="form-item-label">{config.label || ''}:</label>
            <PlainTerm value={value} type={config.widget} locale={locale} icon={<CaretDownOutlined rotate={open ? 180 : 0} />} />
            {value && <span className="form-item-clear">
                <CloseCircleFilled onClick={() => { onChange && onChange(undefined) }} />
            </span>}
        </Space>
    </Popover>
}

export default TermItem