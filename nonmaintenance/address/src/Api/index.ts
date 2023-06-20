/* eslint-disable @typescript-eslint/no-non-null-assertion */
import request from '@jusda-tools/web-api-client';
import url from '../utils/urls';

const getCurrentLocaleData = (dataLanguageEnvironment: boolean = false) => {
    const locale: string = localStorage.umi_locale;

    const umiLocale = dataLanguageEnvironment ? 'en-US' : locale;

    return umiLocale || 'zh-CN';
};

request.interceptors.request.use(
    (url: any, options: any) => {
    // @ts-ignore
        const { headers, dataLanguageEnvironment } = options;
        const temp: Record<string, any> = {};

        return {
            url: url,
            options: {
                ...options,
                headers: {
                    ...headers,
                    ...temp,
                    // @ts-ignore
                    'accept-language': getCurrentLocaleData(dataLanguageEnvironment),
                },
            },
        };
    },
    { global: false }
);

async function getShipList (
    type: string,
    codeEq?: string,
    nameLike?: string,
    isInternationalPartner?: boolean
) {
    return request(url!.getShipList, {
        method: 'POST',
        data: {
            contactPartnerCondition: {
                contactPartnerNameOrAddressLike: nameLike || null,
                contactPartnerType: type,
                defaultAddressCountryEq: codeEq || null,
                isInternationalPartner:
          codeEq === 'CN'
              ? isInternationalPartner || null
              : isInternationalPartner,
            },
            pagingCondition: {
                pageIndex: 1,
                pageSize: 100,
            },
        },
    });
}

// 新增收发货方
async function addShipper (params: any) {
    return request(url!.addShipper, {
        method: 'POST',
        data: { ...params, isDefault: true },
    });
}

// 修改提货地址与收货地址
async function editDeliveryAddress (params: any) {
    return request(url!.editDeliveryAddress, {
        method: 'PATCH',
        data: { ...params },
    });
}

// 编辑发货方信息
async function editPartnerInfo (params: any) {
    return request(url!.editPartnerInfo, {
        method: 'PATCH',
        data: {
            contactPartnerId: params?.type,
            ...params,
        },
    });
}

// 新增提货地址与收货地址
async function addPartnerContactAddress (params: any) {
    return request(url!.addPartnerContactAddress, {
        method: 'POST',
        data: { ...params, isDefault: false },
    });
}

// 获取合伙人地址详情信息(发货,收货,通知,委托)
async function getPartnerAddressDetail (params: any) {
    if (params?.id) {
        return request(url!.getPartnerAddressDetail(params?.id), {
            method: 'GET',
            // @ts-ignore
            dataLanguageEnvironment: params?.dataLanguageEnvironment,
        });
    } else {
        console.warn('调取合伙人地址详情时,没有拿到ID');
    }
}

// 获取合伙人地址详情信息的内部地址列表(发货,收货,通知,委托)
async function getAddressByPartnerAddressDetail (params: any) {
    if (params?.id) {
        return request(url!.getAddressByPartnerAddressDetail(params?.id), {
            method: 'GET',
            // @ts-ignore
            dataLanguageEnvironment: params?.dataLanguageEnvironment,
        });
    } else {
        console.warn('调取合伙人地址详情时,没有拿到ID');
    }
}

// 获取合伙人发货地址详情信息
async function getConsignorAddressDetail (params: any) {
    return request(url!.getConsignorAddressDetail, {
        method: 'POST',
        data: {
            contactPartnerCondition: {
                // contactPartnerNameLike: nameLike,
                // contactPartnerType: type,
                contactPartnerId: params?.id,
            },
            pagingCondition: {
                pageIndex: 1,
                pageSize: 100,
            },
        },
    });
}

// 获得区号
async function getAreaCode () {
    return request(url!.getAreaCode, {
        method: 'GET',
    });
}
async function getArea (parentCode: string, path: string) {
    return request(url!.getArea(parentCode, path), {
        method: 'GET',
    });
}

