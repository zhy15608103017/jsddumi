---
title: jusda-contact-us (im+反馈)
nav: 组件
toc: content
group: 
  title: 业务组件
  order: 3
---

## 背景
许多业务系统都同时有集成im与意见反馈组件，对于个组件位置与排版问题各个业务系统并不一致，因此组件是对im与意见反馈功能的一个集合，统一样式

## 使用示例

<code transform="true" iframe="800" src="../../demo/jusda-contact-us/demo.jsx"></code>

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
| isShowJusdaAI           | 是否显示AI入口 | Boolean | true | 0.3.7 |
| jusdaAIIcon           | 自定义AI的icon | reactNode | - | 0.3.7 |