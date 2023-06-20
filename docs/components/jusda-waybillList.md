---
title: jusda-waybillList 动态节点
nav: 组件
toc: content
group: 
  title: 停止维护
  order: 4
---
  title: 业务组件
  order: 3
---
# jusda-waybillList

## 背景

动态节点展示组件

## 代码演示

<code iframe="800" src="../../demo/jusda-waybillList/index.tsx"></code>

## 使用方法

```bash

$ npm install --save @jusda-tools/jusda-waybillList --registry http://nexus.jusda.int/verdaccio/
```

## API

| 参数                 | 说明                | 类型      | 默认    | 备注 |
| -------------------- | ------------------- | --------- | ------- | ---- |
| milestones           | 日期数据            | Array     | - |      |-
| seveNewMilestones    | modal确定框回调      | Function(data,callback)  | -   | -    |
| route                | 运输路线             | string   | -    | -    |
| transportMode        | 运输方式             | string   | -    | -    |
| status               | 针对货主隐藏更新节点按钮字段/只允许承运商操作里程碑  | boolean | - | -|
| logisticsOrderId     | 高亮根据id依赖        | -        | -    | - |
| updatedBtn           | 自定义更新按文字       | string   | 更新节点 | -| 
| iconColor            | 自定义异常节点颜色 （非必传）      |  string  | 红色    |- |
| headerText            | 自定义弹框title文本（非必传）      |  string  | 订单运输状态更新    |- |

