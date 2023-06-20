---
title: buried-point 埋点(中台)
nav: 组件
toc: content
group: 
  title: JS-SDK
  order: 1
---

# buried-point

## 背景

新的埋点组件，数据调用中台接口存储，大数据团队再对数据进行分析，形成报表

## 代码演示
### 全埋点
```jsx | pure
 import {initGlobalPoints} from "@jusda-tools/buried-point";

// appcode不传会自动取config.js中的productCode||appName||clientId
// appcode取值 https://mpdev.jus-link.com/productcenter/#/ProductManagement/ProductCenter?id=20210113142101 
 const appCode = 'appCode';
// 使用全埋点只需执行下面这个代码，放在鉴权之后，因为需要拿到用户信息
 initGlobalPoints（appCode）
//  本地测试是否埋点成功可以使用initGlobalPoints(appCode,{open:true})查看接口buried-point-logs是否发送

 ```
### init page（统计用户登录次数）

```jsx | pure
import authTools from '@jusda-tools/auth-tools';
import registerUserActions from '@jusda-tools/buried-point';

const { AuthLogin } = authTools;

// must use it
await AuthLogin();

const appCode = 'appCode';


// action: initialization
registerUserActions(appCode,{
    action: 'initialization',
});

```
### 元素主动曝光
```jsx | pure
 import {exposure} from "@jusda-tools/buried-point";
        exposure.addExposureView(document.getElementById('root'), {
            // 事件名称，
            eventName:'elementExposure',
            // 配置
            //- `area_rate`：曝光比例。默认：0，值域：0~1。类型：Number
            // `stay_duration`: 有效曝光停留时长。 默认：0。类型：Number
            // `repeated`:  重复曝光。 默认：true。类型：Boolean
            config: {
                area_rate: 0.5,
                stay_duration: 0,
                repeated: true
            },
            // 自定义参数，必须放到extraProperties中
            properties: {
                extraProperties:{
                    asdas:"sdasdsa"
                }
            }
        })
 ```
 ### 手动埋点
 ```jsx | pure
 import {sensors} from "@jusda-tools/buried-point";
//  事件名统一是custom，参数放到extraProperties中,extraProperties中的key使用驼峰命名
           sensors.track('custom',{extraProperties:{

    }})
 ```
 ### 关闭全埋点
  ```jsx | pure
 import {sensors} from "@jusda-tools/buried-point";
 //禁用全埋点,注意禁用后手动埋点的方式也会被一起禁用
sensors.disableSDK()
 //关闭禁用
sensors.enableSDK()
 //得到禁用状态
sensors.getDisabled()
 ```
### PV 埋点 

```jsx | pure

import  { pageBrowseAction } from '@jusda-tools/buried-point';

const appCode = "home";

pageBrowseAction(appCode)

```

### detail page（统计具体的页面功能使用次数）

```jsx | pure
// action: materials-detail-query
const handleClick = (item) => {
    registerUserActions('appCode', {
        action: 'shipment-detail-query',
        properties: [{ partNo: item.partNo, shipmentId: item.id }],
    });
}

const orderList = [];

orderList.map(item => {
    return (<div key={item.id} onclick={()=> handleClick(item)}>{item.order}</div>)
})

```

## 使用方法

```bash
npm install --save @jusda-tools/buried-point --registry=http://nexus.jusda.int/verdaccio/
```

## API

### registerUserActions(appCode,[options])

### registerUserActions options 参数
    该对象为扩展参数，会原封不动的传给中台接口
    datasend_timeout = 6000,
    send_interval = 6000,
    storage_length = 200,
    sfInstantEventArr = [],
### PV 埋点 
pageBrowseAction

| 参数                  | 说明              | 类型       | 默认   | 备注 |
| --------------------- | ----------------- | --------- | -----  | ---- |
| appCode               | 项目标识              | string  |   clientId | 自定义传参appCode > config.js的appName > config.js的clientId   |

### 全埋点 
全埋点默认只传第一个参数appCode,
| 参数                  | 说明              | 类型       | 默认   | 备注 |
| --------------------- | ----------------- | --------- | -----  | ---- |
| appCode               | 项目标识              | string  |   clientId | 自定义传参appCode >config.js的productCode>config.js的appName > config.js的clientId      |

第二个参数为对象默认不传
| 参数                  | 说明              | 类型       | 默认   | 备注 |
| --------------------- | ----------------- | --------- | -----  | ---- |
| url               | 发送地址             | string  |   中台提供地址 |      |
| show_log              | 是否打开控制台输出             | Boolean  |   false |      |
| open               | 是否本地开启埋点           | Boolean  |   false |   一般用于本地调试   |
| is_track_single_page              | // 单页面配置，默认开启，若页面中有锚点设计，需要将该配置删除，否则触发锚点会多触发 $pageview 事件            | boolean  |   true |      |
| sfInstantEventArr       | 需要发送的事件名            | Array  |   ["$WebPageLoad", "$pageview", "$WebClick", "$WebPageLeave", "custom", "elementExposure"] |  传值会合并在里面    |
| datasend_timeout              | 接口无响应断开时间  | Number  |   6000|      |
| storage_length             |    localStorage条数       | Number  |   200 |   该值不应过大，防止本地存储过大和发送请求发送参数过大，超过这个条数会立即发送  |
| send_interval            | 多少时间发送一次              | Number  |   6000 |     |
| collect_tags           | 自定义触发元素             | object  |   {} |   {li:true，...} div配置为{max_level: 1}数字最大为3。  |
## 更新日志
###### 0.1.0更新内容:
```base
由于history 包升级到5.X 后 history.push() 方法实际调用的是 window.history.pushState()  所以需要自定义监听方法来监听 history.pushState() 
```
###### 0.3.7更新内容:
```base
增加全埋点 
```
###### 0.3.12更新内容:
```base
全埋点启用方式替换成initGlobalPoints
```
###### 0.3.13更新内容:
```base
增加自定义元素触发字段collect_tags
```