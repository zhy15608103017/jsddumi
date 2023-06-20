import request from '@jusda-tools/web-api-client';
import envConfig from './envConfig.js';
import JusdaUserInfo from './jusdaUserInfo.js';
import { CookieTools, JUSDA_LANGUAGE } from '@jusda-tools/jusda-publicmethod';

const {
    isMobile,
    isIntranet,
} = window.jusdaBaseConfig;

const {
    url403,
    mobileUrl403,
    applicationAuthUrl,
} = envConfig;

const languageMsg = new Map()
     .set('zh-CN','当前账号没有访问权限，请重新登陆!')
     .set('en-US','The current account does not have access rights, please log in again');

export default async function AuthApplication() {
    const response = await request.get(applicationAuthUrl);
    if (!response) {
        return check403type();
    }
    const { data, success } = response;
    if (data && success) {
        return Promise.resolve();
    } else {
        return check403type();
    }
}

function currentLanguage() {
    const LANGS = ['en-US', 'zh-CN'];
    const cookieLang = new CookieTools().get(JUSDA_LANGUAGE);
    if(LANGS.includes(cookieLang)){
        return cookieLang;
    }
    const isNavigatorLanguageValid = typeof navigator !== 'undefined' && typeof navigator.language === 'string';
    if(isNavigatorLanguageValid){
        const [browserLangPrefix] = navigator.language.split('-');
        return browserLangPrefix === 'zh' ? 'zh-CN' : 'en-US';
    }
}

function check403type() {
    if (isMobile) {
        // new JusdaUserInfo().logout();
        window.location.href = mobileUrl403;
        return Promise.reject();
    }
    // else if (isIntranet === true) {
    //     // 内网环境访问 跳转到登录页面
    //     const language = currentLanguage() === 'zh-CN' ? 'zh-CN' : 'en-US'
    //     alert(languageMsg.get(language));
    //     new JusdaUserInfo().logout();
    //     return Promise.reject();
    // }
    else {
        window.location.href = url403;
        return Promise.reject();
    }
}
