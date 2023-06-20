/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { getBasicDataIntl } from '@jusda-tools/basic-data-intl';

const testData = {
    data: {
        loadingTypeCode: 'CTM_FTL',
        id: '5097837154845421568',
        demandStatusCode: 'TO_BE_SUBMIT',
        demandStatusName: '未提交',
        shippingInfo: {
            needMultiPickUpAndDelivery: false,
            shipperAddress: {
                id: '5056086224439906304',
                loadingTypeCode: 'CTM_FTL',
                companyName: '海关境外-香港',
                contactsName: '海关境外-港澳台',
                mobileArea: '86',
                mobile: '7777777777777',
                telephoneArea: '86',
                telephone: null,
                email: null,
                address: {
                    location: null,
                    countryCode: 'CN',
                    countryName: '中国',
                    provinceCode: 'CN-91',
                    provinceName: '香港特别行政区',
                    cityCode: 'SCI105830',
                    cityName: '香港',
                    districtCode: 'SCT106176',
                    districtName: '东区',
                    streetCode: null,
                    streetName: null,
                    postCode: null,
                    addressDetail: '详细地址01',
                    houseNumber: null,
                    transportLocationCode: null,
                },
                frequentlyUsed: true,
                internationalShare: false,
                version: '0',
            },
            consigneeAddress: {
                id: '5056084867230240768',
                companyName: '海关境内-国内（不包括港澳台）',
                contactsName: '海关境内-国内（不包括港澳台）',
                mobileArea: '86',
                mobile: '777777777777',
                loadingTypeCode: 'CTM_FTL',
                telephoneArea: '86',
                telephone: null,
                email: '12341556777777777777777777778844474555555@163.com',
                address: {
                    location: null,
                    countryCode: 'CN',
                    countryName: '中国',
                    provinceCode: 'CN-34',
                    provinceName: '安徽省',
                    cityCode: 'SCI105550',
                    cityName: '安庆市',
                    districtCode: 'SCT103929',
                    districtName: '大观区',
                    streetCode: null,
                    streetName: null,
                    postCode: null,
                    addressDetail:
            '详细地址01详细地址01详细地址01详细地址01详细地址01详细地址01详细地址01',
                    houseNumber: null,
                    transportLocationCode: null,
                },
                frequentlyUsed: true,
                internationalShare: false,
                version: '5',
            },
            vehicleInfos: [
                {
                    vehicleTypeCode: 'TKG_CNR',
                    vehicleSpecificationCode: 'TKT_20GP',
                    needCustomsSupervision: true,
                    vehicleQty: '1',
                    containerNos: null,
                    vehicleTypeName: '货柜车',
                    vehicleSpecificationName: '20GP',
                },
            ],
        },
    },
    success: true,
};

const BasicDataIntl = () => {
    getBasicDataIntl(testData, [
        {
            type: 'CONTAINER_MODE',
            code: 'loadingTypeCode',
            nameAfterConversion: 'loadingTypeName',
        },
    ]).then((res: any) => {
        console.log('%c Line:240 🍯 res', 'color:#3f7cff', res);
    });
    return (
        <div>
      打开F12控制台看🍯打印结果,接口通过master-data-management/locales/search可以查阅.
        </div>
    );
};

export default BasicDataIntl;
