---
title: juslink-common-search-component 统一搜索组件
nav: 组件
toc: content
group: 
  title: 业务组件
  order: 3
---
# juslink-common

## 背景

业务系统统一搜索组件

## 代码演示

```ts
import React, { ReactElement, useState } from 'react';
// import { ReactComponent as IconParkDown } from './iconPark-check-small.svg'
import SearchComponent, { TermType } from '@jusda-tools/juslink-common-search-component';
interface Parameter {
    page: number;
    value?: string;
}

export default function Index(): ReactElement {
    return (
        <div>
            <SearchComponent
                fetchData={(params => { console.log('params', params) })}
                searchTermOptions={[
                    { key: "orderNo", label: '客户订单号', sticky: true },
                    { key: "serviceComponyId", label: '服务商', sticky: true },
                    { key: "shipmentNo", label: '主题单号/题单号', sticky: true },
                    {
                        key: "currentNode", label: '当前节点', widget: TermType.SELECT, options: [
                            { label: 'test1', value: 'testAAA' },
                            { label: 'test2', value: 'testBBB' },
                            { label: 'test3', value: 'testC' },
                            { label: 'test4', value: 'testD' },
                        ]
                    },
                    {
                        key: "invinceNo", label: '发票号'
                    },
                    { key: "shipper", label: '发货方', widget: TermType.MULTI_SELECT, options: [
                        { label: 'test1fdsafdsafdsafdsafdsafdsafdsafdasfdassf', value: 'testAAA' },
                        { label: 'test2', value: 'testBBB' },
                        { label: 'test3', value: 'testC' },
                        { label: 'test4', value: 'testD' },
                    ] },
                    { key: "departTime", label: '预计出发时间/实际出发时间', widget: TermType.DATETIME },
                ]}
                defaultSearchTermKeys={[
                    'orderNo', 'serviceComponyId', 'shipmentNo'
                ]}
            />

        </div>
    );
}
```

## 使用方法

```bash

$ npm install --save @jusda-tools/juslink-common-search-component --registry http://nexus.jusdaglobal.com/repository/npm-group
```

## API
```bash
    defaultSearchTermKeys: string[], // 默认展示条件key
    searchTermOptions: SearchTermOption[], // 可配置搜索条件
    resetText: string, // 重置按钮文本
    searchText: string, // 搜索按钮文本
    fetchData: (searchParams: any) => Promise<any>, // 搜索操作触发的异步方法
    onSearchClick: (e: Event) => void, // 搜索按钮click事件
    onResetClick: (e: Event) => void, // 重置按钮click事件


