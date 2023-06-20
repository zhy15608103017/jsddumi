import request from '../util/request';
import { LoadStrategy } from './enums';
const basePath = '/juslink-common-metadata-center';

export async function getUIModal(
    tenantCode: string,
    standardModelCodeEq: string,
) {
    return request(
        `${basePath}/tenant/${tenantCode}/tenant-model-ui/single-language-detail`,
        {
            method: 'post',
            data: {
                standardModelCodeEq,
            },
        },
    );
}

export async function getTenantModelConfiguration(
    tenantCode: string,
    data: {
        standardModelCodeEq: string;
        propertyPathIn: string[];
        propertyLoadStrategyEq: LoadStrategy;
    },
) {
    return request(
        `${basePath}/tenant/${tenantCode}/model/configuration/single-configuration`,
        {
            method: 'post',
            data,
        },
    );
}

export async function getTenantFunctionConfiguration(
    tenantCode: string,
    data: {
        functionCode: string;
    },
) {
    const {functionCode} = data;
    return request(
        `${basePath}/tenant/${tenantCode}/function/${functionCode}/compound-ui`,
        {
            method: 'get',
        },
    );
}
