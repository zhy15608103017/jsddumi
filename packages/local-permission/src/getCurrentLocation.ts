/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/camelcase */
import { getApiUrl, getIntranetApiUrl } from './utils/index';

export default function getCurrentLocation() {
    // @ts-ignore
    const { isIntranet } = window.jusdaBaseConfig;
    const apiUrl = isIntranet ? getIntranetApiUrl() : getApiUrl();

    return fetch(apiUrl)
        .then(response => {
            // 检查响应状态
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // 解析响应数据为 JSON 格式
            return response.json();
        })
        .then(data => {
            // 返回接口数据
            return data;
        })
        .catch(error => {
            // 捕获并处理错误
            console.error(`api ${apiUrl} catch:`, error);
            throw error; // 将错误抛出以便调用者处理
        });
}