const {
    cfgType,
    apiUrl,
    clientId,
} = window.jusdaBaseConfig;


function getEnvBaseUrl(envType = 'dev') {
    const envMap = {
        dev: envType,
        sit: envType,
        uat: envType,
        beta: envType,
        prod: '',
    };
    return apiUrl || `https://mp${envMap[envType.toLocaleLowerCase()]}.jus-link.com/api`;
}

const envBaseUrl = getEnvBaseUrl(cfgType);

const componentDefaultConfig = {
    cfgType,
    apiUrl,
    clientId,
};

export default getEnvBaseUrl;

export {
    envBaseUrl,
    componentDefaultConfig,
};
