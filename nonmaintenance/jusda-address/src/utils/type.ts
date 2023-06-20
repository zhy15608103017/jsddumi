import { ReactNode } from 'react';

export interface basicModalProps {
  visible: boolean;
  value?:any;
  setVisible: Function;
  initialValues?: any;
  title: string;
  onChange: Function;
  countryCodesIn?: [...any];
  disabledShareInternational?: boolean; // 禁止筛选国际国内共享按钮
  type: 'SHIPPER' | 'CONSIGNEE' | 'NOTIFY';
  dataLanguageType: 'zh-CN' | 'en-US'; //获取数据语言类型
  tag?: [...any];
}

export interface addressProps {
  typeConfiguration?: {
    //传此参数会优先级会高于type数据
    icon: ReactNode;
    name: string; // 标题
    contentName: string;
  }; //自定义文案类型.
  type?: 'SHIPPER' | 'CONSIGNEE' | 'NOTIFY'; //发货方 收发货 通知方.
  required?: boolean;
  value?: any;
  onChange?: Function;
  disabledShareInternational?: boolean; // 禁止筛选国际国内共享按钮
  readOnlyProperty?: boolean; //是否为只读状态.不可操作
  countryCodesIn?: [...any];
  tag?: [...any];
  shippingMode?:string;
  defineTransportLocationRange?: {
    //自定义获取五字码数据范围.
    api: Function; //业务系统提供的接口
    params: { shippingMode: string };
  };
  dataLanguageType: 'zh-CN' | 'en-US'; //获取数据语言类型
  titleCustomButton?: [...(any | ReactNode)];
}

export interface addressModalProps {
  dataLanguageType: 'zh-CN' | 'en-US'; //获取数据语言类型
  disabledShareInternational?: boolean;
  setVisible?: Function;
  title: string;
  setIsPositive: Function;
  setCurrentStatus: Function;
  onChange: Function;
  countryCodesIn?: [...any];
  tag?: [...any];
  shippingMode?:string;

}

export interface addressListDataProps {
  companyName: any;
  contactsName: any;
  id: any;
  frequentlyUsed?: boolean;
  internationalShareEq?: boolean;
  mobile?: undefined;
  mobileArea?: string;
  telephone: any;
  telephoneArea: any;
  address?: {
    addressDetail: string;
    cityCode: string;
    cityName: string;
    countryCode: string;
    countryName: string;
    districtCode: string;
    districtName: string;
    houseNumber: string;
    location: { longitude: string; latitude: string };
    provinceCode: string;
    provinceName: string;
    streetCode: null;
    streetName: null;
  };
}

export type commonAddressProps = {
  setIsPositive: Function;
  setVisible: Function;
  onChange: Function; //FORM的change事件
  addressModalRef: any;
  setCurrentStatus: Function;
  type: 'SHIPPER' | 'CONSIGNEE' | 'NOTIFY';
  countryCodesIn?: [...any]; //筛选国家
  tag?: [...any]; //标签服务
  visible: boolean; //模态框状态
  dataLanguageType?: string;
};

export interface commonAddressListProps {
  companyNameOrContactsNameOrMobileLike?: string | undefined | null;
  frequentlyUsedEq: boolean;
  pageSize?: number;
  pageIndex?: number;
  resetData?: boolean; //是否对数据进行重置
  onChangeInputData?: string;
  countryCodesIn?: [...any]; //筛选国家
  tag?: [...any]; //标签服务
}
