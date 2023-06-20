import authTools from '@jusda-tools/auth-tools';
import { CookieTools } from '@jusda-tools/jusda-publicmethod';
const { JusdaUserInfo } = authTools;

const { root_domain } = window.jusdaBaseConfig;

const browserParams = {
    // 浏览器窗口高度
    outHeight: window.outerHeight,
    // 浏览器窗口宽度
    outWidth: window.outerWidth,
    // 浏览器窗口可视区域宽度
    innerWidth: window.innerWidth,
    // 浏览器窗口可视区域高度
    innerHeight: window.innerHeight,
    // 浏览器窗口相对于屏幕的X坐标
    screenX: window.screenX,
    // 浏览器窗口相对于屏幕的Y坐标
    screenY: window.screenY,
    // 当前电脑屏幕宽度
    screenWidth: window.screen.width,
    // 当前电脑屏幕高度
    screenHeight: window.screen.height,
    // 当前电脑屏幕可用宽度
    workWidth: window.screen.availWidth,
    // 当前电脑屏幕可用高度
    workHeight: window.screen.availHeight,
};

function getCfgTypeUrl() {
    const {
        jusdaBaseConfig: { cfgType } = {
            cfgType: 'dev',
        },
    } = window;
    if (cfgType === 'prod') {
        return {
            extranetUrl: 'https://datahub.jusdaglobal.com/g2/kafka/push/data',
            intranetUrl: `https://mp${root_domain}/datahub/`,
        };
    } else {
        return {
            extranetUrl:
                'https://datahubsit.jusdaglobal.com/core/kafka/push/data',
            intranetUrl: `https://mpuat${root_domain}/datahub/`,
        };
    }
}

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
        proxyUserId: proxyID || '',
        userName: realName,
        accountName: username,
        tenantName: userIdentity?.tenant?.tenantName,
        token,
        userAgent,
        isBusinessOperations,
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
export default function recordUserActions(appName, parameter = {}) {
    const {
        jusdaBaseConfig: {
            cfgType,
            clientId,
            appName: configAppName,
            isIntranet,
        } = {
            cfgType: 'dev',
        },
    } = window;
    if (getCfgTypeUrl()) {
        const token = new CookieTools().getToken();
        if (!token) {
            console.log('没有里获取到token,请查看token是否存入');
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
                    appName: appName || configAppName || clientId,
                    browserParams,
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
                const url = isIntranet ? 'intranetUrl' : 'extranetUrl';
                const currentUrl = getCfgTypeUrl()?.[url];
                postData(currentUrl, {
                    body: {
                        topic: 'juslink.user-event',
                        data: currentUserInformation,
                    },
                });
            }
        });
    }
}

export function pageViewAction(appName) {
    //init
    recordUserActions(appName, {
        action: 'page-view',
        properties: {
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
            recordUserActions(appName, {
                action: 'page-view',
                properties: {
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
            recordUserActions(appName, {
                action: 'page-view',
                properties: {
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
