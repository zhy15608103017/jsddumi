
import { API } from './api';
import request from './utils/request';
import { ObtainBasicDataThroughTypesProps, UniformRequestProps } from "./type"
export const jusdaBasicDataService = '/master-data-management';
export const jusdaBasicAddressService = '/master-data-management/open';
export const jusdaBasicPermissionDataService = '/juslink-common-data-permission-bff';
export const jusdaBasic = '/jusda-basic';



const _window = window as any;
export const uniformRequest = async (props: ObtainBasicDataThroughTypesProps) => {

    const defaultTenantCode = _window?.jusdaUserInfo?.data?.userIdentity?.tenant?.tenantCode
    const {
        type,
        page = 0,
        size = 10,
        tenantCodeEq = defaultTenantCode,
        sort = { sortField: '', order: '' },
        ...other
    } = props;
    const newSort = sort?.sortField && sort?.order ? `&sort=${sort?.sortField},${sort?.order}` : ''
    const response = await request(`/tenants/me${API[type].path}/page?page=${page}&size=${size}${newSort}`, {
        method: 'POST',
        data: { tenantCode: tenantCodeEq || defaultTenantCode, ...other, },
        prefix: jusdaBasicDataService,
    });
    const countriesArr = response?.data?.content?.map((item: any) => {
        return {
            ...item,
            value: item?.code,
            label: item?.name,

        };
    })
    const totalPages = response?.data?.totalPages
    return { countriesArr, totalPages }
}

export const obtainBasicDataThroughTypes = async (props: ObtainBasicDataThroughTypesProps) => {
    const defaultTenantCode = _window?.jusdaUserInfo?.data?.userIdentity?.tenant?.tenantCode
    const {
        type,
        page = 0,
        size = 10,
        tenantCodeEq = defaultTenantCode,
        sort = { sortField: '', order: '' },
        ...other
    } = props;
    const newSort = sort?.sortField && sort?.order ? `&sort=${sort?.sortField},${sort?.order}` : ''

    const response = await request(`/tenants/me${API[type].path}/page?page=${page}&size=${size}${newSort}`, {
        method: 'POST',
        data: { tenantCode: tenantCodeEq || defaultTenantCode, ...other, },
        prefix: jusdaBasicDataService,
    });
    const options = response?.data?.content?.map((item: any) => {
        return {
            ...item,
            value: item?.generalCode,
            label: item?.name,

        };
    })

    const result = {
        ...response?.data,
        options
    }

    return result
}





