/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable semi */
/* eslint-disable no-empty */
import React, { ReactElement, useRef } from 'react';
// import { ReactComponent as IconParkDown } from './iconPark-check-small.svg'
import SearchComponent, { TermType } from '@jusda-tools/juslink-common-search-component';
interface Parameter {
    page: number;
    value?: string;
}

export default function Index(): ReactElement {
    const ref = useRef(null);
    return (
        <div>
            <SearchComponent
                ref={ref}
                fetchData={(params => { console.log('params', params) })}
                searchTermOptions={[
                    {
                        key: "orderNo", label: '客户订单号', sticky: true, placeholder: '请输入', disableAutoSearch: true
                    },
                    { key: "serviceComponyId", label: '服务商', sticky: true },
                    { key: "shipmentNo", label: '主题单号/题单号', sticky: true },
                    {
                        key: "currentNode", label: '当前节点', widget: TermType.SELECT, placeholder: '请选择', options: [
                            { label: 'test1', value: 'testAAA' },
                            { label: 'test22', value: 'testBBB' },
                            { label: 'test333', value: 'testC' },
                            { label: 'test44448078979w857489758978974937897489', value: 'testD' },
                        ]
                    },
                    {
                        key: "invinceNo", label: '发票号'
                    },
                    {
                        key: "shipper", label: '发货方', widget: TermType.MULTI_SELECT, placeholder: '请选择',
                        options: [
                            { label: 'test11', value: 'testAAA' },
                            { label: 'test222', value: 'testBBB' },
                            { label: 'test333', value: 'testC' },
                            { label: 'test4444', value: 'testD' },
                        ]
                    },
                    {
                        key: "creatorId", label: '创建人/更新人', widget: TermType.SELECT,
                        searchPlaceholder: "请输入用户关键字",
                        onSearch(value) { console.log('search value', value) },
                        options: [
                            {
                                label: '推荐用户', options: [
                                    { label: 'test22', value: 'testBBB' },
                                    { label: 'test333', value: 'testC' },
                                    { label: 'test4444', value: 'testD' },
                                ],
                            },
                            {
                                label: '所有用户', options: [
                                    { label: 'test55478935738975894384759437987897548932', value: 'test5' },
                                    { label: 'test666666', value: 'test6' },
                                    { label: 'test7777777', value: 'test7' },
                                    { label: 'test88888888', value: 'test8' },
                                    { label: 'test999999999', value: 'test9' },
                                ]
                            }

                        ]
                    },
                    { key: "departTime", label: '预计出发时间/实际出发时间', widget: TermType.DATETIME, placeholder: ['开始', '结束'] },
                ]}
                defaultSearchTermKeys={[
                    'orderNo', 'serviceComponyId', 'shipmentNo'
                ]}
            />

        </div>
    );
}
