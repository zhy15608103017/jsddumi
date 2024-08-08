import request from './request';
import { mp_login_entrance_url } from '@jusda-tools/url-config';


export function getThirdPartToken(data) {
    return request(`${mp_login_entrance_url}/user-third-part-authorization-tokens`, {
        method: 'POST',
        data,
    });
}
