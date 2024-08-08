/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import queryString from 'query-string';
interface HistoryParams {
    history?: any;
    shouldInterceptRoute?: boolean; //是否需要拦截当前路由跳转行为
    modifyUrl?: (props: any) => void; // 主应用传入的修改路由方法
    isMainApplication?: boolean; //是否是主应用
    mainApplicationHistory?: any; //主应用的history
}

interface ModifyUrlProps {
    activeKey?: string | (string | null)[] | null; //当前激活的子应用
    subApplicationPath?: string; //子应用路由
    historyState?: any; //顾名思义
    // systemPath?: string; // 如果子应用需要再线上单独访问,则需要将系统路径填入, 如自营先下单,则需要传'/ob'
    // routeInterceptionCallback?: (props: any) => void; //路由拦截生效后,需要立刻执行的回调函数
}
// 拼接路由参数
const subApplicationPathParamsSpell = (urlParams: {
    routePath: string;
    [k: string]: any;
}) => {
    const urlParamsKeys = Object.keys(urlParams);
    let subApplicationPath = '';

    if (urlParams.routePath) {
        subApplicationPath += `?routePath=${urlParams.routePath}`;
    }

    urlParamsKeys.forEach((item: string) => {
        if (item === 'routePath') {
            return;
        }
        subApplicationPath += `&${item}=${urlParams[item]}`;
    });
    return subApplicationPath;
};

const getUrlParams = (urlParams?: any) => {
    if (urlParams) {
        return urlParams;
    }
    const { location } = window;
    const individualAccessPath = `${location.pathname}${location.search}`;
    const result: {
        individualAccessPath: string;
        [propName: string]: string;
    } = {
        individualAccessPath,
        ...queryString.parse(location.search),
    };
    return result;
};

const getSubAppPageJumpPath = (urlParams: any) => {
    // 获取跳转路由
    const microApplicationSystemPath: any = localStorage.getItem(
        'microApplicationSystemPath',
    );
    let newPath: string = getUrlParams(urlParams)?.individualAccessPath;

    // 有临时需要单独访问的项目需求. 如/ob,导致获取path参数时,会多带入项目路径,导致memory模式跳转页面失败
    const IsThereIgnoredPath = newPath.indexOf(microApplicationSystemPath);
    // 需要忽略,删除此路径
    if (IsThereIgnoredPath >= 0) {
        newPath = newPath.slice(microApplicationSystemPath.length);
    }
    return newPath;
};

// 原则是子应用不能去修改URL,但是子应用单独开发时. 需要去修改URL进行记录,否则刷新页面会重新会到跟路由.
class History {
    props: HistoryParams = {
        isMainApplication: false,
        history: {},
        shouldInterceptRoute: false,
    };
    private __popstate: any = 0;
    constructor(props: HistoryParams) {
        this.props = props;
    }

    // 获取当前窗口的subApplication_path
    getWindowUrlSubApplicationPath = (
        urlParamsString: any,
        searchName: string = 'subApplicationPath=^',
    ) => {
        const leftSPAIndex =
      urlParamsString.indexOf(searchName) + searchName.length;
        if (leftSPAIndex <= searchName.length) {
            return '';
        }

        const rightSPAIndex = urlParamsString.lastIndexOf('^');
        const subApplicationPath: string = urlParamsString.slice(
            leftSPAIndex,
            rightSPAIndex,
        );
        return subApplicationPath;
    };

    private __get__jump__path = (params: any) => {
        const urlParamsKeys = Object.keys(params) as any;
        const activeKey =
      window.location?.hash &&
      queryString.parse(decodeURIComponent(window?.location?.hash).slice(2))
          .activeKey;
        params['subApplicationPath'] = `^${params?.['subApplicationPath']}^`;
        if (!urlParamsKeys.includes('activeKey')) {
            params['activeKey'] = activeKey;
        }
        const newUrlParams = urlParamsKeys.filter(
            (item) => item !== 'historyState',
        );

        let jumpPath = '';
        newUrlParams.forEach((item: keyof ModifyUrlProps, index: number) => {
            if (params[item]) {
                jumpPath += `${index === 0 ? '' : '&'}${item}=${params[item]}`;
            }
        });
        return encodeURIComponent(jumpPath);
    };

    private __get__active__key = (activeKey?: any) =>
        activeKey ||
    queryString.parse(decodeURIComponent(window.location.hash).slice(2))
        ?.activeKey;

