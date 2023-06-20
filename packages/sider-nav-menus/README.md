# sider-nav-menu 侧边导航栏菜单

## API
### sider-nav-menu
| 参数    | 说明                   | 类型                                  | 默认  | 备注 |
| ------- | ---------------------- | ------------------------------------- | ----- | ---- |
| name    | 业务名称               | string                                | -     | -    |
| routes  | 导航菜单数据，tree结构 | array<{path, name, [routes, target]}> | []    | -    |
| onClick | 菜单节点点击回调       | function(route)                       | -     | -    |
| onCollapse  | 折叠图标点击事件           | function                                | -     | -    |
| collapsed  | sider折叠状态           | boolean                                | -     | -    |
| theme   | 主题色                 | light \| dark                         | light |      |
| width   | 宽度                 | number                        | 264 |      |
| collapsedWidth   | 收缩宽度                 | number                         | 56 |      |
| router  | react router           | router                                | -     | -    |


### routes

| 参数   | 说明     | 类型                                                         | 默认 | 备注 |
| ------ | -------- | ------------------------------------------------------------ | ---- | ---- |
| path   | 路由路径 | string                                                       | -    | -    |
|pathKey| 指定路径|                string                           |-|指定点亮的菜单路径
| name   | 菜单名称 | string                                                       | -    | -    |
| icon   | 菜单图标 | ReactNode                               | -    |  仅支持svg图标  |
| routes | 子菜单   | routes[]                                                     | -    | -    |
| authCode | 权限Code   | string                                                    | -    | -    |
| target | 打开方式 | [target](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/open) | -    | -    |
| rightContent | 菜单名后的内容 | React.Fn | -    | -    |


## Example


### 自行处理路由跳转

```jsx
import React from 'react';
import { history } from 'umi';
import { ReactComponent as icon } from '@/assets/menuIcon.svg';
import SiderNavMenu from '@jusda-tools/sider-nav-menu';

const App: React.FC = () => {

  const [collapsed, setCollapsed] = React.useState(true);

  const handleClick = (route) =>{
    history.push(route.path);
  }

  const onCollapse = (v: boolean) => {
    setCollapsed(v);
  };
  const props = {
    name: '运输查询'
    routes: [
      {
        name: '首页',
        path: '/path1',
        icon: icon,
      },
      {
        name: '库存列表',
        icon: icon,
        routes: [
          {
            name: '入库1',
            path: '/path31',
          },
        ],
      },
      {
        name: '菜单1',
        path: '/cai',
        icon: icon,
      },
    ],
    onClick: handleClick, // 自行处理
    collapsed: collapsed,
    onCollapse: onCollapse,
  }
  return (
    <div>
      <SiderNavMenu {...props} />
    </div>
  );
};

export default App;
```

### 传入路由对象辅助组件实现路由跳转。
```jsx
import React from 'react';
import { history } from 'umi';
import { ReactComponent as icon } from '@/assets/menuIcon.svg';
import SiderNavMenu from '@jusda-tools/sider-nav-menu';

const App: React.FC = () => {
  const props = {
    name: '运输查询'
    routes: [
      {
        name: '首页',
        path: '/path1',
        icon: icon,
      },
      {
        name: '库存列表',
        icon: icon,
        routes: [
          {
            name: '入库1',
            path: '/path31',
          },
        ],
      },
      {
        name: '菜单1',
        path: '/cai',
        icon: icon,
      },
    ],
    router: history, // 路由对象
  }
  return (
    <div>
      <SiderNavMenu {...props} />
    </div>
  );
};

export default App;
```

### 0.0.6更新日志.
######添加了`pathKey`参数,该参数,解决了路由里添加参数时,侧边栏无法点亮的问题.使用方法具体如下:
```jsx

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
