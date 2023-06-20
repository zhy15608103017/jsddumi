import * as React from 'react';

// 角色
export type types =
    | 'SHIPPER' // 发货方
    | 'CONSIGNEE'   // 收货方
    | 'NOTIFY_PARTY'    // 通知方
    | 'CONSIGNOR'   // 委托方
    | 'ADDRESS'     // 提货地址
    | 'transportLocationCode';

//  运输类型
export type ModeType = 
    | 'TPM_ROAD'
    | 'TPM_RAIL'
    | 'TPM_SEA'
    | 'TPM_EXPRESS'
    | 'TPM_AIR'
    | 'TPM_COMBO';

export interface AddressInterface {
    id?: string;
    type: types; //具体收发货人类型
    // formComponent: Function; //antd的form 兼容的方法
    // form: Record<string, any>; //antd的form
    // rules?: Record<string, any>[]; //外部传进来的规则
    value?: any;
    formItemClass?: string; //自定义class
    action?: React.ReactNode; // select框后面自定义的扩展组件
    onChange?: (value: any) => void;
    selectStyle?: React.CSSProperties;
    handleChangeDetail?: Function;
    addressDetail?: Record<string, any>;
    // optionsss?: Record<string, any>;
    headerStyle?: React.CSSProperties; //顶部样式
    isShowDetail?: boolean; //控制是否显示详细地址的参数
    codeEq?: string; // 锁定四级联动里国家的option数据、与邮箱是否必填的参数
    isInternationalPartner?: boolean; //true国际 false国内 
    language: string; //当前语言
    disable?: boolean; // 禁用当前select选择框
    disableToEdit?: boolean; // 是否禁止编辑地址
    addressInfoClass?: string; //下方地址的class
    isShareLocking?: boolean; //是否锁定共享数据
    defaultShare?: boolean; // 是否开启共享按钮为空 默认隐藏
    showShareButton?: boolean; //是否展示共享按钮 默认隐藏
    dataLanguageEnvironment?: boolean; //强制当前数据是英文或者中文(true英文)
}

export interface AddressViewInterface {
    type: types; //具体收发货人类型
    addressDetail: Record<string, any>;
    addressInfoClass?: string; //下方地址的class
}

// 角色详细信息
export interface ContentInterface {
    label: string;
    name: string;
    title: string; //redux的名字与该值的名字
    enumeration: types | '' | 'ADDADDRESS'; //枚举的type类型
    partNerTitle: string; //模态框相关文字
    ctDescribe: string; //select选择后的描述
    ctCode: string; //select选择后拿到的ID
    ctAbbreviation: string; //select选择后展示的地址简称;
    ctAddressCode: string; //select选择后展示的地址代码;
    showCode: boolean; //是否展示code码
    selfName: string; //自身传输的ID
    isAddAble: boolean;
    icon?: any;
}


export interface AddModalParameter {
    Form: Record<string, any>;
    title: string; //标题
    handleSubmit?: Function; //确认后外部执行的函数
    // modalOkType?: string; //该模态框的参数
    showType?: string; //发送请求函数
    modalValue?: Record<string, any>; //该模态框的所有数据
    addressSelectConfig?: ContentInterface; //外层传入的类型,判断是否显示发货人一栏
    visible?: boolean;
    setVisible?: Function;
    codeEq?: string;
    isInternationalPartner?: boolean;
    language?: string;
    showShareButton: boolean;
    disable?: boolean;
    isShareLocking?: boolean;
    defaultShare?: boolean; //内部确认 是否共享按钮值强制为空
    cancelBtn?: React.ReactNode;
    // className?: string;
}
export interface AddressFormItemInterface<T> {
    id?: string;
    type: string; // SHIPPINGADDRESS (发货地址) or RECEIVINGADDRESS (提货地址) 
    // list: [];
    label?: string;
    selectStyle?: React.CSSProperties;
    value?: T;
    size?: string; // default , small
    onChange: (value: T) => void;
    contactPartnerId: string;
    addressInfoStyle?: React.CSSProperties;
    codeEq?: string; // 锁定四级联动国家code 与邮箱是否必填的参数
    version: number;
    isInternationalPartner?: boolean; //是否为国际伙伴
    language?: string;
    disable?: boolean; // 禁用当前select选择框
    disableToEdit?: boolean; //是否禁止编辑地址
    addressInfoClass?: string; //下方地址的class
    isShareLocking?: boolean; //是否锁定共享数据按钮
    showShareButton?: boolean; //是否展示共享数据按钮
    dataLanguageEnvironment?: boolean;
    RandomNumber?: number; // 是否开启验证红框和提示
}

// 表单
export interface AddressFormItemCargosInterface<T> {
    id?: string;
    type: string; // SHIPPINGADDRESS (发货地址) or RECEIVINGADDRESS (提货地址) 
    // list: [];
    label?: string;
    form?: Record<string, any>;
    Form: Record<string, any>;
    selectStyle?: React.CSSProperties;
    value?: T;
    onChange: (value: T) => void;
    contactPartnerId: string;
    addressInfoStyle?: React.CSSProperties;
    codeEq?: string; // 锁定四级联动国家code 与邮箱是否必填的参数
    version: number;
    isInternationalPartner?: boolean; //是否为国际伙伴
    language?: string;
    disable?: boolean; //禁用当前select选择框
    addressInfoClass?: string; //下方地址的class
    isShareLocking?: boolean; //是否锁定共享数据按钮
    showShareButton?: boolean; //是否展示共享数据按钮
    dataLanguageEnvironment?: boolean;
    RandomNumber?: number; // 是否开启验证红框和提示
}

export interface FormItemsInterface<T>  {
    type:  string; // SHIPPINGADDRESS (发货地址) or RECEIVINGADDRESS (提货地址) 
    Form: Record<string, any>;
    form: any;
    title: string; //标题
    contactPartnerId?: string;
    handleSubmit?: Function; //确认后外部执行的函数
    // modalOkType?: string; //该模态框的参数
    showType?: string; //发送请求函数
    modalValue?: T; //该模态框的所有数据
    onChange: (value: T) => void;
    addressSelectConfig?: ContentInterface; //外层传入的类型,判断是否显示发货人一栏
    codeEq?: string; // 锁定四级联动国家code 与邮箱是否必填的参数
    isInternationalPartner?: boolean; //是否为国际伙伴
    language: string; //当前语言
    disable?: boolean; // 禁用当前select选择框
    addressInfoClass?: string; //下方地址的class
    isShareLocking?: boolean; //是否锁定共享数据
    defaultShare?: boolean; // 是否开启默认共享按钮为空
    showShareButton?: boolean; //默认隐藏共享按钮
    cancelBtn?: React.ReactNode;
    isCheck?: boolean; // 是否开启验证红框和提示
    // className?: string;
}