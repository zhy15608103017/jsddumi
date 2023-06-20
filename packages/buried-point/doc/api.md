# 文档
用户行为记录库

## api
fn recordUserActions(appName, parameter = {})


函数参数和返回值（要遵守下面的例子的规则）

- param {string} appName appName
- param {object} [parameter] 大数据接口参数 ([]代表可选参数)
- return void

举个例子（要包含代码用例）

```js
// 代码
```

特殊说明，比如特殊情况下会报错等

1. 在使用前, 必须使用 auth-tools 统一登录.
2. 必须设置 window 环境
```js
    const { jusdaBaseConfig: { cfgType } = { cfgType: "dev" } } = window;
```

## Config 

系统自带环境配置, 如有后端后更新, 则更新 index.js 内对应配置.
```js
const prod = {
    url: "https://datahub.jusdaglobal.com/g2/kafka/push/data",
};
const dev = {
    url: "https://datahubsit.jusdaglobal.com/core/kafka/push/data",
};
const sit = {
    url: "https://datahubsit.jusdaglobal.com/core/kafka/push/data",
};
const uat = {
    url: "https://datahubsit.jusdaglobal.com/core/kafka/push/data",
};
const config = new Map()
    .set("dev", dev)
    .set("sit", sit)
    .set("uat", uat)
    .set("prod", prod)
```
