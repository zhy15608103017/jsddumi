/* eslint-disable @typescript-eslint/camelcase */
import zh_CN from './zh-CN';
import en_US from './en-US';

const getLocale = (locale: 'zh-CN' | 'en-US' = 'zh-CN'): any => {
    const locales = {
        'zh-CN':  zh_CN,
        'en-US':  en_US,
    };
    return locales[locale];
};

export default getLocale;
