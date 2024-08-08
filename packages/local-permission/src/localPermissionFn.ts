/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/camelcase */

import { getApiUrl, getIntranetApiUrl } from './utils/index';

// const API = 'https://www.jus-link.com/registration/';
// const isIntranet_API = `${mp_domain_prefix}/registration/`;

// const CLIENTOVERSEA = 'clientoversea'; //国外用户
// const CLIENTDOMESTIC = 'clientdomestic'; //国内用户

//国内地区
const domesticArea = ['CN','HK','MO','TW'];

declare global {
    interface Window {
        __jusda_registration__: any;
    }
}

export default function localPermissionFn(): Promise<any> {
    if (window.__jusda_registration__) {
        return Promise.resolve(domesticArea.includes(window.__jusda_registration__));
    }
    return new Promise((resolve, reject) => {
        // @ts-ignore
        const { isIntranet } = window.jusdaBaseConfig;
        const apiUrl = isIntranet ? getIntranetApiUrl() : getApiUrl();
        fetch(apiUrl).then((res) => {
            return res.json();
        }).then((res) => {
            if (res && res.country) {
                resolve(domesticArea.includes(res.country));
                window.__jusda_registration__ = res.country;
            }
        }).catch((e) => {
            reject(`api ${apiUrl} catch: ${e}`);
        });
    });
}