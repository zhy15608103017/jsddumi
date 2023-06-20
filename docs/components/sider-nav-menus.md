---
title: sider-nav-menus 侧边导航菜单
nav: 组件
toc: content
group: 
  title: 业务组件
  order: 3
---
# sider-nav-menus

## 背景

项目内导航菜单

## 代码演示

### 1、自行处理路由跳转

<code iframe="true" src="../../demo/sider-nav-menus/sider-nav-menus.tsx"></code>

### 2、传入路由对象辅助组件实现路由跳转

<code iframe="true" src="../../demo/sider-nav-menus/sider-nav-menus-2.tsx"></code>

## 使用方法

```bash
$ npm install --save @jusda-tools/sider-nav-menus --registry http://nexus.jusda.int/verdaccio/
```

## API

### sider-nav-menus

| 参数           | 说明                    | 类型                                  | 默认  | 备注 |
| -------------- | ----------------------- | ------------------------------------- | ----- | ---- |
| name           | 业务名称                | string                                | -     | -    |
| routes         | 导航菜单数据，tree 结构   | <font color=red>routes</font>       | []    | -    |
| onClick        | 菜单节点点击回调        | function(route)                       | -     | -    |
| onCollapse     | 折叠图标点击事件        | function                              | -     | -    |
| collapsed      | sider 折叠状态          | boolean                               | -     | -    |
| theme          | 主题色                  | light \| dark                         | light |      |
| width          | 宽度                    | number                                | 264   |      |
| collapsedWidth | 收缩宽度                | number                                | 56    |      |
| router         | react router            | router                                | -     | -    |

### routes

| 参数     | 说明      | 类型                                                                   | 默认 | 备注               |
| -------- | --------- | ---------------------------------------------------------------------- | ---- | ------------------ |
| path     | 路由路径  | string                                                                 | -    | -                  |
| pathKey  | 指定路径  | string                                                                 | -    | 指定点亮的菜单路径 |
| name     | 菜单名称  | string                                                                 | -    | -                  |
| icon     | 菜单图标  | ReactNode                                                              | -    | 仅支持 svg 图标    |
| routes   | 子菜单    | routes[]                                                               | -    | -                  |
| authCode | 权限 Code | string                                                                 | -    | -                  |
| target   | 打开方式  | [target](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/open) | -    | 有值时点击后就不会选中该菜单了                  |



### 0.0.6 更新日志.

添加了`pathKey`参数,该参数,解决了路由里添加参数时,侧边栏无法点亮的问题.使用方法具体如下:

```bash
const inboundIcon = "";
const outboundIcon = "";
const transferIcon = "";

const routes = [
  {
    name: 'Inbound',
    icon: inboundIcon, // 仅支持svg图标
    routes: [
      {
        name: 'All bookings',
        path: '/App/inbound/inboundOrderList',
      },
      {
        name: 'Create bookings',
        path: '/App/inbound/inboundCreatBooking',
        pathKey: '/App/inbound/inboundCreatBooking/:id',
      },
    ],
  },
  {
    name: 'Outbound',
    icon: outboundIcon,
    routes: [
      {
        name: 'All bookings ',
        path: '/App/outbound/outboundOrderList',
      },
      {
        name: 'Create bookings ',
        path: '/App/outbound/CreateBookingList',
      },
    ],
  },
  {
    name: 'Cross Dock Query',
    icon: transferIcon,
    path: '/App/crossDock/crossDockList',
    pathKey: '/App/crossDock/crossDockList',
  },
];
```

### 0.0.11 更新日志
1、如果该项路由的子集根据权限筛选过后不存在至少一项的话，那该选项就不展示出来