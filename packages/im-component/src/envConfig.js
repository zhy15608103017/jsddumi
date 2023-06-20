import { mpApiUrl, mp_domain_prefix } from '@jusda-tools/url-config';

function getCfgTypeUrl(){
    const { jusdaBaseConfig: { cfgType  } = {cfgType: 'dev' }} = window;
    const uatCfgType = ['dev','sit'];
    let jusLinkInfoUrl = 'https://mpuat.jus-link.com';
    if(!uatCfgType.includes(cfgType)){
        jusLinkInfoUrl = mp_domain_prefix;
    }
    return {
        clientId: 'IM',
        imApiUrl: `${mpApiUrl}/im-service`,
        imRedirectUrl: `${mp_domain_prefix}/im/#/`,
        jusLinkInfoUrl
    };
}

export default getCfgTypeUrl;
