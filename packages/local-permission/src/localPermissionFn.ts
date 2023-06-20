/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/camelcase */

const API = 'https://www.jus-link.com/registration/';
// const isIntranet_API = `${mp_domain_prefix}/registration/`;

const CLIENTOVERSEA = 'clientoversea'; //国外用户
const CLIENTDOMESTIC = 'clientdomestic'; //国内用户

declare global {
    interface Window {
        __jusda_registration__: any;
    }
}

function getEnvType (envType = '',cfgType = '') {
    if(envType.toLocaleLowerCase() === 'prod' || cfgType.toLocaleLowerCase() === 'prod') return '';
    return envType.toLocaleLowerCase() || cfgType.toLocaleLowerCase() || 'dev';
}

function getIntranetApiUrl(){
    // @ts-ignore
    const { cfgType, envType, root_domain='.foxconn.com' } = window.jusdaBaseConfig || {};
    const urlPrefix = getEnvType(envType,cfgType);
    return `https://mp${urlPrefix}${root_domain}/registration/`;
}

export default function localPermissionFn(): Promise<any> {
    if (window.__jusda_registration__) {
        return Promise.resolve(window.__jusda_registration__ === CLIENTDOMESTIC);
    }
    return new Promise((resolve, reject) => {
        // @ts-ignore
        const { isIntranet } = window.jusdaBaseConfig;
        const isIntranet_API = getIntranetApiUrl();
        const apiUrl = isIntranet ? isIntranet_API : API;
        fetch(apiUrl).then((res) => {
            return res.json();
        }).then((res) => {
            if (res && res.registration) {
                resolve(res.registration === CLIENTDOMESTIC);
                window.__jusda_registration__ = res.registration;
            }
        }).catch((e) => {
            reject(`api ${apiUrl} catch: ${e}`);
        });
    });
}