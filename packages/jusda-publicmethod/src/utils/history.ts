/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import queryString from 'query-string';
interface HistoryParams {
    history?: any;
    modifyUrl?: (props: any) => void; // 主应用传入的修改路由方法
    isMainApplication?: boolean; //是否是主应用
    mainApplicationHistory?: any; //主应用的history
}

interface ModifyUrlProps {
    activeKey?: string | (string | null)[] | null; //当前激活的子应用
    subApplicationPath?: string; //子应用路由
    history?: any; // umi4的history.进行页面跳转
    modifyUrl?: (props: any) => void;
    systemPath?: string; // 如果子应用需要再线上单独访问,则需要将系统路径填入, 如自营先下单,则需要传'/ob'
}

const getUrlParams = (urlParams: any) => {
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
    // @ts-ignore
    const microApplicationSystemPath: string = localStorage.getItem(
        'microApplicationSystemPath',
    );
    let newPath: string = getUrlParams(urlParams)?.individualAccessPath;

    // 如/ob,导致获取path参数时,会多带入项目路径,导致memory模式跳转页面失败
    const IsThereIgnoredPath = newPath.indexOf(microApplicationSystemPath);
    // 需要忽略,删除此路径
    if (IsThereIgnoredPath >= 0) {
        newPath = newPath.slice(microApplicationSystemPath.length);
    }
    return newPath;
};

// 原则是子应用不能去修改URL,但是子应用单独开发时. 需要去修改URL进行记录,否则刷新页面会重新会到跟路由.
class History {
    props: HistoryParams = { isMainApplication: false, history: {} };
    private __popstate: any = 0;

    constructor(props: HistoryParams) {
        this.props = props;
    }

    microFrontModifyUrl = (params: ModifyUrlProps) => {
        const { history, modifyUrl = undefined, isMainApplication } = this.props;
        const { activeKey, subApplicationPath } = params;

        //如果有这个参数. 代表子应用是通过嵌入主应用进行访问.
        //如果没有这个参数,代表子应用单独访问时调用,isMainApplication为true代表主应用进行调用
        if (modifyUrl || isMainApplication) {
            if (modifyUrl) {
                const createDefaultActiveKey = activeKey
                    ? activeKey
                    : queryString.parse(decodeURIComponent(window.location.hash).slice(2))
                        ?.activeKey;

                modifyUrl({ activeKey: createDefaultActiveKey, subApplicationPath });
                return;
            }
            const urlParamsKeys = Object.keys(params) as any;
            const newActiveKey =
        window.location?.hash &&
        queryString.parse(decodeURIComponent(window?.location?.hash).slice(2))
            .activeKey;
            params['subApplicationPath'] = `^${params?.['subApplicationPath']}^`;
            if (!urlParamsKeys.includes('activeKey')) {
                urlParamsKeys.unshift('activeKey');
                params['activeKey'] = newActiveKey;
            }
            let jumpPath = '';
            urlParamsKeys.forEach((item: keyof ModifyUrlProps, index: number) => {
                if (params[item]) {
                    jumpPath += `${index === 0 ? '' : '&'}${item}=${params[item]}`;
                }
            });
            const afterTranslation = encodeURIComponent(jumpPath);
            history?.push(`/?${afterTranslation}`);
        } else {
            // 子应用单独访问. 单独修改路由
            const subApplicationPath: any = params['subApplicationPath'];
            const newPathObj = queryString.parse(subApplicationPath);
            let jumpPath = '';
            const microApplicationSystemPath = localStorage.getItem(
                'microApplicationSystemPath',
            );
            if (newPathObj.routePath) {
                jumpPath += `${newPathObj.routePath}`;
            }
            delete newPathObj.routePath;
            const pathKeys = Object.keys(newPathObj);

            pathKeys.forEach((item: any, index: number) => {
                if (newPathObj[item]) {
                    jumpPath += `${index === 0 ? '?' : '&'}${item}=${newPathObj[item]}`;
                }
            });

            // 子应用因为用memory模式. 导致执行push方法URL不会有修改,
            // 用pushState方法将URL进行同步修改.达到刷新页面后能通过URL返回到当前目录

            window.history.pushState({}, '', microApplicationSystemPath + jumpPath);
            history.push(jumpPath);
        }
    };

    subAppPageJump = ({ urlParams }: { urlParams: any }) => {
        const { subApplicationPath, activeKey } = urlParams || {};
        const { history } = this.props;
        let newPath: string = getUrlParams(urlParams)?.individualAccessPath;
        if (subApplicationPath && activeKey) {
            //子应用嵌套主营用刷新后跳转与正常跳转
            history.push(`${subApplicationPath}`);
        } // 子应用单独访问
        else if (newPath) {
            // @ts-ignore
            const newPath = getSubAppPageJumpPath(urlParams);
            history.push(newPath || '/');

            if (!this.__popstate) {
                //利用popstate. 防止重复监听进行多次跳转. 实现子应用模式memory前进后退功能
                this.__popstate = addEventListener('popstate', () => {
                    // 获取跳转路由
                    const newPath = getSubAppPageJumpPath(urlParams);
                    history.push(newPath || '/');
                });
            }
        } else {
            // 子应用没有任何路由参数 返回根路径
            history.push('/');
        }
    };
}

const JusdaHistory = History;

export { History, getUrlParams, JusdaHistory };
