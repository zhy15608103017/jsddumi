/* eslint-disable @typescript-eslint/explicit-function-return-type */
import CookieTools from './cookieTools';
import { THEMETOKEN } from './baseTypes';

export const themeTokenFn = {
    getToken: () => {
        const token = new CookieTools().get(THEMETOKEN);
        return token ? JSON.parse(token) : token;
    },
    setToken: async (token: any) => {
        return new CookieTools().set({
            key: THEMETOKEN,
            value: token,
        });
    },
};
