import request from '@jusda-tools/web-api-client';
import getCfgTypeUrl from '../envConfig.js';
const config = getCfgTypeUrl();

// 发送业务数据至后端服务
async function sendBusinessData(data, userId) {
    const { imApiUrl } = config;
    const params = { 
        businessData: JSON.stringify(data) || null,
        toUserId: userId,
    };
    const result = await request.post(`${imApiUrl}/dialog/sendBusinessDataToDialog`, { data : { ...params } });
    return result;
}

// 发送业务数据至后端服务群聊模式
async function sendBusinessDataGroup(data) {
    const { imApiUrl } = config;
    const params = { 
        businessData: JSON.stringify(data) || null,
        chatType: 'TEAM',
    };
    const result = await request.post(`${imApiUrl}/dialog`, { data : { ...params } });
    return result;
}

// 通过groupId获取业务数据
async function getBusinessData(groupId) {
    const { imApiUrl } = config;
    const result = await request.get(`${imApiUrl}/dialog/getGroupChatDialogInfo/${groupId}`);
    return result;
}


// 更新业务数据
async function updateBusinessData(params) {
    const { imApiUrl } = config;
    const result = await request.put(`${imApiUrl}/dialog/update`, { data : { ...params } });
    return result;
}

export default {
    sendBusinessData,
    updateBusinessData,
    getBusinessData,
    sendBusinessDataGroup
};
