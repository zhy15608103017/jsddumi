import SiderNavMenu from "@jusda-tools/sider-nav-menus"
import React from 'react';
import './index.less';
// import { ReactComponent as icon } from '@/assets/menuIcon.svg';

const history: any[] = [];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = React.useState(true);

  const onCollapse = (v: boolean) => {
    setCollapsed(v);
  };

  const props = {
    name: '运输查询',
    routes: [
      {
        name: '首页',
        path: '/path1',
        // icon: icon,
      },
      {
        name: '库存列表',
        // icon: icon,
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
        // icon: icon,
      },
    ],
    router: history, // 路由对象
    width: 200,
    collapsed: collapsed,
    onCollapse: onCollapse,
  };
  return (
    <div className="body">
      <div className="bodyLayout">
        <SiderNavMenu {...props} />
      </div>
    </div>
  );
};

export default App;
