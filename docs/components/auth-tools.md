---
title: auth-tools 登录相关
nav: 组件
toc: content
group: 
  title: JS-SDK
  order: 1
---

# auth-tools

## 背景

统一认证和跨应用鉴权工具函数，在FE项目的入口文件中调用鉴权函数。

## 代码演示
```bash
npm i @jusda/auth-tools --registry=http://nexus.jusda.int/verdaccio/
```


- umijs

```jsx | pure
// /src/app.js
import authTools from '@jusda-tools/auth-tools';

const { 
    AuthLogin, //统一登录鉴权
    AuthApplication, //跨应用鉴权
    JusdaUserInfo, //获取用户信息
    CookieTools, // 获取Cookie信息
} = authTools;

export async function render(oldRender) {
    // 统一认证鉴权
    await AuthLogin();
    // 跨应用鉴权
    await AuthApplication();
    oldRender();
}
```

- dva with create-react-app

```jsx | pure
// src/index.js
import authTools from '@jusda-tools/auth-tools';

const { AuthLogin, AuthApplication } = authTools;
// 1. Initialize
// ...
// 2. Plugins
// ...
// 3. Model
// ...
// 4. Router
// ...
  
async function bootstrap() {
    // 统一认证鉴权
    await AuthLogin();
    // 跨应用鉴权
    await AuthApplication(});
    app.start('#root');
}
// 5. Start
bootstrap();
```

## 约定的全局参数

```jsx | pure
window.jusdaBaseConfig = {
    //当前业务系统的clientId
    clientId: 'clientId',
    // 部署环境 
    cfgType: 'dev',
    // 覆盖接口地址 参数见以下authToolsDefault *对象*
    authToolsDefault: {  }
};
```

## 使用方法

```bash
$ npm install --save @jusda-tools/auth-tools --registry http://nexus.jusda.int/verdaccio/
```
###### 获取Token信息

```jsx | pure
// 经过统一认证后，Token会保存在Cookie中，可以通过以下方式取值
const { CookieTools } = authTools;
// 删除用户Token
    new CookieTools().removeToken();
// 获取用户Token
    new CookieTools().getToken();
```

###### 获取用户信息

```jsx | pure
// 经过统一认证后，全局会保存用户的信息，可以通过以下方式取值
const jusdaUserInfo = new JusdaUserInfo();
// 获取用户所有信息
jusdaUserInfo.getFullInfo();
// 退出登录
jusdaUserInfo.logout();// 在0.0.76不支持callback
```

#### 更新记录

| 版本号               | 更新内容                        
| ------------------ | --------------------------- 
| 0.0.78        | 移动端登录地址修改,移动端登录无登录动画, 退出方法可以指定redirectUrl地址             |
| 0.0.79        | 移动端登录无登录动画             |
| 0.0.81        | 移动端登出增加指定clientid             |
| 0.0.83        | 内网访问应用无权限时跳转到登录页面             |
| 0.0.84        | 获取用户信息接口报错时应调用接口退出登录             |
| 0.0.85        | setCookie 时增加SameSite、Secure 标记             |
| 0.0.86        | 退出登录调用接口时在Header上增加JSESSION标记,解决跨域时session销毁不到的问题             |

