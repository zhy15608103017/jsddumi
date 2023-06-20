import CookieTools from './cookieTools';
import { JUSDATOKEN } from './baseTypes';

export const tokenFn = {
    getToken: () => {
        return new CookieTools().get(JUSDATOKEN);
    },
    setToken: async (token:any) => {
        return new CookieTools().set({
            key: JUSDATOKEN,
            value: token,
        });
    },
};
