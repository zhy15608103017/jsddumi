/* eslint-disable @typescript-eslint/explicit-function-return-type */
import request from '@jusda-tools/web-api-client';
import authConfig from './authConfig';

export default async function getAuthList(coverClientId?: string) {
    const { clientId } = window.jusdaBaseConfig;
    const newClient = coverClientId ? coverClientId : clientId;
    const conf = authConfig(newClient);
    const authList = await request.get(conf.getAuthUrl);
    if (authList && authList.success && authList.data) {
        sessionStorage.setItem(`auth-list-${newClient}`, JSON.stringify(authList.data));
    } else {
        sessionStorage.setItem(`auth-list-${newClient}`, JSON.stringify([]));
    }
    return authList;
}
