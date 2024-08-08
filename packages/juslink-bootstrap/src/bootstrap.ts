/* eslint-disable @typescript-eslint/explicit-function-return-type */
import authComponent from '@jusda-tools/auth-component';
import authSwitch from '@jusda-tools/auth-switch';

const { getAuthList } = authComponent;
const { getAuthSwitchList } = authSwitch;

export const juslinkBootstrap = async () => { 
    try {
        await getAuthList();
        await getAuthSwitchList();
    } catch (error) {
        console.log('error: ', error);
    }
};