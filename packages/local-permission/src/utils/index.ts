/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/camelcase */

function getEnvType (envType = '',cfgType = '') {
    if(envType.toLocaleLowerCase() === 'prod' || cfgType.toLocaleLowerCase() === 'prod') return 'www';
    return envType.toLocaleLowerCase() || cfgType.toLocaleLowerCase() || 'www';
}

function getIntranetEnvType (envType = '',cfgType = '') {
    if(envType.toLocaleLowerCase() === 'prod' || cfgType.toLocaleLowerCase() === 'prod') return '';
    return envType.toLocaleLowerCase() || cfgType.toLocaleLowerCase() || ''; // foxconn内网只存在uat和生产
}

function getApiUrl(){
    // @ts-ignore
    const { cfgType, envType } = window.jusdaBaseConfig || {};
    const urlPrefix = getEnvType(envType,cfgType);
    return `https://${urlPrefix}.jus-link.com/country_code/`;
}

function getIntranetApiUrl(){
    // @ts-ignore
    const { cfgType, envType, root_domain='.foxconn.com' } = window.jusdaBaseConfig || {};
    const urlPrefix = getIntranetEnvType(envType,cfgType);
    return `https://juslink${urlPrefix}${root_domain}/country_code/`;
}

export {
    getEnvType,
    getIntranetEnvType,
    getApiUrl,
    getIntranetApiUrl
};