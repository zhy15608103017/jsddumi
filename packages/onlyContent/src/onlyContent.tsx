import React from 'react';
import { getUrlQuery } from './index';

const OnlyContent: (props: any) => JSX.Element = (props: any) => {
    const { children } = props;
    console.log(window?.location?.href, getUrlQuery(window?.location?.href, 'onlyContent'));
    if (getUrlQuery(window?.location?.href, 'onlyContent') === 'true') {
        return null;
    }
    return children;
};

export default OnlyContent;
