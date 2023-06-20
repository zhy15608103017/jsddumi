import * as Api from '../Api/index';
import { message } from 'antd';
import { addressIntl } from '../Intl';
import { types, ContentInterface } from '../types/index';

const { address, basic } = addressIntl;
// @ts-ignore
const addressFn = (
    showType: any,
    modalOkType: any,
    modalValue: any,
    addressConfig: ContentInterface,
    modalHandleOk: Function,
    isInternationalPartner: boolean
) => (data: Record<string, any>, cb?: Function) => {
    const newData = data; //传进来的参数dfbdfh
    if (showType === 'edit' && modalOkType === 'ADDADDRESS') {
    //编辑提货地址和收货地址
        Api?.editDeliveryAddress({ ...newData })?.then((res: any) => {
            if (res) {
                if (res.code === '00000') {
                    message.success(address.success);
                    modalHandleOk?.({
                        contactPartnerAddressId: res?.result?.id,
                        contactPartnerId: newData?.contactPartnerId,
                        ...addressConfig,
                        addressAbbreviation: modalValue?.addressAbbreviation,
                    }); //将ID抛出
                    // form.resetFields();
                    cb && cb();
                } else {
                    if (basic[`basic.errorCode.${res?.code}`]) {
                        message.error(basic[`basic.errorCode.${res?.code}`]);
                    } else {
                        message.error(basic['api.F.Unknown error']);
                    }
                }
                setTimeout(() => {
                    message.destroy();
                }, 3000);
            }
        });
    } else if (showType === 'edit') {
        Api?.editPartnerInfo({ ...newData }).then((res: any) => {
            //编辑
            if (res) {
                if (res.code === '00000') {
                    message.success(address.success);
                    setTimeout(() => {
                        modalHandleOk?.({
                            contactPartnerId: res?.result?.id,
                            ...addressConfig,
                            ...newData,
                            addressAbbreviation: modalValue?.addressAbbreviation,
                            detail: {
                                ...newData,
                            },
                        }); //将ID抛出
                    }, 100);
                    // form.resetFields();
                    cb && cb();
                } else {
                    if (basic[`basic.errorCode.${res?.code}`]) {
                        message.error(basic[`basic.errorCode.${res?.code}`]);
                    } else {
                        message.error(basic['api.F.Unknown error']);
                    }
                }
                setTimeout(() => {
                    message.destroy();
                }, 3000);
            }
        });
    } else if (modalOkType === 'ADDADDRESS') {
    //再拿到所有数据后 再进行新增
        Api?.addPartnerContactAddress({ ...newData }).then((res: any) => {
            if (res) {
                if (res.code === '00000') {
                    message.success(address.success);
                    modalHandleOk?.({
                        contactPartnerAddressId: res?.result?.id,
                        ...addressConfig,
                        addressAbbreviation: modalValue?.addressAbbreviation,
                        contactPartnerId: newData?.contactPartnerId,
                        item: {
                            ctCode: res?.result?.id,
                            ctDescribe: newData.addressAbbreviation,
                        },
                        detail: {
                            ...newData,
                            contactPartnerAddressId: res?.result?.id,
                        },
                        isAdd: true, //是否为新增的参数
                    }); //将ID抛出
                    // form.resetFields();
                    cb && cb();
                } else {
                    if (basic[`basic.errorCode.${res?.code}`]) {
                        message.error(basic[`basic.errorCode.${res?.code}`]);
                    } else {
                        message.error(basic['api.F.Unknown error']);
                    }
                }
                setTimeout(() => {
                    message.destroy();
                }, 3000);
            }
        });
    } else {
    //新增合伙人
        modalHandleOk({ ...addressConfig });
        Api?.addShipper({ ...newData }).then((res: any) => {
            if (res) {
                if (res.code === '00000') {
                    message.success(address.success);
                    modalHandleOk?.({
                        ...addressConfig,
                        addressAbbreviation: modalValue?.addressAbbreviation,
                        contactPartnerId: res?.result?.id,
                        item: {
                            ctCode: res?.result?.id,
                            ctDescribe: newData.contactPartnerName,
                        },
                        detail: {
                            ...newData,
                            contactPartnerId: res?.result?.id,
                        },
                        isAdd: true, //是否为新增的参数 为了触发回写时新增查询详情的逻辑
                    }); //将ID抛出
                    // form.resetFields();
                    cb && cb();
                } else {
                    if (basic[`basic.errorCode.${res?.code}`]) {
                        message.error(basic[`basic.errorCode.${res?.code}`]);
                    } else {
                        message.error(basic['api.F.Unknown error']);
                    }
                }
                setTimeout(() => {
                    message.destroy();
                }, 3000);
            }
        });
    }
};
export default addressFn;

