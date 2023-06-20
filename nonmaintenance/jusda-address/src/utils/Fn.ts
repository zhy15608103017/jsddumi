/* eslint-disable @typescript-eslint/explicit-function-return-type */
let _debounceTimeout: any = null,
    _throttleRunning = false;

/**
 * 防抖 
 * @param {Function} 执行函数
 * @param {Number} delay 延时ms
 */
export const debounce = (fn: Function, delay = 500) => {
    clearTimeout(_debounceTimeout);
    _debounceTimeout = setTimeout(() => {
        fn();
    }, delay);
};
/**
 * 节流
 * @param {Function} 执行函数
 * @param {Number} delay 延时ms
 */
export const throttle = (fn: Function, delay = 500) => {
    if (_throttleRunning) {
        return;
    }
    _throttleRunning = true;
    fn();
    setTimeout(() => {
        _throttleRunning = false;
    }, delay);
};
export const RegExpStr = {
    integer: /^[1-9][0-9]{0,29}$/,
    floatFour: /^([1-9][0-9]{0,29}(\.[0-9]{1,4})?|0\.(?!0+$)[0-9]{1,4})$/,
    // notChinese: /[\\u4E00-\\u9FFF]+/g
    notChinese: /[\u4e00-\u9fa5]/g,
    isEmail: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
};

export const transformAddAddressFormData = (values: any = {}) => {
    const { tag } = values;
    const isShipperAndConsignee = tag.some(
        (item: any) => item === 'shipperAddressAndConsigneeAddress',
    );
    const internationalShareData = tag.some(
        (item: any) => item === 'international',
    );
    const internationalShare = internationalShareData && isShipperAndConsignee;
    const deleteKey = [
        'addressDetail',
        'cascadeCode',
        'cascadeName',
        'transportLocationCode',
        'tag',
    ];
    const {
        addressDetail,
        cascadeCode = [],
        cascadeName = [],
        location = { longitude: '', latitude: '' },
        houseNumber,
        transportLocationCode,
        postCode
    } = values;
  
    // 国家省市区code
    const countryCode = cascadeCode?.[0] || undefined;
    const provinceCode = cascadeCode?.[1] || undefined;
    const cityCode = cascadeCode?.[2] || undefined;
    const districtCode = cascadeCode?.[3] || undefined;
    // 国家省市区name
    const countryName = cascadeName?.[0] || undefined;
    const provinceName = cascadeName?.[1] || undefined;
    const cityName = cascadeName?.[2] || undefined;
    const districtName = cascadeName?.[3] || undefined;

    const address = {
        addressDetail,
        countryCode,
        provinceCode,
        cityCode,
        districtCode,
        countryName,
        provinceName,
        cityName,
        districtName,
        location,
        houseNumber,
        transportLocationCode,
        postCode
    };
    const data = { ...values, address, internationalShare };
    
    deleteKey.forEach((item: string) => delete data[item]);

    return data;
};

export const transformCascadeData = (values: any = {}) => {
    const {
        countryCode = '',
        countryName = '',
        provinceCode = '',
        provinceName = '',
        cityCode = '',
        cityName = '',
        districtCode = '',
        districtName = '',
    } = values || {};
    const cascadeCode = [countryCode, provinceCode, cityCode, districtCode];
    const cascadeName = [countryName, provinceName, cityName, districtName];
    return {
        cascadeCode: cascadeCode || ['', '', '', ''],
        cascadeName: cascadeName || ['', '', '', ''],
    };
};

export const intermediateOldInterfaceConversion = (code: string | boolean) => {
    if (code === '00000') {
        return true;
    }
    return false;
};

// select前端模糊搜索..
export const filterOption = (value: string, option: any) => {
    if (
    //下拉框筛选优化
        JSON.stringify(option?.children)
            .toUpperCase()
            .indexOf(value.toUpperCase()) > 0
    ) {
        return true;
    } else return false;
};
