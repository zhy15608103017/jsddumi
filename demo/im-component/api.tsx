import React from 'react';
import { ImSuspend } from '@jusda-tools/im-component';

export interface IMProps {
    /**
     * Extra CSS className for this component
     * @description.zh-CN 组件额外的 CSS className
     */
    className?: string;
    /**
     * I'm required
     * @description.zh-CN 我是一个必选属性
     */
    type: string;
}

const Demo:React.FC<IMProps> = () => {
    return (
        <ImSuspend
            crmCode={'AMPCNJSZ'} 
            defaltPositon={{ left: '16px', top: '16px' }} 
        />
    )
}

export default Demo;