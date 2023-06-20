/* eslint-disable linebreak-style */
import authTools from '@jusda-tools/auth-tools';
import { mpApiUrl } from '@jusda-tools/url-config';
import { CookieTools } from '@jusda-tools/jusda-publicmethod';
import { v4 as uuidv4 } from 'uuid';
import initGlobalPoints, { sensors, exposure } from "./initsensors.js";
const { JusdaUserInfo } = authTools;
const basicProperties = {
    collectionMode: 'client', // 收集模式 server/client
    sessionId: uuidv4(), // 前端自己生成uuid
};
function postData(url, { body, headers = {} }) {
    const token = new CookieTools().getToken();
    return fetch(url, {
        body: JSON.stringify(body), // must match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization: token,
            ...headers,
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // *client, no-referrer
    }).then((response) => response.json()); // parses response to JSON
}

async function getUserInfo() {
    const userInfo = new JusdaUserInfo().getFullInfo();
    const token = new CookieTools().getToken();
    const {
        data: {
            proxyUser,
            user: { userId, realName, username, isBusinessOperations },
            userIdentity,
        },
    } = userInfo;
    const proxyID = proxyUser && proxyUser.userId ? proxyUser.userId : null;
    const {
        navigator: { userAgent },
    } = window;
    // 用户ID和租户ID 代理用户ID
    const currentUserInformation = {
        userId,
        tenantId: userIdentity?.tenant?.tenantId,
        isProxy: !!proxyID,
        proxyUserId: proxyID || "",
        nickname: realName,
        username: username,
        tenantName: userIdentity?.tenant?.tenantName,
        token,
        userAgent,
        isBusinessOperator: isBusinessOperations,
        userRoles: userIdentity?.roles,
    };
    return currentUserInformation;
}

function bindHistoryEvent(type) {
    const historyEvent = history[type];
    return function () {
        const newEvent = historyEvent.apply(this, arguments); //执行history函数
        const e = new Event(type); //声明自定义事件
        e.arguments = arguments;
        window.dispatchEvent(e); //抛出事件
        return newEvent; //返回方法，用于重写history的方法
    };
}

// 用户埋点
export default function registerUserActions(appCode, parameter = {}) {
    const {
        jusdaBaseConfig: {
            cfgType,
            clientId,
            appName: configAppName,
        } = {
            cfgType: 'dev',
        },
    } = window;
    if (mpApiUrl) {
        const token = new CookieTools().getToken();
        if (!token) {
            console.log('没有获取到token,请查看token是否存入');
            return;
        }

        getUserInfo().then((currentUserInformation) => {
            if (currentUserInformation) {
                const parameterKeys = Object.keys(parameter);

                const time = new Date().getTime();
                const locationHash = window.location.hash; // 当前路由判断当前哪个页面进行操作
                Object.assign(currentUserInformation, {
                    time,
                    locationHash,
                    runtimeEnv: cfgType,
                    appCode: appCode || configAppName || clientId,
                    ...basicProperties,
                });
                // 如果有传参的情况(必须以对象形式),将传入的参数一并交互给大数据.
                if (parameterKeys && parameterKeys.length) {
                    parameterKeys.forEach((item) => {
                        Object.assign(currentUserInformation, {
                            [item]: parameter[item],
                        });
                    });
                }
                // 将用户埋点数据传给大数据    topic大数据固定为juslink.user-event不可更改
                const currentUrl = `${mpApiUrl}/jusda-common-operation-log/logs/buried-point-logs`;
                postData(currentUrl, {
                    body: currentUserInformation,
                    headers: {
                        clientId,
                    }
                });
            }
        });
    }
}

function pageBrowseAction(appCode) {
    //init
    registerUserActions(appCode, {
        action: 'page-view',
        extraProperties: {
            from: window.location.href,
            to: window.location.href,
        },
    });

    const storeConfigFn = function () {
        let url = window.location.href;
        return {
            setUrl: (v) => {
                url = v;
            },
            getUrl: () => {
                return url;
            },
        };
    };
    const store = storeConfigFn();
    if (
        'onhashchange' in window &&
        (typeof document.documentMode === 'undefined' ||
            document.documentMode === 8)
    ) {
        window.addEventListener('hashchange', () => {
            registerUserActions(appCode, {
                action: 'page-view',
                extraProperties: {
                    from: store.getUrl(),
                    to: window.location.href,
                },
            });
            store.setUrl(window.location.href);
        });
    }

    // 由于history 包升级到5.X 后 history.push() 方法实际调用的是 window.history.pushState() 
    // 所以需要自定义监听方法来监听 history.pushState() 
    try {
        history.pushState = bindHistoryEvent('pushState');
        window.addEventListener('pushState', () => {
            registerUserActions(appCode, {
                action: 'page-view',
                extraProperties: {
                    from: store.getUrl(),
                    to: window.location.href,
                },
            });
            store.setUrl(window.location.href);
        });
    } catch (error) {
        console.warn('埋点pushState', error);
    }
}
export {
    sensors, initGlobalPoints, pageBrowseAction, exposure
};
