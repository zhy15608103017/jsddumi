/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import localPermissionFn from './localPermissionFn';

export default function LocalPermissionWrap(props) {
    const [childrenVisible, setChildrenVisible] = React.useState(false);
    React.useEffect(() => {
        const checkRegistration = async () => {
            const visible = await localPermissionFn();
            setChildrenVisible(visible);
        };
        checkRegistration();
    }, []);
    const { children } = props;
    if (childrenVisible) {
        return children;
    }
    return null;
}
