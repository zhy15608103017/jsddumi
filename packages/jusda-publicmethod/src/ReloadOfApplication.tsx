/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

// 为了解决.在应用见切换时,清空页面状态.-让组件重新渲染  目前用k改变key的方式.有更好的想法可以提出来.
const ReloadOfApplication = ({
    children,
    urlParams,
}: {
    urlParams?: { key: string };
    children?: any;
}) => {
    return <div key={urlParams?.key}>{children}</div>;
};

export default ReloadOfApplication;
