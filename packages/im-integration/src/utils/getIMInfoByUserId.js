import request from '@jusda-tools/web-api-client';
import envConfig from '../envConfig.js';

async function getIMInfo(userId) {
    const { imApiUrl } = envConfig;
    const result = await request.post(`${imApiUrl}/imUsers/users`, { data : [ ...userId ] });
    return result;
}

export default {
    getIMInfo
};
