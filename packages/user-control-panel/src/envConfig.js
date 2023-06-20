import { mpApiUrl } from '@jusda-tools/url-config';

const {
    clientId,
    UserControlPanelDefault = {},
} = window.jusdaBaseConfig;

const config = {
    clientId,
    identitiesUrl: `${mpApiUrl}/usercenter-service/identities?clientId=${clientId}`,
    loginAsUrl: `${mpApiUrl}/usercenter-service/authentication/login-as/`,
    ...UserControlPanelDefault,
};

export default config;
