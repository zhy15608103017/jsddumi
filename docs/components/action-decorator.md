---
title: action-decorator 埋点(大数据)
nav: 组件
toc: content
group: 
  title: JS-SDK
  order: 1
---

# [action-decorator](https://gitlab.jusdaglobal.com/jusda-ui/jusda-tools/tree/dev-0.0.17/packages/action-decorator)
 
# Installation

> 注: 外网需换成外网地址, 并登录 npm

```bash
npm install --save @jusda-tools/action-decorator --registry=http://nexus.jusda.int/verdaccio/
```

## recordUserActions(appName[, options])

### recordUserActions options 参数

| 参数       | 说明                     | 类型   | 可选值                                 |
| ---------- | ------------------------ | ------ | -------------------------------------- |
| action     | 用户操作                 | String | initialization , shipment-detail-query |
| properties | 非initialization操作使用 | Object | 大数据约定格式                         |

## Example

> 注: 由于使用了@jusda-tools/auth-tools获取用户信息，需要保证在使用埋点包之前调用@jusda-tools/auth-tools

<code transform="true" src="../../demo/action-decorator/index.tsx"></code>

### init page（统计用户登录次数）

> action: initialization

```jsx | pure
import authTools from '@jusda-tools/auth-tools';
import recordUserActions from '@jusda-tools/action-decorator';

const { AuthLogin } = authTools;

// must use it
await AuthLogin();

const appName = 'appName';

recordUserActions(appName,{
    action: 'initialization',
});

```

### detail page（统计具体的页面功能使用次数）

> action: materials-detail-query

```jsx | pure

const handleClick = (item) => {
    recordUserActions('appName', {
        action: 'shipment-detail-query',
        properties: [{ partNo: item.partNo, shipmentId: item.id }],
    });
}

const orderList = [];

orderList.map(item => {
    return (<div key={item.id} onclick={()=> handleClick(item)}>{item.order}</div>)
})

```
### PV 埋点 
pageViewAction

| 参数                  | 说明              | 类型       | 默认   | 备注 |
| --------------------- | ----------------- | --------- | -----  | ---- |
| appName               | xxx              | string  |   clientId |  自定义传参appName > config.js的appName > config.js的clientId    |

---

```jsx | pure

import  { pageViewAction } from '@jusda-tools/action-decorator';

const appName = "231";

pageViewAction(appName)

```

## 更新日志
###### 0.2.0更新内容:
```base
由于history 包升级到5.X 后 history.push() 方法实际调用的是 window.history.pushState()  所以需要自定义监听方法来监听 history.pushState() 
```