import request from '@jusda-tools/web-api-client';
import LoginAnimate from './LoginAnimate.js';
import { CookieTools, JUSDATOKEN, UserIdentityId_Tab, UserIdentityId_Newest } from '@jusda-tools/jusda-publicmethod';
import envConfig from './envConfig.js';
import { tokenFn } from './token.js';
import JusdaUserInfo from './jusdaUserInfo.js';
import { getUrlParam, monitorWindowStatus, removeParameters } from './utils.js';

const cookieTools = new CookieTools();
const loginAnimate = new LoginAnimate();
const jusdaUserInfo = new JusdaUserInfo();

const {
    isMobile,
} = window.jusdaBaseConfig;


const {
    authUrl,
    getTokenUrl,
    getUserInfoUrl,
    authMobileUrl,
} = envConfig;

function getReplaceCodeRegexp() {
    const verificationCode = getUrlParam(window.location.href, 'code').replace('#', '').replace('/', '');
    const regexp = new RegExp(`[/?, /&]code=\\w{${verificationCode.length}}([/?,/&]state=\\w*)`, 'mg');
    return regexp;
}


export default async function AuthLogin(coverRedirectUrl) {
    const token = tokenFn.getToken();
    const verificationCode = getUrlParam(window.location.href, 'code');
    // 个人中心绑定微信后由于微信返回的参数是code，和juslink的令牌换token的参数 重名，所以在绑定微信时增加ignoreType参数来做区分，
    // 有ignoreType这个参数时，就不需要去做code换token操作了
    const ignoreType = getUrlParam(window.location.href, 'ignoreType');
    const { href } = window.location;
    // 登录中
    if (verificationCode && ignoreType!=='codeToToken') {
        // 显示登录动画 (移动端无动画)
        !isMobile && loginAnimate.show();
        cookieTools.remove(JUSDATOKEN);
        // 移除tab页的身份ID
        sessionStorage.removeItem(UserIdentityId_Tab);
        // 登录动画至少显示一秒 (移动端无动画)
        !isMobile && await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await request.get(`${getTokenUrl}?code=${verificationCode}&authorization_type=${jusdaBaseConfig.responseType || ''}&client_id=${jusdaBaseConfig.clientId || ''}&client_secret=${jusdaBaseConfig.appId || ''}`);;
        if (!response) {
            return goAuth(coverRedirectUrl);
        }
        const { data, success } = response;
        // token获取失败
        if (!success) {
            // 清除cookie中的token
            return goAuth(coverRedirectUrl);
        } else {
            // 设置cookie
            await tokenFn.setToken(data);
            // 隐藏登录动画 (移动端无动画)
            !isMobile && loginAnimate.hide();
            await getUserInfo(coverRedirectUrl);
            window.history.pushState({}, null, href.replace(getReplaceCodeRegexp(), ''))
            // window.location.href = href.replace(getReplaceCodeRegexp(), '');
            return Promise.resolve();
        }
    }

    if (!token) {
        return goAuth(coverRedirectUrl);
    }
    await getUserInfo(coverRedirectUrl);
}

//  获取用户信息
async function getUserInfo(coverRedirectUrl) {
    const userInfoRes = await request.get(getUserInfoUrl);
    if (!userInfoRes) {
        jusdaUserInfo.logout(coverRedirectUrl);
        return Promise.reject();
    }

    const { success, errorCode, data } = userInfoRes;
    if (['403', '401'].includes(errorCode) || !success) {
        jusdaUserInfo.logout(coverRedirectUrl);
        return Promise.reject();
    }
    // 增加用户身份ID以备后续校验，防止因用户信息污染导致的业务问题
    if(success && data){
        const userIdentityId = data.userIdentity ? data.userIdentity.userIdentityId : undefined;
        sessionStorage.setItem(UserIdentityId_Tab, userIdentityId);
        cookieTools.set({
            // eslint-disable-next-line @typescript-eslint/camelcase
            key: UserIdentityId_Newest,
            value: userIdentityId
        });
        monitorWindowStatus();
    }
    window.jusdaUserInfo = userInfoRes;
}

export function getRuntimeRedirectUrl() {
    let redirectUrl = window.location.origin + window.location.pathname + window.location.hash;
    // ignoreType参数为绑定微信时加的特殊参数(因为微信绑定时返回的url上也会带一个微信的code与统一登录的code参数key重复了，所以增加ignoreType参数来区分)
    // 但在微信绑定时如果登录信息已经过期，返回登录流程就需要去掉这个参数，不然无法正常走code换token的流程
    if(redirectUrl.includes('ignoreType')){
        redirectUrl = removeParameters(redirectUrl, ['ignoreType']);
    }
    return decodeURIComponent(redirectUrl).replace(getReplaceCodeRegexp(), '');
}

function goAuth(coverRedirectUrl) {
    cookieTools.remove(JUSDATOKEN);
    const { jusdaBaseConfig } = window;
    const redirectUrl = (coverRedirectUrl && coverRedirectUrl.length > 0) ? coverRedirectUrl : getRuntimeRedirectUrl();
    window.location.href = `${isMobile ? (authMobileUrl + '?clientId=' + jusdaBaseConfig.clientId) : authUrl}&redirectUrl=${encodeURIComponent(`${redirectUrl}`)}&state=${jusdaBaseConfig ? jusdaBaseConfig.state || 'placeholder' : 'placeholder'}&responseType=${jusdaBaseConfig ? jusdaBaseConfig.responseType || 'code' : 'code'}&scopeCodes=${jusdaBaseConfig ? jusdaBaseConfig.scopeCodes || '' : ''}&t=${new Date().getTime()}`;
    return Promise.reject();
}
