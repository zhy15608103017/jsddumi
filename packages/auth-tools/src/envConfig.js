import { loginSiteUrl, mpApiUrl, mp_domain_prefix, mp_403_url } from '@jusda-tools/url-config';

const {
    clientId,
} = window.jusdaBaseConfig;

const config = {
    clientId,
    // 获取token
    getTokenUrl: `${ loginSiteUrl}/token`,
    // cookie过期重定向统一登录
    authUrl: `${loginSiteUrl}/pc/login?clientId=${clientId}`,
    authMobileUrl: `${loginSiteUrl}/mobile/login`,
    // 退出登录
    loginOutUrl: `${loginSiteUrl}/logout`,
    // 获取用户信息
    getUserInfoUrl: `${mpApiUrl}/usercenter-service/authentication/user/detail`,
    // 跨应用鉴权url AuthApplication
    applicationAuthUrl: `${mpApiUrl}/usercenter-service/authentication/${clientId}/have-permission`,
    // 跨应用无权限重定向403 AuthApplication
    url403: mp_403_url,
    // 移动端跨应用无权限重定向403
    mobileUrl403: `${mp_domain_prefix}/h5-personalcenter/#/app403?redirectUrl=${mp_domain_prefix}%2Fh5-personalcenter%2F%23%2Fapp403`,
    // ...authToolsDefault,
};

export default config;
