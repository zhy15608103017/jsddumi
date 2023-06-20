import request from '@jusda-tools/web-api-client';
import { currentLanguage } from '@jusda-tools/language-control-panel';
request.interceptors.request.use((url, options) => {
    const { headers } = options;
    return {
        options: Object.assign(Object.assign({}, options), { headers: Object.assign(Object.assign({}, headers), { 'accept-language': currentLanguage() }) }),
    };
});
export default request;
