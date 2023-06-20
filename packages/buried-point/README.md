# [@jusda-tools/buried-point](https://gitlab.jusdaglobal.com/jusda-ui/jusda-tools/tree/dev-0.0.17/packages/buried-point)

# Installation

> 注: 外网需换成外网地址, 并登录 npm

```bash
npm install --save @jusda-tools/buried-point --registry=http://nexus.jusda.int/verdaccio/
```

## registerUserActions(appName[, options])

### registerUserActions options 参数

| 参数       | 说明                     | 类型   | 可选值                                 |
| ---------- | ------------------------ | ------ | -------------------------------------- |
| action     | 用户操作                 | String | initialization , shipment-detail-query |
| properties | 非initialization操作使用 | Object | 大数据约定格式                         |

## Example

> 注: 由于使用了@jusda-tools/auth-tools获取用户信息，需要保证在使用埋点包之前调用@jusda-tools/auth-tools

### init page（统计用户登录次数）

> action: initialization

```js
import authTools from '@jusda-tools/auth-tools';
import registerUserActions from '@jusda-tools/buried-point';

const { AuthLogin } = authTools;

// must use it
await AuthLogin();

const appName = 'appName';

registerUserActions(appName,{
    action: 'initialization',
});

```

### detail page（统计具体的页面功能使用次数）

> action: materials-detail-query

```jsx

const handleClick = (item) => {
    registerUserActions('appName', {
        action: 'shipment-detail-query',
        properties: [{ partNo: item.partNo, shipmentId: item.id }],
    });
}

orderList.map(item => {
    return (<div key={item.id} onclick={()=> handleClick(item)}>{item.order}</div>)
})

```
### PV 埋点 
pageBrowseAction

| 参数                  | 说明              | 类型       | 默认   | 备注 |
| --------------------- | ----------------- | --------- | -----  | ---- |
| appName               | xxx              | string  |   clientId |  自定义传参appName > config.js的appName > config.js的clientId    |

```jsx

import  { pageBrowseAction } from '@jusda-tools/buried-point';

pageBrowseAction(appName)

```