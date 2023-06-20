const {
    cfgType,
    envType,
    root_domain: config_root_domain,
  } = window.jusdaBaseConfig || {};
  
const default_root_domain = `.jus-link.com`;
const default_envType = 'dev';

export const getEnvType = () => {
    if(envType?.toLocaleLowerCase() === 'prod' || cfgType?.toLocaleLowerCase() === 'prod') return '';
    return envType?.toLocaleLowerCase() || cfgType?.toLocaleLowerCase() || default_envType;
};

export const getRootDomain = () => { 
    return config_root_domain || default_root_domain ;
};
