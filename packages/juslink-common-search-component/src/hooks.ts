import dayjs from "dayjs";
import { useEffect, useMemo } from "react";
import zhCN from './locale/zh';
import enUS from './locale/en';

export const useConfigFromLocalStorage = (key, config, searchConfig) => {

    const getConfig = () => {
        const record = localStorage.getItem(key);
        if (!record) return null;
        try {
            return JSON.parse(record);
        } catch (err) {
            console.warn('juslink-common-search', err);
            return null;
        }
    }

    const setConfig = (value, newActivedSearchConfig) => {

        // Object.keys(value).forEach(key =>{
        //     if( dayjs.isDayjs(value[key]) ){

        //     }
        // })

        // console.log('value stringied',JSON.stringify(value))
        localStorage.setItem(key, JSON.stringify({ value, config: newActivedSearchConfig.map(ele => { return { key: ele?.key, sticky: ele?.sticky } }) }));
    }

    // useEffect(() => {
    //     // value变化则更新value
    //     setConfig(config, activedSearchConfig)
    // }, [config])
    return { config, getConfig, setConfig }
}

export const useLocaleContent = (locale:'zh-CN'|'en-US') =>{
    const localeContent = useMemo(()=>{
        switch(locale){
            case 'zh-CN':
                return zhCN
            case 'en-US':
                return enUS
            default:
                return zhCN
        }
    },[locale])
    return localeContent;
}