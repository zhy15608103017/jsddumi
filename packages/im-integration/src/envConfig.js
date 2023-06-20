import { mpApiUrl, mp_domain_prefix } from '@jusda-tools/url-config';

const {
    ImIntegrationDefault = {},
} = window.jusdaBaseConfig;

const config = {
    clientId: 'IM',
    imApiUrl: `${mpApiUrl}/im-service`,
    imRedirectUrl: `${mp_domain_prefix}/im/#/`,
    ...ImIntegrationDefault,
};


export default config;
