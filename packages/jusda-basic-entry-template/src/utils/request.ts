/* eslint-disable @typescript-eslint/explicit-function-return-type */
import request from '@jusda-tools/web-api-client';
import { mpApiUrl } from '@jusda-tools/url-config';
import { currentLanguage } from '@jusda-tools/language-control-panel';
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
                    'accept-language': currentLanguage()
                },
            },
        };
    },
    { global: false },
);

export default request;
