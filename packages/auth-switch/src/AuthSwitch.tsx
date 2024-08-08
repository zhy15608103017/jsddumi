/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';

declare global {
    interface Window {
        jusdaBaseConfig: any;
    }
}

export function authorizedSwitch(authCode: string) {
    const auths = JSON.parse(sessionStorage.getItem('authswitch-list'));

    const disableFunctions = window.jusdaBaseConfig && window.jusdaBaseConfig.disableFunctions;
    const enableFunctions = window.jusdaBaseConfig && window.jusdaBaseConfig.enableFunctions;

    if (disableFunctions && disableFunctions.includes(authCode)) {
        return false;
    }

    if (enableFunctions && enableFunctions.includes(authCode)) {
        return true;
    }

    return Array.isArray(auths) && auths.find(item => item === authCode);
}

interface AuthorizedWrapProps {
    authCode: string;
}

export default function AuthorizedSwitchWrap(props: React.PropsWithChildren<AuthorizedWrapProps>): React.ReactNode {
    const { authCode, children } = props;
    const isAuth = authorizedSwitch(authCode);
    if (isAuth) return children;
    return null;
}
