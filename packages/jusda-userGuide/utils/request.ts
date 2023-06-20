import request from '@jusda-tools/web-api-client';
// @ts-ignore
import { getLocale } from './fn.js';
import { currentLanguage } from '@jusda-tools/language-control-panel';
// @ts-ignore
import { mpApiUrl } from '@jusda-tools/url-config';

request.interceptors.request.use(
  (url, options) => {
    // @ts-ignore
    const { headers } = options;
    const language = currentLanguage() || getLocale() || 'en-US';
    return {
      url: mpApiUrl +  url,
      options: {
        ...options,
        headers: {
          ...headers,
          // @ts-ignore
          'accept-language': language,
        },
      },
    };
  },
  { global: false }
);

export default request;