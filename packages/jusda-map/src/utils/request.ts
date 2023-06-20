import request from '@jusda-tools/web-api-client';
import { currentLanguage } from '@jusda-tools/language-control-panel';
request.interceptors.request.use((url: any, options: any) => {
    const { headers } = options;
    return {
        options: {
            ...options,
            headers: { ...headers, 'accept-language': currentLanguage(),'Cache-Control':'no-store' },
        },
    };
  });

export default request