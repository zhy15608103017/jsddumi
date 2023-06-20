// @ts-nocheck
import { extend } from '@jusda-tools/web-api-client';
import { mpApiUrl } from '@jusda-tools/url-config'
import { CookieTools } from '@jusda-tools/jusda-publicmethod';
const cookieTools = new CookieTools();

export const request:any =()=>{
    const request = extend({
        prefix: `${mpApiUrl}`,
        timeout: 100000,
        headers: {
            clientId: 'feedback',
            authorization: `Bearer ${cookieTools.getToken()}`,
        },
    });
    return request;
}