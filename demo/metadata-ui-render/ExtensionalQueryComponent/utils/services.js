import request from '@jusda-tools/web-api-client';

export async function fetchBusinessData(payload) {
    const { page, size, sort, ...data } = payload;
    return request('/juslink-common-metadata-example/business-order/search', {
        method: 'post',
        data,
        params: { page, size, sort },
    });
}
