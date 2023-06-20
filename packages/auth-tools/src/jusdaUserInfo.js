import request from '@jusda-tools/web-api-client';
import { CookieTools } from '@jusda-tools/jusda-publicmethod';
import { getRuntimeRedirectUrl } from './AuthLogin'
import envConfig from './envConfig.js';
import { tokenFn } from './token.js';

const {
    authMobileUrl,
    authUrl,
    loginOutUrl,
} = envConfig;

export default class JusdaUserInfo {
    constructor() {
        this.userInfo = window.jusdaUserInfo;
    }

    getFullInfo() {
        return this.userInfo;
    }

    async logout(urlParam, newClientId) {
        const cookieTools = new CookieTools();
        const token = tokenFn.getToken()
        const { jusdaBaseConfig } = window;
        const { isMobile, clientId } = jusdaBaseConfig || {};
        // 退出接口header带上JSESSION (解决项目和登录域名不一致的问题)
        const session = cookieTools.get('JSESSION') || '';
        request.interceptors.request.use(
            (url, options) => {
                return {
                    url,
                    options: {
                        ...options,
                        headers: {
                            ...options.headers,
                            "JSESSION": `${session}`,
                        }
                    }
                };
            },
            { global: false }
        );

        await request.post(`${loginOutUrl}/${token}`);
        cookieTools.removeToken();
        const redirectUrl = urlParam ? encodeURIComponent(urlParam) : encodeURIComponent(`${getRuntimeRedirectUrl()}`);
        const newAuthMobileUrl = authMobileUrl + '?clientId=' + (newClientId || clientId);
        window.location.href = `${isMobile ? newAuthMobileUrl : authUrl}&redirectUrl=${redirectUrl}&state=${jusdaBaseConfig ? jusdaBaseConfig.state || 'placeholder' : 'placeholder'}&responseType=${jusdaBaseConfig ? jusdaBaseConfig.responseType || 'code' : 'code'}&scopeCodes=${jusdaBaseConfig ? jusdaBaseConfig.scopeCodes || '' : ''}&t=${new Date().getTime()}`;
    }
}
