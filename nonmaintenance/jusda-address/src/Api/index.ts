import request from '@jusda-tools/web-api-client';
import { mpApiUrl, mp_domain_prefix } from '@jusda-tools/url-config';

const getCurrentLocaleData = (dataLanguageEnvironment: boolean = false) => {
  const locale: string = localStorage.umi_locale;

  const umiLocale = dataLanguageEnvironment ? 'en-US' : locale;

  return umiLocale || 'zh-CN';
};

request.interceptors.request.use(
  (url: any, options: any) => {
    const { headers, data = {} } = options;
    const { dataLanguageType } = data;
    const temp: Record<string, any> = {};
    const newHeader = {
      ...headers,
      ...temp,
      'accept-language': dataLanguageType,
    };
    const newData = { ...data };
    delete newData.dataLanguageType;

    return {
      url: url,
      options: {
        ...options,
        headers: newHeader,
      },
    };
  },
  { global: false },
);

// 获得区号
async function getAreaCode({ dataLanguageType }: any) {
  return request(`${mpApiUrl}/jusda-basic/international-areas`, {
    method: 'GET',
    data: { dataLanguageType },
  });
}
// 获取行政区域数据
async function getArea(
  parentCode: string,
  path: string,
  { dataLanguageType }: any,
) {
  return request(`${mpApiUrl}/jusda-basic/${parentCode}/${path}`, {
    method: 'GET',
    data: { dataLanguageType },
  });
}

async function getCountries(params: {
  codeIn?: [...any];
  internationalShareEq?: boolean;
  dataLanguageType?: any;
}) {
  const { codeIn, dataLanguageType } = params || {};
  return request(`${mpApiUrl}/jusda-basic/countries/paged-search`, {
    method: 'POST',
    data: {
      countrySearchCondition: {
        codeIn: codeIn?.length ? codeIn : undefined,
        independentFlagEq: true,
      },
      dataLanguageType,
      pageCondition: {
        pageSize: 249,
        pageIndex: 1,
      },
    },
  });
}

// 通过高德地图API模糊查询当前地址信息.
// https://restapi.amap.com/v5/place/text
async function addressQueryInfo(params: any) {
  const { keywords, offset } = params;
  const { jusdaBaseConfig = {} }: any = window;
  // @ts-ignore
  const { isIntranet } = jusdaBaseConfig;
  const keywordsParams = keywords ? `&keywords=${keywords}` : '';
  const offsetParams = offset ? `&offset=${offset}` : '';
  const url = !isIntranet
    ? 'https://restapi.amap.com/v5/place/text'
    : `${mp_domain_prefix}/amap/v5/place/text`;

  return fetch(
    `${url}?key=2b076add4a541c8f4b345132cedaeb03${keywordsParams}${offsetParams}`,
    {
      method: 'GET',
    },
  );
}

//通过区域码获取行政区域
async function getAdministrativeRegion(params: any) {
  const { dataLanguageType } = params || {};
  return request(`${mpApiUrl}/jusda-basic/counties/paged-search`, {
    method: 'POST',
    data: {
      countySearchCondition: {
        externalCodeEq: params?.externalCodeEq,
      },
      dataLanguageType,
    },
  });
}

async function saveAddress(params: any) {
  return request(`${mpApiUrl}/tenant-basic-data-service/contacts`, {
    method: 'POST',
    data: params,
  });
}

// 获取用户常用地址
async function getCommonAddressList(params: {
  contactsCondition: {
    frequentlyUsedEq?: boolean; //是否为常用地址
    companyNameOrContactsNameOrMobileLike?: string | undefined | null; //关键字
    tenantCodeEq?: string; //租户CODiE
    contactAddressIdIn?: any[];
    internationalShareEq?: boolean | any;
    countryCodesIn?: [...any];
  };
  dataLanguageType?: any;
  pagingCondition: {
    pageIndex: number;
    pageSize: number;
  };
}) {
  const { contactsCondition, pagingCondition, dataLanguageType }: any =
    params || {};
  const { countryCodesIn } = contactsCondition || {};
  return request(`${mpApiUrl}/tenant-basic-data-service/contacts/page`, {
    method: 'POST',
    data: {
      pagingCondition,
      contactsCondition: {
        ...contactsCondition,
        countryCodesIn: countryCodesIn?.length ? countryCodesIn : undefined,
      },
      dataLanguageType,
    },
  });
}

// 获取用户详情数据
async function getAddressDetail({ id, dataLanguageType }: any) {
  return request(`${mpApiUrl}/tenant-basic-data-service/contacts/${id}`, {
    method: 'GET',
    data: { dataLanguageType },
  });
}

async function deleteCommonData(params: any) {
  return request(
    `${mpApiUrl}/tenant-basic-data-service/contacts/${params.id}`,
    {
      method: 'DELETE',
    },
  );
}
async function getTransportLocationCode({
  idOrNameOrLocalLike,
  cityCodeEq,
}: {
  idOrNameOrLocalLike?: string;
  cityCodeEq?:string;
}) {
  return request(`${mpApiUrl}/jusda-basic/transport-location/paged-search`, {
    method: 'POST',
    data: {
      transportLocationSearchCondition: {
        idOrNameOrLocalLike:idOrNameOrLocalLike,
        cityCodeEq,
        externalSystemCodeIn: ['UN', 'CARGOWISE'],
        // cityCodeNull: false,
        // typeCodeNotIn: ['TLT_SEA_PORT', 'TLT_AIR_PORT'],
      },
      pageCondition: { pageSize: 500, pageIndex: 1 },
    },
  });
}

export {
  getAreaCode, // 获得区号
  getCountries, // 获取国家
  getArea, // 获取行政区域数据
  addressQueryInfo, //调取高德接口获取模糊地址信息
  getAdministrativeRegion, //通过区域码获取行政区域
  saveAddress, //保存地址信息
  getCommonAddressList, //获取用户的常用地址信息
  getAddressDetail, //获取用户详情数据
  deleteCommonData, //删除常用地址
  getTransportLocationCode, //获取CWS需要的五字码
};
