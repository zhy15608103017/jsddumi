import webApiClient from '@jusda-tools/web-api-client';
import { currentLanguage } from '@jusda-tools/language-control-panel';

const {
    clientId,
} = window.jusdaBaseConfig;

webApiClient.interceptors.request.use((_, options) => {
    const { headers } = options;
    return {
        options: {
            ...options,
            headers: {
                ...headers,
                clientId,
                'accept-language': currentLanguage(),
            },
        },
    };
}, { global: false });

webApiClient.interceptors.response.use(async response => {
    try {
        const data = await response.clone().json();
        return data;
    }
    catch (error) {
        return response;
    }
    // 项目组要是弹出errorCode，需要在request.interceptors.response.use添加{global:false}
}, { global: false });

export default webApiClient;