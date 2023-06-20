---
title: im-integration IM组件(老)
nav: 组件
toc: content
group: 
  title: 业务组件
  order: 3
---
# im-integration

## :rocket: 使用指南

```bash
$ npm install --save @jusda-tools/im-integration --registry http://nexus.jusda.int/verdaccio/
```

## 参数配置(window.jusdaBaseConfig.ImIntegrationDefault)

| 参数                 | 说明     | 类型   | 默认值 | 版本 |
| -------------------- | -------- | ------ | ------ | ---- |
| clientId | 接口(Header)参数 | String | "IM"    | -    |
| imApiUrl | IM接口调用地址 | String | "https://mpdev.jus-link.com/api/im-service/"    | -    |
| imRedirectUrl | IM项目地址(点击用户跳转到IM页面) | String | "https://mpdev.jus-link.com/im/#/"    | -    |


## Header页面参数

| 参数                 | 说明                 | 类型    | 默认值  | 版本 |
| -------------------- | -------------------- | ------- | ------- | ---- |
| themeType            | 主题类型 | String | dark   | V1.7    |
| content           | 显示内容 | ReactNode ｜() => ReactNode | -    | -    |


## Detail页面参数

| 参数                 | 说明                 | 类型    | 默认值                | 版本 |
| -------------------- | -------------------- | ------------ | ----------------- | ------- |
| blNo               | 订单ID | String | -    | -    |
| themeType            | 主题类型 | String | dark   | V1.7    |
| businessData               | 业务数据 | Object | -    | -    |
| menuDirection               | 菜单显示方向 | String | right    | -    |
| content           | 显示内容 | ReactNode ｜() => ReactNode | -    | -    |


## DefaultIM页面参数
| 参数                 | 说明                 | 类型    | 默认值  | 版本 |
| -------------------- | -------------------- | ------- | ------- | ---- |
| themeType            | 主题类型 | String | dark   | -   |
| userId            | 用户ID | String | -   | -   |
| isMsgRemind            | 是否消息提醒 | Boolean | false   | -   |
| businessData               | 业务数据 | Object | -    | -    |
| content           | 显示内容 | ReactNode ｜() => ReactNode | -    | -    |

---

```jsx
/**
 * iframe: true
*/
import { Header, Detail, DefaultIM } from '@jusda-tools/im-integration';
import react from 'react';

const orderId = 'HN213121212';
const userId = 'xxxxx';
const imUsername = 'juslink-test1';

function App() {
    return (
        <div>
            <div><Header /></div> 
            <div><Detail blNo={orderId} /></div> 
            <div><DefaultIM userId={userId} imUsername={imUsername} /></div> 
        </div>
    );
};
export default App;
```
> 注意: 业务系统中window.jusdaBaseConfig.cfgType控制发版的环境
