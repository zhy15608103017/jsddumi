/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ReactNode } from 'react';
import React, { useState, useEffect } from 'react';
import './index.less';

const Translate = ({
    positiveNode = null,
    reverseNode = null,
    show = true
}: {
    positiveNode: ReactNode;
    reverseNode: ReactNode;
    show: boolean;
}) => {
    const [showBox, setShowBox] = useState(true);
    const isShow = (props: boolean) => {
        return props ? 'show-node' : '';
    };
    useEffect(() => {
        setTimeout(() => {
            setShowBox(show);
        }, 100);
    }, [show]);

    return (
        <div className={`translate-container ${!show && 'is-transform'} `}>
            <div className={`translate-positive-container ${isShow(showBox)}`}>
                {positiveNode}
            </div>
            <div className={`translate-reverse-container ${isShow(!showBox)}`}>
                {reverseNode}
            </div>
        </div>
    );
};

export default Translate;
