import request from '../utils/request';

const ShipmentBase =  '/juslink-shipment-valuation-service';

export function getValuate(params): Promise<any> {
    return request(`${ShipmentBase}/valuation-products/valuate`, {
        method: 'post',
        data: params,
    });
}

const BasePath = '/master-data-management';


// 条件查询集装箱尺寸类型
export function searchContainerSize(data: {generalCodeIn: string[]}): Promise<any>{
    return request(
        `${BasePath}/container-sizes/page`,{
            method:'POST',
            data
        }
    );
}

// 查询车辆种类
export function searchTruckCategories(data: {
    localeCodeEq: string;
    generalCodeIn: string[];
}): Promise<any>{
    return request(
        `${BasePath}/truck-groups/page`,{
            method:'POST',
            data
        }
    );
}

// 查询车辆类型
export function searchTruckSize(data: {
    localeCodeEq: string;
    generalCodeIn: string[];
}): Promise<any>{
    return request(
        `${BasePath}/truck-types/page`,{
            method:'POST',
            data
        }
    );
}