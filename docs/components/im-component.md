---
title: im-component IM组件(新)
nav: 组件
toc: content
group: 
  title: 业务组件
  order: 3
---
# [im-component](https://gitlab.jusdaglobal.com/jusda-ui/jusda-tools/tree/dev-0.0.17/packages/im-component)

## 背景

+ 老版本IM组件已经不满足现在业务系统需求，并且对于IM组件如何展示逻辑改动较大，需要在业务系统内内嵌IM系统，由此有了新版IM组件
+ 组件采用iframe内嵌网页的方式嵌入IM系统部分功能，包含消息发送以及接收
+ 组件分为两种展开模式，指定客服（一对一）以及未指定客服（群组模式），通过是否上传userId或者crmCode判断

## 代码演示

IM支持两种打开方式，分别对应不同场景

+ 指定客服ID，聊天方式为一对一，需要提供userId

<code transform="true" src="../../demo/im-component/demo2.jsx"></code>

+ 无指定客服，需提供crmCode，弹窗提示选择咨询类型，会自动分配客服ID，聊天方式为群聊;

<code transform="true" src="../../demo/im-component/demo1.jsx"></code>

## 使用方法
### 引入npm包

> 注: 外网需换成外网地址, 并登录 npm

```bash
$ npm install --save @jusda-tools/im-component --registry http://nexus.jusda.int/verdaccio/
```

## API
| 参数                 | 说明                 | 类型    | 默认值  | 版本 |
| -------------------- | -------------------- | ------- | ------- | ---- |
| defaultPosition            | 位置 | Object<style>({{right: '15px', bottom: '150px'}}) |    | -   |
| userId            | 客服ID（userId与tenantCodee至少传入一个），指定客服单人会话 | String | -   | -   |
| tenantCode            | 用户code（userId与tenantCode至少传入一个），未指定客服，创建多人回话 | String | -   | -   |
| baseUrl            | im站点web url，一般用于内网跳转 | String | https://mp${env}.jus-link.com/im/#/ | -   |
| isMsgRemind            | 是否消息提醒 | Boolean | false   | -   |
| businessData               | 业务数据 | Object | -    | -    |orderId
| orderId           | 订单Id | String | - | - |
| content           | 更换IM显示图片 | ReactNode ｜() => ReactNode | -    | -    |
