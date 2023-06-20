import { mpApiUrl } from '@jusda-tools/url-config';

const {
    clientId,
    UserControlPanelDefault = {},
} = window.jusdaBaseConfig;


const config = {
    clientId,
    identitiesUrl: `${mpApiUrl}/usercenter-service/identities?clientId=${clientId}`,
    loginAsUrl: `${mpApiUrl}/usercenter-service/authentication/login-as/`,
    resetPasswordUrl: `${mpApiUrl}/usercenter-service/email/send/reset-password`,
    changePasswordUrl: `${mpApiUrl}/usercenter-service/user/reset/self/password`,
    ...UserControlPanelDefault,
};

export default config;
