// @ts-ignore
import { mpApiUrl } from '@jusda-tools/url-config';

export interface UrlsInterface {
    getShipList: string; // 收发货方列表
    addShipper: string; // 新增收发货方
    editDeliveryAddress: string; // 修改提货地址与收货地址
    editPartnerInfo: string; // 编辑发货方信息
    addPartnerContactAddress: string; // 新增提货地址与收货地址
    getPartnerAddressDetail: (id: string) => string; // 获取合伙人地址详情信息(发货,收货,通知,委托)
    getAddressByPartnerAddressDetail: (id: string) => string; // 获取合伙人地址详情信息的内部地址(发货,收货,通知,委托)
    getAreaCode: string; // 获得区号
    getArea: (parentCode: string, url: string) => string;
    getCountries: string;
    getConsignorAddressDetail: string; // 获取合伙人发货地址详情信息
    getDeliveryAddressOption: string; // 获取提货地址与到货地址下拉数据
    getDeliveryAddressInfo: (id: string) => string; // 查询当前提货、收货地址详情信息
    getTransportLocationCode: any;
    getAdministrativeRegion: string;
}

const urls: UrlsInterface = {
    getShipList: `${mpApiUrl}/tenant-basic-data-service/contact-partner/simple/paged-search`,
    addShipper: `${mpApiUrl}/tenant-basic-data-service/contact-partner/add`,
    editDeliveryAddress: `${mpApiUrl}/tenant-basic-data-service/contact-partner/address/modify`,
    editPartnerInfo: `${mpApiUrl}/tenant-basic-data-service/contact-partner/modify`,
    addPartnerContactAddress: `${mpApiUrl}/tenant-basic-data-service/contact-partner/address/add`,
    getPartnerAddressDetail: (id) =>
        `${mpApiUrl}/tenant-basic-data-service/contact-partner/${id}`,
    getAddressByPartnerAddressDetail: (id) =>
        `${mpApiUrl}/tenant-basic-data-service/contact-partner/${id}/address/detail`,
    getAreaCode: `${mpApiUrl}/jusda-basic/international-areas`,
    getArea: (parentCode, url) => `${mpApiUrl}/jusda-basic/${parentCode}/${url}`,
    getCountries: `${mpApiUrl}/jusda-basic/countries/paged-search`,
    getConsignorAddressDetail: `${mpApiUrl}/tenant-basic-data-service/contact-partner/address/simple/paged-search`,
    getDeliveryAddressOption: `${mpApiUrl}/tenant-basic-data-service/contact-partner/address/simple/paged-search`,
    getDeliveryAddressInfo: (id) =>
        `${mpApiUrl}/tenant-basic-data-service/contact-partner/address/${id}`,
    getTransportLocationCode: `${mpApiUrl}/jusda-basic/transport-location/paged-search`,
    getAdministrativeRegion: `${mpApiUrl}/jusda-basic/counties/paged-search`,
};

export default urls;
