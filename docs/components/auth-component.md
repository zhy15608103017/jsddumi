---
title: auth-component 权限判断
nav: 组件
toc: content
group:
  title: JS-SDK
  order: 1
---

# auth-component

## 背景

在项目中有时需要判断某个模块用户是否有权限访问，使用该组件包裹一下该模块即可实现(ps:权限 code 需去中台配置)

## 代码演示

```jsx | pure
// 常见用法
import React from 'react';
import authTools from '@jusda-tools/auth-tools';
import authComponent from '@jusda-tools/auth-component';

const { initAuthentication } = authTools;
const { initPermissions, AuthorizedWrap } = authComponent;

function App() {
  const getData = async () => {
    await initAuthentication(); // 用户登录, 默认把 token 和 clientId 存储在 cookie 中
    await initPermissions(); // 获取权限列表
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <AuthorizedWrap authCode={'config_center'}>
        // 如此code在权限列表中，则显示children
        <div>有权限</div>
      </AuthorizedWrap>
    </div>
  );
}

export default App;
```

## 代码演示(需修改ClientId)

```jsx | pure
import React from 'react';
import authTools from '@jusda-tools/auth-tools';
import authComponent from '@jusda-tools/auth-component';

const { initAuthentication } = authTools;
const { getAuthList, AuthClass } = authComponent;

function App() {
  const getData = async () => {
    await initAuthentication(); // 用户登录, 默认把 token 和 clientId 存储在 cookie 中
    await getAuthList('newClientId'); // 获取权限列表
  };

  const NewAuthClass = new AuthClass('newClientId');
  
  React.useEffect(() => {
    getData();
    console.log(NewAuthClass.authorized('auth_code'))
  }, []);

  return (
    <div className="App">
      <NewAuthClass.AuthorizedWrap authCode={'config_center'}>
        // 如此code在权限列表中，则显示children
        <div>有权限</div>
      </NewAuthClass.AuthorizedWrap>
    </div>
  );
}

export default App;
```


```jsx | pure
// 系统配置
window.jusdaBaseConfig = {
  cfgType: 'dev', // dev , sit 环境, 用于约定 获取权限 api url前缀
  clientId: 'CP_PLATFORM', // clientId
};
```

## 使用方法

```bash
$ npm install --save @jusda-tools/auth-component --registry http://nexus.jusda.int/verdaccio/
```

## API

| 参数            | 说明                                               | 类型     | 默认 | 备注                 |
| --------------- | -------------------------------------------------- | -------- | ---- | -------------------- |
| AuthorizedWrap  | 根据权限 code 码判断是否有权限显示子节点           | function | -    | -                    |
| getAuthList     | 返回当前用户的所有 code 码并存入 sessionStorage 中 | function | -    | -                    |
| authorized      | 判断当前用户是否具有 code 码                       | function | -    | -                    |
| initPermissions | 同 getAuthList                                     | function | -    | 可能是为了做兼容加的 |

> > 注: 1. 全局配置: 需要配置 window.jusdaBaseConfig 变量  
> >  2. 默认从 cookie 中获取 token 和 clientId
