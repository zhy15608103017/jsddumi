// 判断是否是对象或者数组
export function isObject(obj): boolean {
    return typeof obj === 'object' && obj !== null;
}
export function isEqual (obj1, obj2): boolean {
    // 参数有一个不是对象 直接判断值是否相等就行
    if (!isObject(obj1) || !isObject(obj2)) {
        return obj1 === obj2;
    }
    // 如果两个数都是数组或者对象
    // 1. 先比较keys的个数，如果个数不相同 直接就不想等了
    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);
    if (obj1Keys.length !== obj2Keys.length) {
        return false;
    }
    // 如果个数相同再以obj1为基准 和 obj2依次递归比较
    // for...in 适用于对象，也适用于数组
    for (let key in obj1) {
        const res = isEqual(obj1[key], obj2[key]);
        if (!res) {
            return false;
        }
    }
    return true;
}

// 接口更换 ，声明类型映射
export enum areaType {
    subdivision = 'administrativeAreaLevel1',
    city = 'administrativeAreaLevel2',
    county = 'administrativeAreaLevel3'
}

export function getInterfaceUrl(code?: string) {
    let api = '';
    if (code === 'country') {
        return  api = 'master-data-management/countries/page?page=0&size=1000000';
    } else {
        return  api = 'master-data-management/administrative-areas/page?page=0&size=1000000';
    }
    // switch (code) {
    //     case 'country':
    //         api = 'master-data-management/countries/page?page=0&size=1000000';
    //         break;
    //     case 'subdivision':
    //         api = 'master-data-management/administrative-areas/page?page=0&size=1000000';
    //         break;
    //     case 'city':
    //         api = 'master-data-management/administrative-areas/page?page=0&size=1000000';
    //         break;
    //     case 'county':
    //         api = 'master-data-management/administrative-areas/page?page=0&size=1000000';
    //         break;
    //     default:
    //         break;
    // }
}