//新增合伙人
export const addShipperFn = ({
    modalValue,
    addressConfig,
    modalHandleOk,
}: {
    modalValue: Record<string, any>;
    addressConfig: ContentInterface;
    modalHandleOk: Function;
    isInternationalPartner?: boolean;
}) => (newData: Record<string, any>, cb?: Function) => {

    // console.log('走一波新增')
    modalHandleOk({ ...addressConfig });
    Api?.addShipper({ ...newData }).then((res: any) => {
        if (res) {
            if (res.code === '00000') {
                message.success(address.success);
                // console.log("新增params>>>11111111modalOK", res);
                modalHandleOk?.({
                    ...addressConfig,
                    addressAbbreviation: modalValue?.addressAbbreviation,
                    contactPartnerId: res?.result?.id,
                    item: {
                        ctCode: res?.result?.id,
                        ctDescribe: newData.contactPartnerName,
                    },
                    detail: {
                        ...newData,
                        contactPartnerId: res?.result?.id,
                    },
                    isAdd: true, //是否为新增的参数 为了触发回写时新增查询详情的逻辑
                }); //将ID抛出
                // form.resetFields();
                cb && cb();
            } else {
                if (basic[`basic.errorCode.${res?.code}`]) {
                    message.error(basic[`basic.errorCode.${res?.code}`]);
                } else {
                    message.error(basic['api.F.Unknown error']);
                }
            }
            setTimeout(() => {
                message.destroy();
            }, 3000);
        }
    });
};

// 编辑合伙人
export const editShipperFn = ({
    modalValue,
    addressConfig,
    modalHandleOk,
}: {
    modalValue: any;
    addressConfig: ContentInterface;
    modalHandleOk: Function;
    isInternationalPartner?: boolean;
}) => (newData: Record<string, any>, cb?: Function) => {
    // console.log('走一波编辑')
    Api?.editPartnerInfo({ ...newData }).then((res: any) => {
    //编辑
        if (res) {
            if (res.code === '00000') {
                message.success(address.success);
                setTimeout(() => {
                    modalHandleOk?.({
                        contactPartnerId: res?.result?.id,
                        ...addressConfig,
                        ...newData,
                        addressAbbreviation: modalValue?.addressAbbreviation,
                        detail: {
                            ...newData,
                        },
                    }); //将ID抛出
                }, 100);
                // form.resetFields();
                cb && cb();
            } else {
                if (basic[`basic.errorCode.${res?.code}`]) {
                    message.error(basic[`basic.errorCode.${res?.code}`]);
                } else {
                    message.error(basic['api.F.Unknown error']);
                }
            }

            setTimeout(() => {
                message.destroy();
            }, 3000);
        }
    });
};

// 新增地址
export const addAddressFn = ({
    modalValue,
    addressConfig,
    modalHandleOk,
}: {
    modalValue: any;
    addressConfig: ContentInterface;
    modalHandleOk: Function;
    isInternationalPartner?: boolean;
}) => (newData: Record<string, any>, cb?: Function) => {
    //再拿到所有数据后 再进行新增
    Api?.addPartnerContactAddress({ ...newData }).then((res: any) => {
        if (res) {
            if (res.code === '00000') {
                message.success(address.success);
                modalHandleOk?.({
                    contactPartnerAddressId: res?.result?.id,
                    ...addressConfig,
                    addressAbbreviation: modalValue?.addressAbbreviation,
                    contactPartnerId: newData?.contactPartnerId,
                    item: {
                        ctCode: res?.result?.id,
                        ctDescribe: newData.addressAbbreviation,
                    },
                    detail: {
                        ...newData,
                        contactPartnerAddressId: res?.result?.id,
                    },
                    isAdd: true, //是否为新增的参数
                }); //将ID抛出
                // form.resetFields();
                cb && cb();
            } else {
                if (basic[`basic.errorCode.${res?.code}`]) {
                    message.error(basic[`basic.errorCode.${res?.code}`]);
                } else {
                    message.error(basic['api.F.Unknown error']);
                }
            }
            setTimeout(() => {
                message.destroy();
            }, 3000);
        }
    });
};

// 编辑合伙人
export const editAddressFn = ({
    modalValue,
    addressConfig,
    modalHandleOk,
}: {
    modalValue: any;
    addressConfig: ContentInterface;
    modalHandleOk: Function;
    isInternationalPartner?: boolean;
}) => (newData: Record<string, any>, cb?: Function) => {
    //编辑提货地址和收货地址
    Api?.editDeliveryAddress({ ...newData })?.then((res: any) => {
    // console.log("modalValue>>>", modalValue);
        if (res) {
            if (res.code === '00000') {
                message.success(address.success);
                modalHandleOk?.({
                    contactPartnerAddressId: res?.result?.id,
                    contactPartnerId: newData?.contactPartnerId,
                    ...addressConfig,
                    addressAbbreviation: modalValue?.addressAbbreviation,
                }); //将ID抛出
                // form.resetFields();
                cb && cb();
            } else {
                if (basic[`basic.errorCode.${res?.code}`]) {
                    message.error(basic[`basic.errorCode.${res?.code}`]);
                } else {
                    message.error(basic['api.F.Unknown error']);
                }
            }
            setTimeout(() => {
                message.destroy();
            }, 3000);
        }
    });
};