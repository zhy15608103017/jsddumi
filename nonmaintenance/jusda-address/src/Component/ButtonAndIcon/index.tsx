import { ReactNode } from 'react';
import React from 'react';
import './index.less';

const ButtonAndIcon = ({
  onClick = () => {},
  icon,
  label,
}: {
  icon: ReactNode;
  onClick?: Function;
  label: string;
}) => {
  return (
    <div onClick={() => onClick()} className="button-icon-container">
      {icon}
      <div className={'button-icon-label'}>{label}</div>
    </div>
  );
};

export default ButtonAndIcon;
