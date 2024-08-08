/* eslint-disable @typescript-eslint/explicit-function-return-type */
import request from '@jusda-tools/web-api-client';
import authSwitchConfig from './authSwitchConfig';

export default async function getAuthSwitchList(coverClientId?: string) {
    const { clientId } = window.jusdaBaseConfig;
    const newClient = coverClientId ? coverClientId : clientId;
    const conf = authSwitchConfig(newClient);
    const authList = await request.get(conf.getAuthUrl);
    if (authList && authList.success && authList.data) {
        sessionStorage.setItem('authswitch-list', JSON.stringify(authList.data));
    } else {
        sessionStorage.setItem('authswitch-list', JSON.stringify([]));
    }
    return authList;
}