    microFrontModifyUrl = (params: ModifyUrlProps) => {
        const { history, modifyUrl = undefined, isMainApplication } = this.props;
        const { activeKey, historyState, subApplicationPath } = params;
        //modifyUrl代表子应用是通过嵌入主应用进行访问（该方法其实来自主应用）.否则表示子应用单独访问,
        //isMainApplication为true代表主应用进行调用(侧边栏)
        if (modifyUrl || isMainApplication) {
            if (modifyUrl) {
                modifyUrl({
                    activeKey: this.__get__active__key(activeKey),
                    subApplicationPath,
                    historyState,
                });
                return;
            }
            const afterTranslation = this.__get__jump__path(params);

            // 过滤重复点击事件
            const oldSubApplicationPath = (
                queryString?.parse(decodeURIComponent(window.location.hash))
                    ?.subApplicationPath as string
            )
                ?.match(/(?<=\^)([\S\s]+)(?=\^)/)
                ?.filter((item: any) => item.routePath);
            if (
                subApplicationPath === oldSubApplicationPath &&
          activeKey === this.__get__active__key(activeKey)
            ) {
                return;
            }
           

            history?.push?.(`/?${afterTranslation}`, historyState);
        } else {
            // 子应用单独访问. 单独修改路由
            const subApplicationPath: any = params['subApplicationPath'];
            const newPathObj = queryString.parse(subApplicationPath);
            let jumpPath = '';
            const microApplicationSystemPath =
        localStorage.getItem('microApplicationSystemPath') || '';
            if (newPathObj.routePath) {
                jumpPath += `${newPathObj.routePath}`;
            }
            delete newPathObj.routePath;
            const pathKeys = Object.keys(newPathObj)?.filter(
                (item) => item !== 'historyStates',
            );

            pathKeys.forEach((item: any, index: number) => {
                if (newPathObj[item]) {
                    jumpPath += `${index === 0 ? '?' : '&'}${item}=${newPathObj[item]}`;
                }
            });
            // 子应用因为用memory模式. 导致执行push方法URL不会有修改,
            // 用pushState方法将URL进行同步修改.达到刷新页面后能通过URL返回到当前目录
            window.history.pushState('', '', microApplicationSystemPath + jumpPath);
            history.push(jumpPath, historyState);
        }
    };

    subAppPageJump = ({
        urlParams,
        historyState,
    }: {
        urlParams: any;
        historyState: any;
    }) => {
        const { subApplicationPath, activeKey } = urlParams || {};
        const { history } = this.props;
        let subAppPath: string = getUrlParams(urlParams)?.individualAccessPath;
        if (subApplicationPath && activeKey) {
            //子应用嵌套主应用刷新后跳转与正常跳转
            history.push(`${subApplicationPath}`, historyState);
        } // 子应用单独访问
        else if (subAppPath) {
            // @ts-ignore
            const newPath = getSubAppPageJumpPath(urlParams);
            history.push(newPath || '/', historyState);
            if (!this.__popstate) {
                //利用popstate. 防止重复监听进行多次跳转. 实现子应用模式memory前进后退功能
                this.__popstate = addEventListener('popstate', () => {
                    // 获取跳转路由
                    const newPath = getSubAppPageJumpPath(urlParams);
                    history.push(newPath || '/', historyState);
                });
            }
        } else {
            // 子应用没有任何路由参数 返回根路径,如果业务系统有重定向,会导致historyState传参失败(会再次进行不带push操作)
            history.push('/', historyState);
        }
    };
}

const JusdaHistory = History;

export { History, getUrlParams, JusdaHistory, subApplicationPathParamsSpell };

// 拦截路由版本
// interceptRouteAndMicroFrontModifyUrl = (
//     params: any,
//     afterRouteInterception: (props: any) => void,
// ) => {
//     const activeKey: string = params?.active || this.__get__active__key();
//     const menuExternalProperties: any = sessionStorage.getItem(activeKey);
//     const shouldBlockRoute = JSON.parse(
//         menuExternalProperties,
//     ).shouldBlockRoute;

//     if (shouldBlockRoute) {
//         afterRouteInterception({
//             nextProps: params,
//             prevProps: {
//                 activeKey: this.__get__active__key(),
//                 subApplicationPath: this.__get_window_url_subApplication_path(
//                     decodeURIComponent(window.location.hash),
//                 ),
//             },
//         });
//     } else {
//         this.microFrontModifyUrl(params);
//     }
// };

// 设置需要被拦截的菜单到session中.
// setInterceptActiveKeyInSession = (
//     {
//         shouldBlockRoute,
//     }: {
//         shouldBlockRoute: boolean;
//     },
//     activeKey?: string,
// ) => {
//     const currentActiveKey = activeKey || this.__get__active__key();
//     sessionStorage.setItem(
//         currentActiveKey,
//         JSON.stringify({ shouldBlockRoute }),
//     );
// };
