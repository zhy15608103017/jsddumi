/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import JuslinkHeader from '@jusda-tools/juslink-header';
import FoxconnHeader from '@jusda-tools/foxconn-header';
import { isTms } from '@jusda-tools/business-env-checker';

const Header: React.FC<any> = (props) => {
    return (
        isTms() ? <FoxconnHeader {...props}></FoxconnHeader> :  <JuslinkHeader {...props}></JuslinkHeader>
    );
};

export default Header;
