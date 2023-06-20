import request from "@jusda-tools/web-api-client";
import { currentLanguage } from '@jusda-tools/language-control-panel';
// @ts-ignore
import { mpApiUrl } from "@jusda-tools/url-config";
import { message } from 'antd';
import localeStore from '../locale';


request.interceptors.request.use(
    (url, options) => {
        // @ts-ignore
        const { headers } = options;
        return {
            url: /http/.test(url) ? url : `${mpApiUrl}${url}`,
            options: {
                ...options,
                headers: {
                    ...headers,
                    'accept-language': currentLanguage(),
                },
            },
        };
    },
    { global: false }
);

request.interceptors.response.use(async (response) => {
    const data = await response?.clone()?.json();
    const currentLocale = localeStore[currentLanguage()];
    const currentLocaleKeys = Object.keys(currentLocale);
    if(data && data.errorCode && currentLocaleKeys.includes(data.errorCode)){
        message.error(currentLocale[data.errorCode]);
    }
    if(data && !data.success && data.code !== '00000' && !currentLocaleKeys.includes(data.errorCode || data.code)){
        message.error(currentLocale.SYSEM_ERROR);
    }
    return response;
}, { global: false });
export default request;
