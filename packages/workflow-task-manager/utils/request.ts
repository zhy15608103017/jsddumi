import request from "@jusda-tools/web-api-client";
// @ts-ignore
import { mpApiUrl } from "@jusda-tools/url-config";

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

export default request;
