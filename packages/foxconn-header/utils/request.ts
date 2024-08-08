// @ts-ignore
import request from '@jusda-tools/web-api-client';
// @ts-ignore
import { mpApiUrl } from '@jusda-tools/url-config';
// @ts-ignore
import { currentLanguage } from '@jusda-tools/language-control-panel';

// console.log('currentLanguage', currentLanguage());
request.interceptors.request.use(
    (url, options) => {
        // @ts-ignore
        const { headers } = options;
        return {
            url: /http/.test(url) ? url : `${mpApiUrl}${url}`,
            options: {
                ...options, headers: {...headers, 'accept-language': currentLanguage() },
            },
        };
    },
    { global: false }
);

export default request;

