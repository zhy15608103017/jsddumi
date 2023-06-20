import request from '@jusda-tools/web-api-client';
import { mpApiUrl } from '@jusda-tools/url-config';
import getCfgTypeUrl from '../envConfig.js';
import { message } from 'antd';
import locales from './../locales';
import {currentLanguage} from '@jusda-tools/language-control-panel';

const config = getCfgTypeUrl();
const configLocales = locales.get(currentLanguage());

async function getFromIMInfo() {
    const { imApiUrl } = config;
    return new Promise((resolve, reject) => {
        request.get(`${imApiUrl}/imUsers/userId`)
            .then(res => {
                if (res && res.success) {
                    resolve(res.data);
                } else {
                    message.error(configLocales.NoUserError);
                    reject();
                }
            })
            .catch(() => {
                reject();
            });
    });
}

async function getIMInfo(userId) {
    const { imApiUrl } = config;
    return new Promise((resolve, reject) => {
        request.post(`${imApiUrl}/imUsers/users`, { data : [ ...userId ] })
            .then(res => {
                if (res && res.success) {
                    resolve(res.data);
                } else {
                    message.error(res.message);
                    reject();
                }
            })
            .catch(() => {
                reject();
            });
    });
}

// 获取crmCode
async function getCrmCode(data) {
    const apiUrl = `${mpApiUrl}/usercenter-service/tenant/code/${data}`;
    return new Promise((resolve, reject) => {
        request.get(apiUrl)
            .then(res => {
                if (res && res.success) {
                    resolve(res.data);
                } else {
                    message.error(res.message);
                    reject();
                }
            })
            .catch(() => {
                reject();
            });
    });
}

// 获取白名单客服工号
async function getWhiteUser() {
    const data = {
        'appIdEq': 'CP_PLATFORM',
        'groupOwner': [{'groupCodeEq': 'DemoNamespace'}],
        'keyLike': '',
        'keysIn': ['im_whitelist','im_customer_service']
    };
    const apiUrl = `${mpApiUrl}/juslink-common-config/config/list`;
    return new Promise((resolve, reject) => {
        request.post(apiUrl, {data})
            .then(res => {
                if (res && res.success) {
                    resolve(res.data);
                } else {
                    message.error(res.message);
                    reject();
                }
            })
            .catch(() => {
                reject();
            });
    });
}

// 通过crmCode、业务编码、orderId获取工号
async function getEmployeeInfo(data) {
    const { jusLinkInfoUrl } = config;
    return new Promise((resolve, reject) => {
        request.get(`${jusLinkInfoUrl}/jusda-business/im/mapping/queryEmployeeNo`, {params: data})
            .then(res => {
                if (res && res.success) {
                    resolve(res.data);
                } else {
                    message.error(res.errorMessages[0]);
                    reject();
                }
            })
            .catch(() => {
                reject();
            });
    });
}

// 通过工号获取userId
async function getUserId(data) {
    const { imApiUrl } = config;
    return new Promise((resolve, reject) => {
        request.post(`${imApiUrl}/addressBook/user`, {data})
            .then(res => {
                if (res && res.success) {
                    resolve(res.data);
                } else {
                    message.error('Failed to get the userId!');
                    reject();
                }
            })
            .catch(() => {
                reject();
            });
    });
}

// 查询业务编码数据
async function getBusinessCode() {
    const { jusLinkInfoUrl } = config;
    return new Promise((resolve, reject) => {
        request.get(`${jusLinkInfoUrl}/jusda-business/im/mapping/queryBusinessCode`)
            .then(res => {
                if (res && res.success) {
                    resolve(res.data);
                } else {
                    message.error(res.errorMessages[0]);
                    reject();
                }
            })
            .catch(() => {
                reject();
            });
    });
}

// 通过crmcode查询业务编码数据
async function getCustomerCode(data) {
    const { jusLinkInfoUrl } = config;
    return new Promise((resolve, reject) => {
        request.get(`${jusLinkInfoUrl}/jusda-business/im/mapping/queryCustomer`, {params: data})
            .then(res => {
                if (res && res.success) {
                    resolve(res.data);
                } else {
                    message.error(res.errorMessages[0]);
                    reject();
                }
            })
            .catch(() => {
                reject();
            });
    });
}

// 判断是否重复创建群组
async function checkGroup(data) {
    const { imApiUrl } = config;
    return new Promise((resolve, reject) => {
        request.post(`${imApiUrl}/group`, {data})
            .then(res => {
                if (res && res.success) {
                    resolve(res);
                } else {
                    message.error(res.message);
                    reject();
                }
            })
            .catch(() => {
                reject();
            });
    });
}

export default {
    getFromIMInfo,
    getIMInfo,
    getCrmCode,
    getEmployeeInfo,
    getBusinessCode,
    getUserId,
    checkGroup,
    getCustomerCode,
    getWhiteUser
};
