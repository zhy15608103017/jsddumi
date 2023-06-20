import React from 'react';
import { ImSuspend } from '@jusda-tools/im-component';

const Demo = () => {
    return (
        <ImSuspend
            userId={'4475647155578519552'}
            defaultPosition={{ left: '16px', top: '16px' }}
            isMsgRemind={true}
        />
    )
}

export default Demo;