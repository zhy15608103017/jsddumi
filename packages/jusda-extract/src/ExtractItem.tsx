/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useRef } from 'react';

export const ExtractItem = (Component: any, props: any = {}) => {
    const ref = useRef(null);
    
    // 直接渲染Component组件
    let isComponent = typeof Component?.type?.render === 'function';
    
    return isComponent ? <Component.type ref={ref} ></Component.type> : <Component ref={ref} {...props} /> ;
};