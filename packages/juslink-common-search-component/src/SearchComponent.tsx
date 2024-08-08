import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from "react";
import { Space, Button, Form, ConfigProvider, ButtonProps } from 'antd';
import SearchArea from "./components/SearchArea";
import MoreButton from "./components/MoreButton";
import { LanguageType, SearchTermOption, TermType } from "./constant";
import { wrapperStyle } from "./style";
import { useConfigFromLocalStorage, useLocaleContent } from "./hooks";
import { getAntdConfig } from "@jusda-tools/jusda-theme-config";
import zhCN from 'antd/es/locale/zh_CN';
import enUS from 'antd/es/locale/en_US';
import 'dayjs/locale/zh-cn';



type SearchComponentProps = {
    searchTermOptions?: SearchTermOption[],
    resetText?: string | React.ReactElement,
    searchText?: string | React.ReactElement,
    fetchData?: (searchParams: any) => Promise<any>,
    onSearchClick?: (e: any) => void,
    onResetClick?: (e: any) => void,
    key?: string,
    theme?: { token: any, [key: string]: string },
    showSearchButton?: boolean,
    showResetButton?: boolean,
    searchButtonProps?: Omit<ButtonProps, 'onClick'>
    resetButtonProps?: Omit<ButtonProps, 'onClick'>,
    locale?: LanguageType,
    disableAutoSearch?: boolean,
}

const env = (window as any).jusdaBaseConfig?.cfgType || 'dev'

const SearchComponent: React.ForwardRefRenderFunction<any, SearchComponentProps> = (props, ref: any) => {
    const {
        resetText,
        searchText,
        fetchData = () => { },
        onSearchClick,
        onResetClick,
        searchTermOptions,
        key,
        theme,
        searchButtonProps,
        resetButtonProps,
        showSearchButton = true,
        showResetButton = true,
        locale = 'zh-CN',
        disableAutoSearch = false
    } = props;


    const { setConfig, getConfig } = useConfigFromLocalStorage(`${env}-common-search-${key || 'default'}`, {}, searchTermOptions);
    const localeData = useLocaleContent(locale);
    const getDefaultActiveKeys = () => {
        const savedActiveKey = getConfig()?.config?.map(ele => ele.key)?.reduce((pre, ele) => {
            if (!pre.includes(ele) && ele) {
                pre.push(ele)
            }
            return pre;
        }, []) || [];
        const stickyKeys = searchTermOptions?.filter(ele => ele.sticky)?.map(ele => ele.key);
        return savedActiveKey.concat(stickyKeys?.filter(key => !savedActiveKey?.includes(key)))
    }

    const defaultSearchTermKeys = searchTermOptions?.filter(ele => ele.sticky)?.map(ele => ele.key)

    const [activeTermKeys, setActiveTermKeys] = useState<string[]>([]);
    const [form] = Form.useForm();

    const handleSearch = () => {
        fetchData(form?.getFieldsValue()) // 搜索
    }

    const handleReset = () => {
        form.resetFields();
        fetchData({}); // 重置并搜索
    }

    useImperativeHandle(ref, () => ({
        form,
        handleSearch,
        handleReset
    }))

    const activeTerms = useMemo(() => {
        return activeTermKeys.reduce((pre, key) => {
            const target = searchTermOptions?.find(ele => ele.key === key);
            if (target) {
                const newTarget = {...target} as any;
                newTarget.disableAutoSearch= typeof target.disableAutoSearch === 'boolean' ? target.disableAutoSearch : disableAutoSearch;
                if(!target.widget) {
                    newTarget.onPressSearch = ()=>handleSearch();
                }
                pre.push(newTarget);
            }
            return pre;
        }, [] as SearchTermOption[]) || [];
    }, [activeTermKeys, searchTermOptions])


    const recordConfigsInLocal = (newKeys?: string[]) => {
        const clearRepeating = (newKeys || activeTermKeys)?.reduce((pre, ele) => {
            const targetConf = searchTermOptions?.find(conf => conf.key === ele);
            if (targetConf && !pre.find(conf => conf.key === targetConf.key)) {
                pre.push(targetConf)
            }
            return pre;
        }, [] as SearchTermOption[]) || [];
        setConfig(form.getFieldsValue(), clearRepeating)
    };

    useEffect(() => {
        setActiveTermKeys(getDefaultActiveKeys())
    }, [searchTermOptions])

    useEffect(() => {
        recordConfigsInLocal();
    }, [activeTermKeys])

    return <ConfigProvider
        prefixCls="juslink"
        locale={locale === 'zh-CN' ? zhCN : enUS}
        theme={{
            token: { ...getAntdConfig('v5') },
            ...(theme || {})
        }}>
        <div className={wrapperStyle()}>
            <SearchArea locale={locale} onFieldsChange={() => recordConfigsInLocal()} configs={activeTerms} form={form} className='terms-area' extraButton={
                <MoreButton
                    locale={locale}
                    activeKeys={activeTermKeys}
                    termOptions={searchTermOptions || []}
                    onActiveKeyChanged={(newActiveKeys) => { setActiveTermKeys(newActiveKeys); }}
                    onResetActive={() => { setActiveTermKeys(defaultSearchTermKeys || []); }}
                />
            } />
            <Space className='search-btn-box'>

                {showResetButton && <Button
                    {...(resetButtonProps || {})}
                    className={`w-90 ${resetButtonProps?.className || ''}`}
                    onClick={(e) => {
                        onResetClick && onResetClick(e);
                        handleReset()
                    }}>{resetText || localeData.reset}</Button>}
                {showSearchButton && <Button
                    type="primary"
                    {...(searchButtonProps || {})}
                    className={`w-90  ${searchButtonProps?.className || ''}`}
                    onClick={(e) => {
                        onSearchClick && onSearchClick(e);
                        handleSearch()
                    }}
                >{searchText || localeData.search}</Button>}
            </Space>
        </div>
    </ConfigProvider>
}

export default forwardRef(SearchComponent);