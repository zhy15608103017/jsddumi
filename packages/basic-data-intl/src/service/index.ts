/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { masterDataManagement } from '../../constants';
import request from '../../utils/request';

async function getBasicDataIntlFetch(data) {
    const windows: any = window;
    const tenantCode =
    windows?.jusdaUserInfo?.data?.userIdentity?.tenant?.tenantCode;
    const newData = data?.map((item: any) => {
        return {
            codeEq: item?.codeEq,
            typeEq: item?.typeEq,
        };
    });
    return request('/locales/search', {
        method: 'POST',
        data: { typeCodeIn: [...newData], tenantCodeEq: tenantCode },
        prefix: masterDataManagement,
    });
}

export { getBasicDataIntlFetch };
// 获得详情页数据
