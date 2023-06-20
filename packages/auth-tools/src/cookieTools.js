/* eslint-disable no-alert */
import JScookies from 'js-cookie';
import { JUSDATOKEN } from '@jusda-tools/jusda-publicmethod';
const ipReg = /(?=(\b|\D))(((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))\.){3}((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))(?=(\b|\D))/;

const cookieAttributes = () => {
    const { domain } = document;
    let cookieDomain = `.${domain.split('.').slice(-2).join('.')}`;
    if (document.domain.includes('localhost')) {
        alert('当前domain为 localhost 无法操作cookie! \n请使用域名或ip方式！');
    }
    // 192.169.124.11
    if (ipReg.test(domain)) {
        cookieDomain = domain;
    }
    return { path: '/', domain: cookieDomain, SameSite: 'None', Secure: true };
};

export default class CookieTools {
    constructor() {
        this.options = cookieAttributes();
    }

    get(key) {
        return JScookies.get(key);
    }

    set({ key, value, configuration = {} }) {
        JScookies.set(key, value, { ...this.options, ...configuration});
        return new Promise((resolve, reject) => {
                const firstCookie = JScookies.get(key);
                /*
                采用设置2次cookie的方式解决浏览器版本兼容问题
                1、如果浏览器版本为89(不含)以下版本cookie属性带SameSite、Secure会导致cookie写入不成功
                2、如果第一次设置不成功的话，就取消掉cookie中的SameSite、Secure属性，再次设置cookie
                ps:cookie加SameSite、Secure属性是为了iframe中的cookie能被正常使用(现在只有运输可视化和阿里合作的那个项目使用了)
                */
                if (value === firstCookie) {
                    resolve(firstCookie);
                } else {
                    const oldBrowsersOptions = { ...this.options };
                    // 删除cookie属性再次设置cookie
                    delete oldBrowsersOptions.SameSite;
                    delete oldBrowsersOptions.Secure;
                    JScookies.set(key, value, { ...oldBrowsersOptions, ...configuration});
                    const secondCookie = JScookies.get(key);
                    if(value === secondCookie) {
                        resolve(secondCookie);
                    } else {
                        console.error('cookie设置失败');
                        reject();
                    }
                }
        });
    }

    remove(key) {
        JScookies.remove(key, this.options);
    }

    removeToken() {
        this.remove(JUSDATOKEN);
    }

    getToken() {
        return JScookies.get(JUSDATOKEN);
    }
}
