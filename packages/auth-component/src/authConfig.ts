import {mpApiUrl} from '@jusda-tools/url-config';

// @ts-ignore
const { authToolsDefault = {} } = window.jusdaBaseConfig;
interface ConfigProps {
    clientId: string;
    getAuthUrl: string;
    authToolsDefault: object;
}


const authConfig = (clientId):  ConfigProps => {
    return {
        clientId,
        getAuthUrl: `${mpApiUrl}/usercenter-service/user-identity/${clientId}/permission`,
        ...authToolsDefault,
    };
};

export default authConfig;

