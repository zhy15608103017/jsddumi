---
title: basic-data-intl(获取基础数据名称[国际化])
nav: 组件
toc: content
group: 
  title: JS-SDK
  order: 1
---

<!-- # [action-decorator](https://gitlab.jusdaglobal.com/jusda-ui/jusda-tools/tree/dev-0.0.17/packages/action-decorator) -->
 
# Installation

> 注: 外网需换成外网地址, 并登录 npm

```bash
npm install --save @jusda-tools/basic-data-intl --registry=http://nexus.jusda.int/verdaccio/
```

## getBasicDataIntl(dataSource,dataType);


## Example


<code transform="true" src="../../demo/basic-data-intl/index.tsx"></code>

### 获取基础数据国际化方法调用示例

> action: initialization

```jsx | pure
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
                },]
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
    return <div>打开F12看控制台接口与接口可以看到效果.</div>;
};

export default BasicDataIntl;

```
### 获取基础数据类型地址 https://wiki.jusda.int/pages/viewpage.action?pageId=42339733

<!-- 提取MD -->
### getBasicDataIntl options 参数

| 参数       | 说明                 | 是否必填 | 类型       | 参数示例                                                                                             |
| ---------- | -------------------- | -------- | ---------- | ---------------------------------------------------------------------------------------------------- |
| dataSource | 数据源               | 是       | 对象、数组 | [{code:value} ]                                                                                      |
| config     | 需要获取国际化的配置 | 是       | 数组对象   | [{ code: 需要添加国际化的字段名, type: 该code所属的类型, nameAfterConversion: 添加后的国际化字段名}] |
<!-- end提取MD -->

## 更新日志
###### 1.0.9更新内容:
```base
1.上线获取基础国际化方法.修复了嵌套多层数据时获取数据失效的问题
```
###### 1.0.10更新内容:
```base
1.添加了tenantCode参数. 从window?.jusdaUserInfo?.data?.userIdentity?.tenant?.tenantCode获取.(如果改动需改动组件)
```