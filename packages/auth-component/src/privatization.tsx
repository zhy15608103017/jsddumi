/* eslint-disable @typescript-eslint/explicit-function-return-type */

import React from 'react';

function isPrivatization() {
    // @ts-ignore
    const { isPrivatization } = window.jusdaBaseConfig || {};
    return isPrivatization;
}
interface IsPrivatizationWrapProps {
    authCode: string;
}

function IsPrivatizationWrap(
    props: React.PropsWithChildren<IsPrivatizationWrapProps>,
): React.ReactNode {
    // @ts-ignore
    const { isPrivatization } = window.jusdaBaseConfig || {};
    const { children } = props;
    if (!isPrivatization) return children;
    return null;
}

export { isPrivatization, IsPrivatizationWrap };
