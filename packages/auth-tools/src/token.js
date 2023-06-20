import { CookieTools, JUSDATOKEN } from '@jusda-tools/jusda-publicmethod';

const tokenFn = {
    getToken: () => {
        return new CookieTools().get(JUSDATOKEN);
    },
    setToken: async (token) => {
        return new CookieTools().set({
            key: JUSDATOKEN,
            value: token
        })
    },
}

export {
    tokenFn,
}
