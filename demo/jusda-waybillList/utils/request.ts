import request from '@jusda-tools/web-api-client';
import { currentLanguage } from '@jusda-tools/language-control-panel';
request.interceptors.request.use((url, options: any) => {
    const { headers } = options;
    return {
        options: {
            ...options,
            headers: { ...headers, 'accept-language': currentLanguage() },
        },
    };
  });

export default request