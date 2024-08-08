---
title: juslink-bootstrap 项目启动时
nav: 组件
toc: content
group:
  title: JS-SDK
  order: 1
---

# juslink-bootstrap

## 背景

在项目启动时在app.tsx render方法中调用 juslinkBootstrap() 方法初始化，会去拉取权限code码和功能开关code接口

## 代码演示

```jsx | pure
// 常见用法
import React from 'react';
import authTools from '@jusda-tools/auth-tools';
import juslinkBootstrap from '@jusda-tools/juslink-bootstrap';


// app.tsx
export async function render(oldRender: any) {
    await AuthLogin(); // 用户登录, 默认把 token 和 clientId 存储在 cookie 中
    await juslinkBootstrap(); // 获取权限code列表和功能开关code
}

```

## 使用方法

```bash
$ npm install --save @jusda-tools/juslink-bootstrap --registry http://nexus.jusda.int/verdaccio/
```
<!-- 提取MD -->
## API

| 参数            | 说明                                               | 类型     | 默认 | 备注                 |
| --------------- | -------------------------------------------------- | -------- | ---- | -------------------- |
| juslinkBootstrap  | 拉取权限code码和功能开关code           | function | -    | auth-component组件中的getAuthList()、auth-switch组件中的getAuthSwitchList() |

<!-- end提取MD -->