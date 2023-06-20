import React from 'react';
import './index.less';
import 'animate.css/animate.css';

interface animateProps {
  children?: any;
  locationPath: string;
}

const AnimateComponent = ({ children, locationPath }: animateProps) => {
  return (
    <div
      className={
        'animateContainer animate__animated animate__faster animate__fadeInUpBig'
      }
      key={locationPath}
    >
      {children}
    </div>
  );
};

export default AnimateComponent;
