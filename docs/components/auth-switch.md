---
title: auth-switch 功能权限开关
nav: 组件
toc: content
group:
  title: JS-SDK
  order: 1
---

# auth-switch

## 背景

在项目中有时需要判断某个模块是否需要屏蔽掉时，使用该组件包裹一下该模块即可实现(ps:功能开关在中台设置)

## 代码演示

```jsx | pure
// 常见用法
import React from 'react';
import authTools from '@jusda-tools/auth-tools';
import juslinkBootstrap from '@jusda-tools/juslink-bootstrap';
import authSwitch from '@jusda-tools/auth-switch';

const { AuthLogin } = authTools;
const { authorizedSwitch, AuthorizedSwitchWrap } = authSwitch;

// app.tsx
export async function render(oldRender: any) {
    await AuthLogin(); // 用户登录, 默认把 token 和 clientId 存储在 cookie 中
    await juslinkBootstrap(); // 获取权限code列表和功能开关code
}
// index.tsx
function index() {
  return (
    <div className="App">
      <AuthorizedSwitchWrap authCode={'config_center'}>
        // 如此code在中功能开关code，则显示children
        <div>有权限</div>
      </AuthorizedSwitchWrap>
    </div>
  );
}

```

## 使用方法

```bash
$ npm install --save @jusda-tools/auth-switch --registry http://nexus.jusda.int/verdaccio/
```
<!-- 提取MD -->
## API

| 参数            | 说明                                               | 类型     | 默认 | 备注                 |
| --------------- | -------------------------------------------------- | -------- | ---- | -------------------- |
| AuthorizedSwitchWrap  | 根据功能开关 code 码判断是否需要显示子节点           | function | -    | -                    |
| getAuthSwitchList     | 返回所有 功能开关code 码并存入 sessionStorage 中 | function | -    | -                    |
| authorizedSwitch      | 判断当前是否具有该功能权限 code 码                       | function | -    |
<!-- end提取MD -->
