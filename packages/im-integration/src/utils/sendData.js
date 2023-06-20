import request from '@jusda-tools/web-api-client';
import envConfig from '../envConfig.js';

// 发送业务数据至后端服务
async function sendBusinessData(data, user) {
    const { imApiUrl } = envConfig;
    const params = { 
        businessData: JSON.stringify(data) || null,
        toUserId: user.userId,
    };
    const result = await request.post(`${imApiUrl}/dialog/sendBusinessDataToDialog`, { data : { ...params } });
    return result;
}

export default {
    sendBusinessData,
};
