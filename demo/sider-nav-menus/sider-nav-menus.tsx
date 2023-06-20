/* eslint-disable */
import SiderNavMenu from '@jusda-tools/sider-nav-menus';
import React, { useEffect } from 'react';
import './index.less';
// import { ReactComponent as icon } from '@/assets/menuIcon.svg';

// 原本代码 import { history } from 'umi'; 自行脑补哟
const history = [];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = React.useState(true);

  useEffect(() => {
    const authCodeData = [
      {
        applicationCode: 'A',
        code: 'A1',
        id: '1',
      },
      {
        applicationCode: 'C',
        code: 'C1',
        id: '3',
      },
      {
        applicationCode: 'B',
        code: 'B1',
        id: '2',
      },
    ];
    const { clientId } = window.jusdaBaseConfig;
    sessionStorage.setItem(
      `auth-list-${clientId}`,
      JSON.stringify(authCodeData),
    );
  }, []);

  const handleClick = (route: any) => {
    console.log('momo', route);
    history.push(route.path);
  };

  const onCollapse = (v: boolean) => {
    setCollapsed(v);
  };
  const props = {
    name: '运输查询',
    routes: [
      {
        name: '库存列表',
        path: '/path311',
        // icon: icon,
        authCode: 'AA',
        routes: [
          {
            name: '入库1',
            path:'sdsd',
            routes: [
              {
                name: '入库11',
                path: '/path3231',
                authCode: 'AA',
              },
              {
                name: '入库12',
                path: '/path32311',
                authCode: 'AA',
                routes:[{
                  name: '入库111',
                  path: '/path3231',
                  authCode: 'A1',
                }]
              },
            ],
          },
          {
            name: '入库2',
            path: '/path32',
            authCode: 'AA',
            routes: [
              {
                name: '入库23',
                path: '/path323',
                authCode: 'AA',
              },
              {
                name: '入库24',
                path: '/path3234',
                authCode: 'AA',
              },
            ],
          },
        ],
      },
      //   {
      //     name: '菜单1',
      //     path: '/cai',
      //     // icon: icon,
      //   },
    ],
    // onClick: handleClick, // 自行处理
    collapsed: collapsed,
    onCollapse: onCollapse,
    width: 200,
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
