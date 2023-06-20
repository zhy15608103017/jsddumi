import React from 'react';
import Address from '@jusda-tools/jusda-address';

import './index.css';

export default () => {

    return <Address  dataLanguageType="en-US"  type={'SHIPPER'}
        tag={['international', 'shipperAddressAndConsigneeAddress']} shippingMode="TPM_AIR"></Address>;
};
