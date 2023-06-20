/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, {
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle,
} from 'react';
import {
    CloseIcon,
    UsedAddressIcon,
    SearchIcon,
    DeleteIcon,
    EditIcon,
} from '../../assets/SvgIcon';
import { getCommonAddressList, deleteCommonData } from '../../Api';
import { addressListDataProps } from '../../utils/type';
import InfiniteScroll from 'react-infinite-scroll-component';
import ButtonAndIcon from '../ButtonAndIcon';
import {
    Input,
    List,
    Button,
    Divider,
    Popconfirm,
    Radio,
    Skeleton,
    Form,
} from 'antd';
import {
    intermediateOldInterfaceConversion,
    transformCascadeData,
} from '../../utils/Fn';
import { commonAddressProps, commonAddressListProps } from '../../utils/type';
import debounce from 'lodash/debounce';
import { useAddressIntl } from '../../useIntl';
import './index.less';

const CommonAddress = (
    {
        setIsPositive = () => {},
        setCurrentStatus = () => {},
        setVisible = () => {},
        onChange = () => {},
        addressModalRef = {},
        type,
        tag = [],
        dataLanguageType,
        countryCodesIn = [],
    }: commonAddressProps,
    ref: any,
) => {
    const { formatMessage } = useAddressIntl();
    const [listTotal, setListTotal] = useState({
        totalPage: 0,
        totalRecord: 0,
    });
    const [form] = Form.useForm();
    const [listData, setListData] = useState([
        {
            companyName: '',
            contactsName: '',
            id: '',
            frequentlyUsed: true,
            mobile: undefined,
            mobileArea: '86',
            telephone: undefined,
            telephoneArea: '86',
            address: {
                addressDetail: '',
                cityCode: '',
                cityName: '',
                countryCode: '',
                countryName: '',
                districtCode: '',
                districtName: '',
                houseNumber: '',
                location: { longitude: '', latitude: '' },
                provinceCode: '',
                provinceName: '',
                streetCode: null,
                streetName: null,
            },
        },
    ]);
    const [selected, setSelected] = useState({
        index: -1,
    });
    const handleSelect = (props: any, index: number) => {
        setSelected({ index, ...props });
    };
    const handleCancel = () => {
        form.setFieldsValue({"searchValue":''})
        setVisible(false);
    };
    const handleOk = () => {
        onChange(selected);
        setVisible(false);
    };
    // 打开弹框(编辑)
    const handleOpenEdit = (props: any) => {
        const cascadeData = transformCascadeData(props?.address);
        const { address = {} } = props;
        // 需要把设置正反面的事件传进来
        setIsPositive(true);
        setCurrentStatus('EDIT');
        addressModalRef.current.form.setFieldsValue({
            ...props,
            ...address,
            ...cascadeData,
        });
    };
    const handleDelete = (props: any, index: number) => {
    // 调取删除数据的接口,并在当前数据结构里清楚此数据即可.
        deleteCommonData({ id: props.id }).then((res: any) => {
            if (!intermediateOldInterfaceConversion(res?.code)) return;
            listData.splice(index, 1);
            setListData([...listData]);
            setListTotal({
                totalPage: listTotal?.totalPage,
                totalRecord: listTotal?.totalRecord - 1,
            });
            setSelected({ index: -1 });
        });
    };
    const handleGetCommonAddressList = debounce(
        ({
            frequentlyUsedEq = true,
            companyNameOrContactsNameOrMobileLike,
            pageSize = 10,
            pageIndex = 1,
            resetData = false,
        }: commonAddressListProps) => {
            const internationalShareEq: boolean = tag.some(
                (item: any) => item === 'international',
            );
            const isShipperAndConsignee = tag.some(
                (item: any) => item === 'shipperAddressAndConsigneeAddress',
            );
            //todo: 目前的兼容逻辑:当国际且为收发货方时,算做国际国内共享（拿国际数据）
            getCommonAddressList({
                contactsCondition: {
                    frequentlyUsedEq,
                    countryCodesIn,
                    internationalShareEq: internationalShareEq && isShipperAndConsignee,
                    companyNameOrContactsNameOrMobileLike,
                },
                dataLanguageType,
                pagingCondition: {
                    pageIndex,
                    pageSize,
                },
            }).then((res: any) => {
                const newData = res?.result?.data || [];
                const pageData = {
                    totalPage: res?.result?.pageIndex,
                    totalRecord: res?.result?.totalRecord,
                };
                setSelected({ index: -1 });
                if (!intermediateOldInterfaceConversion(res?.code)) return;
                if (resetData) {
                    setListData([...newData]);
                    setListTotal(pageData);
                    return;
                }
                listData.push(...newData);
                setListData([...listData] || []);
                setListTotal(pageData);
            });
        },
        200,
    );
    const renderItem = (item: addressListDataProps, index: number) => {
        const telephone = item.telephone
            ? `${formatMessage({ id: 'Tel' })}: ${item.telephoneArea}-${
                item.telephone
            }`
            : '';
        const mobile = item.mobile
            ? `${formatMessage({ id: 'Mobile phone' })}: ${item.mobileArea}-${
                item.mobile
            }`
            : '';
        const mnemonic = item.id ? `${formatMessage({ id: 'Mnemonic Code' })} : ${item.id}` : '';
        const node = (
            <div
                className={`common-list-item-container ${
                    selected.index === index ? 'common-list-item-selected' : ''
                }`}
                onClick={() => {
                    handleSelect(item, index);
                }}
                key={item.id}
                style={{height:"100%"}}
            >
                <Radio checked={selected?.index === index} />
                <div className={'common-list-left-container'}>
                    <div className={'common-list-item-title'}>{mnemonic}</div>
                    <div className={'common-list-item-title'}>{item.companyName}</div>
                    <div className={'common-list-item-content'}>
                        {item.contactsName} {telephone} {mobile}
                    </div>
                    <div className={'common-list-item-content'}>
                        {item.address?.countryName} {item.address?.provinceName}{' '}
                        {item.address?.cityName} {item.address?.districtName}{' '}
                        {item.address?.addressDetail} {item.address?.houseNumber}
                    </div>
                </div>
                <div className={'common-list-right-container'}>
                    <div
                        onClick={() => {
                            handleOpenEdit(item);
                        }}
                    >
                        <EditIcon />
                    </div>
                    <Popconfirm
                        title={formatMessage({
                            id: 'confirm deletion',
                        })}
                        okText={formatMessage({ id: 'ok' })}
                        cancelText={formatMessage({ id: 'cancel' })}
                        onConfirm={() => handleDelete(item, index)}
                    >
                        <div>
                            <DeleteIcon />
                        </div>
                    </Popconfirm>
                </div>
            </div>
        );
        if (!item.companyName) return null;
        return node;
    };

    useImperativeHandle(ref, () => {
        return { handleGetCommonAddressList, handleOpenEdit, form };
    });
    return (
        <div className={'common-address-container'}>
            <Form form={form}>
                <div className={'common-address-title'}>
                    <div className="common-title">
                        {formatMessage({ id: 'common address' })}
                    </div>
                    <div onClick={handleCancel} className="common-close">
                        <CloseIcon />
                    </div>
                </div>
                <div className={'common-address-content'}>
                    <div className="common-search-container">
                        <div className={'common-search'}>
                            <Form.Item name="searchValue">
                                <Input
                                    onChange={({ target }) => {
                                        const { value } = target;
                                        handleGetCommonAddressList({
                                            companyNameOrContactsNameOrMobileLike: value,
                                            frequentlyUsedEq: true,
                                            resetData: true,
                                        });
                                    }}
                                    placeholder={formatMessage({
                                        id:
                      'Fuzzy matching by company name / contact / mobile phone number',
                                    })}
                                    suffix={
                                        <div
                                            onClick={() => {
                                                const searchValue = form.getFieldValue('searchValue');
                                                handleGetCommonAddressList({
                                                    companyNameOrContactsNameOrMobileLike: searchValue,
                                                    frequentlyUsedEq: true,
                                                    resetData: true,
                                                });
                                            }}
                                            className={'search-icon'}
                                        >
                                            <SearchIcon />
                                        </div>
                                    }
                                    style={{ width: 420, height: 32 }}
                                />
                            </Form.Item>
                        </div>
                        <div className={'common-add-address'}>
                            <ButtonAndIcon
                                onClick={() => setIsPositive(true)}
                                icon={<UsedAddressIcon />}
                                label={formatMessage({ id: 'add address' })}
                            />
                        </div>
                    </div>
                    <div className={'common-list-container'} id={`scrollableDiv${type}` } style={{wordBreak:'break-all',whiteSpace:"pre-wrap"}}>
                        <InfiniteScroll
                            dataLength={listData.length}
                            next={() =>
                                handleGetCommonAddressList({
                                    frequentlyUsedEq: true,
                                    pageSize: 10,
                                    pageIndex: Math.ceil((listData.length + 10) / 10),
                                    companyNameOrContactsNameOrMobileLike: form.getFieldValue(
                                        'searchValue',
                                    ),
                                })
                            }
                            hasMore={listData.length < listTotal?.totalRecord}
                            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                            endMessage={
                                <Divider plain>
                                    {formatMessage({ id: 'It is all, nothing more' })} 🤐
                                </Divider>
                            }
                            scrollableTarget={`scrollableDiv${type}`}
                        >
                            <List
                                split={false}
                                dataSource={listData}
                                renderItem={(item: any, index) => renderItem(item, index)}
                            />
                        </InfiniteScroll>
                    </div>
                    <div className={'common-address-footer'}>
                        <Button onClick={handleCancel}>
                            {formatMessage({ id: 'cancel' })}
                        </Button>
                        <Button
                            disabled={selected.index <= -1}
                            onClick={handleOk}
                            type="primary"
                        >
                            {formatMessage({ id: 'ok' })}
                        </Button>
                    </div>
                </div>
            </Form>
        </div>
    );
};
export default forwardRef(CommonAddress);
