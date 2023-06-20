/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';

declare global {
    interface Window {
        jusdaBaseConfig: any;
    }
}

interface AuthorizedWrapProps {
    authCode: string;
}

export default class AuthClass {
    newClient: string;

    constructor(coverClientId: string) {
        this.newClient = coverClientId;
    }

    authorized(authCode: string) {
        const auths = JSON.parse(sessionStorage.getItem(`auth-list-${this.newClient}`));
    
        const disableFunctions = window.jusdaBaseConfig && window.jusdaBaseConfig.disableFunctions;
        const enableFunctions = window.jusdaBaseConfig && window.jusdaBaseConfig.enableFunctions;
    
        if (disableFunctions && disableFunctions.includes(authCode)) {
            return false;
        }
    
        if (enableFunctions && enableFunctions.includes(authCode)) {
            return true;
        }
    
        return Array.isArray(auths) && auths.find(item => item.code === authCode);
    }

    AuthorizedWrap = (props: React.PropsWithChildren<AuthorizedWrapProps>) => {
        const { authCode, children } = props || {};
        const isAuth = this.authorized(authCode);
        if (isAuth) return children;
        return null;
    }
    
}


