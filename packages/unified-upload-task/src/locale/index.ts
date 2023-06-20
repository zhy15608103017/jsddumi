/* eslint-disable @typescript-eslint/camelcase */
import zh_CN from './zh-CN';
import en_US from './en-US';

const getLocale = (locale?: 'zh-CN' | 'en-US' ): any => {
    const locales = {
        'zh-CN':  zh_CN,
        'en-US':  en_US,
    };
    if(locale){
        return locales[locale]
    }
    const lang = localStorage.getItem('umi_locale');
    if (lang) {
        return lang.indexOf('zh') >= 0 ? 'zh-CN' : 'en-US';
    }
    const bowserLang = (
        (navigator.languages && navigator.languages[0]) ||
        navigator.language ||
        (navigator as any).browserLanguage
    ).toLowerCase();
    // const currentLocale = lang || bowserLang;
    if (bowserLang.indexOf('zh') >= 0) {
        return locales['zh-CN'];
    }
    // 假如浏览器语言是其它语言,默认为英文
    return locales['en-US'];
};

export default getLocale;
