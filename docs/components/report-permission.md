---
title: report-permission 帆软报表权限管控
nav: 组件
toc: content
group: 
  title: JS-SDK
  order: 1
---
# jusda-report-permission

## 背景

帆软报表权限管控

## Example

> 注: 帆软报表权限管控，需要一个需要ssoToken登陆的帆软报表url。

<code transform="true" src="../../demo/report-permission/index.tsx"></code>

<!-- 提取MD -->

## API
| 名称 |         描述          |   类型   | 可选值 |   默认值    |  是否必填   |       示例       |
| :-----------: |:-------------------:|:------:|:---:|:--------:|:-------:|:--------------:|
| reportUrl |        报表url        | string |  -  |    -     |  true   |       -        |
| styleObj | 可以覆盖iframe上的props属性 | object |  -  | - | false   | { width: 100 } |

<!-- end提取MD -->

## 更新日志
###### @0.0.1更新内容:
1.对需要ssoToken登陆的帆软报表url进行权限管控，使用当前juslink登录租户的token去交换一个最新的ssoToken,才可以成功访问帆软报表。


## 注意事项
1.使用ifrmae接入报表时，需要保证报表地址跟项目地址同域，以中台举例，运维同事会将https://report.jus-link.com/代理成https://mpdev.jus-link.com/
2.需要在项目中的document.ejs文件中增加`<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">`，将不安全的 HTTP 连接加载的资源升级为通过安全的 HTTPS 连接加载，否则浏览器拦截，无法加载报表。


## 使用方法

```bash
$ npm install --save @jusda-tools/report-permission --registry http://nexus.jusda.int/verdaccio/


