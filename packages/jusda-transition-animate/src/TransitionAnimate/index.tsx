/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './index.less';

interface animateProps {
    children?: any;
    locationPath: string;
}

const AnimateComponent = ({ children, locationPath }: animateProps) => {
    return (
        <div className={'animateContainer'}>
            <TransitionGroup>
                <CSSTransition key={locationPath} classNames="fade" timeout={500}>
                    {children}
                </CSSTransition>
            </TransitionGroup>
        </div>
    );
};

export default AnimateComponent;
