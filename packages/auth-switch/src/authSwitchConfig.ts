import {mpApiUrl} from '@jusda-tools/url-config';

// @ts-ignore
const { authToolsDefault = {} } = window.jusdaBaseConfig;
interface ConfigProps {
    clientId: string;
    getAuthUrl: string;
    authToolsDefault: object;
}


const authSwitchConfig = (clientId):  ConfigProps => {
    return {
        clientId,
        getAuthUrl: `${mpApiUrl}/usercenter-service/common-enabled-features`,
        ...authToolsDefault,
    };
};

export default authSwitchConfig;

