import { addressIntl } from '../Intl/index';
import { types, ContentInterface } from '../types/index';
const { address } = addressIntl;

const shipperIcon = require('../assets/icon/icon_shipper.png');
const consigneeIcon = require('../assets/icon/icon_consignee.png');
const notifyIcon = require('../assets/icon/icon_notifyParty.png');
const consignorIcon = require('../assets/icon/icon_entrustedParty.png');

const PickupAddressIcon = require('../assets/icon/icon_shipper.png');
const DeliveryAddressIcon = require('../assets/icon/icon_consignee.png');

const ShippingAddressIcon = require('../assets/icon/icon_shippingAddress.png');
const ReceivingAddressIcon = require('../assets/icon/icon_receivingAddress.png');

const SHIPPER: ContentInterface = {
    label: address.shipper,
    name: 'shipper',
    title: 'shipper', //redux的名字与该值的名字
    enumeration: 'SHIPPER', //枚举的type类型
    partNerTitle: address.shipper, //模态框相关文字
    ctDescribe: 'contactPartnerName', //select选择后的描述
    ctCode: 'contactPartnerId', //select选择后拿到的ID
    ctAbbreviation: 'addressAbbreviation',
    ctAddressCode: 'addressCode',
    showCode: false, //是否展示code码
    selfName: 'shipperId', //自身传输的ID
    isAddAble: true,
    icon: shipperIcon,
};

const CONSIGNEE: ContentInterface = {
    label: address.consignee,
    name: 'consignee',
    title: 'consignee',
    enumeration: 'CONSIGNEE',
    partNerTitle: address.consignee,
    ctDescribe: 'contactPartnerName',
    ctCode: 'contactPartnerId',
    ctAbbreviation: 'addressAbbreviation',
    ctAddressCode: 'addressCode',
    showCode: false,
    selfName: 'consigneeId',
    isAddAble: true,
    icon: consigneeIcon,
};

const NOTIFY_PARTY: ContentInterface = {
    label: address.notify,
    name: 'notifyParty',
    title: 'notify_party',
    enumeration: 'NOTIFY_PARTY',
    partNerTitle: address.notify,
    ctDescribe: 'contactPartnerName',
    ctCode: 'contactPartnerId',
    ctAbbreviation: 'addressAbbreviation',
    ctAddressCode: 'addressCode',
    showCode: false,
    selfName: 'notifyPartId',
    isAddAble: true,
    icon: notifyIcon,
};

const CONSIGNOR: ContentInterface = {
    label: address.consignor,
    name: 'entrustedParty',
    title: 'entrusted',
    enumeration: 'CONSIGNOR',
    partNerTitle: address.consignor,
    ctDescribe: 'contactPartnerName',
    ctCode: 'contactPartnerId',
    ctAbbreviation: 'addressAbbreviation',
    ctAddressCode: 'addressCode',
    showCode: false,
    selfName: 'notifyPartyId',
    isAddAble: true,
    icon: consignorIcon,
};

const transportLocationCode: any = {
    ctCode: 'id',
    ctDescribe: 'nameLocal',
    enumeration: 'TRANSPORTLOCATIONCODE',
    partNerTitle: '',
    showCode: false,
    label: '',
    name: '',
    title: '',
};

const ADDRESS: ContentInterface = {
    label: '',
    name: '',
    title: '',
    enumeration: 'ADDADDRESS',
    partNerTitle: '',
    ctDescribe: 'addressAbbreviation',
    ctCode: 'contactPartnerAddressId',
    ctAbbreviation: 'addressAbbreviation',
    ctAddressCode: 'addressCode',
    showCode: false,
    selfName: '',
    isAddAble: true,
    icon: {
        shippingAddress: ShippingAddressIcon,
        receivingAddress: ReceivingAddressIcon
    },
};

const contents: Record<types, ContentInterface> = {
    NOTIFY_PARTY,
    CONSIGNEE,
    SHIPPER,
    ADDRESS,
    CONSIGNOR,
    transportLocationCode,
};

export default contents;
