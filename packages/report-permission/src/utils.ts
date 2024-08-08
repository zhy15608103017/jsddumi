import {message} from 'antd';
import {getThirdPartToken} from "./service";
import authTools from "@jusda-tools/auth-tools";
import locales from './locales/index.js';
import { currentLanguage } from '@jusda-tools/language-control-panel';

const { CookieTools } = authTools;
export const getThirdToken = async () => {
    const params = {
        appId: 'fanruan-report',
        token: new CookieTools().getToken(),
    };
    return await getThirdPartToken(params).then(res => {
        if (res.success) {
            return res?.data?.access_token;
        }
        if(res?.errorCode){
            message.error(locales.get(currentLanguage())?.[res?.errorCode]) ;
        }
    });
};

export const reload = async (url: string) => {
    const myIframe = document.getElementById('myIframe');
    const token = await getThirdToken();
    if (myIframe && url) {
        // @ts-ignore
        myIframe.src =  url?.indexOf('?') > -1 ? `${url}&ssoToken=${token}` : `${url}?ssoToken=${token}`;
    }
};
