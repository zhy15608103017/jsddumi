---
title: juslink-common 下拉菜单
nav: 组件
toc: content
group: 
  title: 业务组件
  order: 3
---
# juslink-common

## 背景

技术中台公用组件 

## 代码演示

<code iframe="800" src="./../../demo/juslink-common"></code>

## 使用方法

```bash

$ npm install --save @jusda-tools/juslink-common --registry http://nexus.jusdaglobal.com/repository/npm-group
```

## API
```bash
  code: string;/数据唯一标识
  data: any[];// 用于渲染的数据
  name:string;// 想要展示数据的字段
  placeholder:string;//搜索框默认提示
  lable: string;//展示的labal
  goBack: ()=>:void;//返回按钮调用的事件
  goBackTip: string; // 返回按钮提示值
  itemClick: (item:any)=>:void; // 鼠标点击listitrm 触发的事件出接受到该条数据全部信息
  total:number;// 传递给组件判断是否出现滚动条样式.不传默认会出现