// 获取提货地址与到货地址下拉数据
async function getDeliveryAddressOption (params: any) {
    return request(url!.getDeliveryAddressOption, {
        method: 'POST',
        data: {
            contactPartnerAddressCondition: {
                addressAbbreviationOrCodeLike: params?.nameLike || undefined,
                contactPartnerId: params?.id,
                isDefault: params?.isDefault ? true : undefined,
                addressCountryEq: params?.codeEq,
            },
            pagingCondition: {
                pageIndex: 1,
                pageSize: 100,
            },
        },
        // @ts-ignore
        dataLanguageEnvironment: params?.dataLanguageEnvironment,
    });
}

async function getTransportLocationCode (params: any) {
    return request(url!.getTransportLocationCode, {
        method: 'POST',
        data: {
            transportLocationSearchCondition: {
                idOrNameOrLocalLike: params?.idOrNameOrLocalLike,
                cityCodeEq: params?.cityCodeEq,
                countryCodeEq: params?.codeEq,
                externalSystemCodeIn: ['UN', 'CARGOWISE'],
                cityCodeNull: false,
                typeCodeNotIn: ['TLT_SEA_PORT', 'TLT_AIR_PORT'], //过滤掉空港海港
                // sortConditions: [
                //     {
                //         isAscending: true,
                //         propertyName: 'TLT_AIR_PORT',
                //     },
                //     {
                //         isAscending: true,
                //         propertyName: 'TLT_SEA_PORT',
                //     },
                //     {
                //         isAscending: true,
                //         propertyName: 'id',
                //     },
                // ],
            },
            pageCondition: {
                pageSize: 1000,
                pageIndex: 1,
            },
        },
        // @ts-ignore
        dataLanguageEnvironment: params?.dataLanguageEnvironment,
    });
}

async function getCountries (params: any) {
    return request(url!.getCountries, {
        method: 'POST',
        data: {
            countrySearchCondition: {
                codeEq: params?.codeEq,
                independentFlagEq: true,
            },
            pageCondition: {
                pageSize: 249,
                pageIndex: 1,
            },
        },
    });
}

// 查询当前提货、收货地址详情信息
async function getDeliveryAddressInfo (params: any) {
    return request(url!.getDeliveryAddressInfo(params?.id), {
        method: 'GET',
        // @ts-ignore
        dataLanguageEnvironment: params?.dataLanguageEnvironment,
    });
}

// 通过高德地图API模糊查询当前地址信息.
// https://restapi.amap.com/v5/place/text
async function addressQueryInfo (params: any) {
    const { keywords, offset } = params;
    const { jusdaBaseConfig = {} }: any = window;
    // @ts-ignore
    const { isIntranet, cfgType } = jusdaBaseConfig;
    const newCfgType = cfgType === 'prod' ? '' : cfgType;
    const keywordsParams = keywords ? `&keywords=${keywords}` : '';
    const offsetParams = offset ? `&offset=${offset}` : '';
    const cityLimit = '&city_limit=true';
    const url = !isIntranet
        ? 'https://restapi.amap.com/v5/place/text'
        : `https://mp${newCfgType}.jusdascm.com/amap/v5/place/text`;
    return fetch(
        `${url}?key=2b076add4a541c8f4b345132cedaeb03${keywordsParams}${offsetParams}`,
        {
            method: 'GET',
        }
    );
}

//通过区域码获取行政区域
async function getAdministrativeRegion (params: any) {
    return request(url!.getAdministrativeRegion, {
        method: 'POST',
        data: {
            countySearchCondition: {
                externalCodeEq: params?.externalCodeEq,
            },
        },
        // @ts-ignore
        dataLanguageEnvironment: params?.dataLanguageEnvironment,
    });
}

export {
    getShipList,
    addShipper,
    editDeliveryAddress,
    editPartnerInfo,
    addPartnerContactAddress,
    getPartnerAddressDetail,
    getAddressByPartnerAddressDetail,
    getAreaCode,
    getArea,
    getTransportLocationCode,
    getCountries,
    getConsignorAddressDetail,
    getDeliveryAddressOption,
    getDeliveryAddressInfo,
    addressQueryInfo,
    getAdministrativeRegion, //通过区域码获取行政区域
};
