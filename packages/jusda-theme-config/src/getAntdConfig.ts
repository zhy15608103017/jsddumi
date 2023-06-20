/* eslint-disable @typescript-eslint/explicit-function-return-type */
// @ts-ignore
import antdv4 from '../utils/antdv4';
// @ts-ignore
import antdv5 from '../utils/antdv5';
export default function getAntdConfig(version: string) {
    return version === 'v5' ? antdv5() : antdv4();
}