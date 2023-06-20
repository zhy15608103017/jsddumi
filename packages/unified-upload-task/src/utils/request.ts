import request from '@jusda-tools/web-api-client';
// @ts-ignore
import { mpApiUrl } from '@jusda-tools/url-config';
const JSONbigString = require('json-bigint')({ storeAsString: true });
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
                },
            },
        };
    },
    { global: false }
);
request.interceptors.response.use(
    async (response) => {
        const data = await response?.clone()?.json();
        const type = response.headers?.get('content-type');
        let res = await fixSnowFlake(response, type);

        return res;
    },
    { global: false },
);
async function fixSnowFlake(response: Response, type: any) {
    if (type === 'application/json') {
        const text = await response?.clone()?.text();
        const json = JSONbigString.parse(text);
        return Promise.resolve(json);
    }
    return Promise.resolve(response);
}
export default request;