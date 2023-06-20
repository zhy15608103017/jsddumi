/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/interface-name-prefix */
import React from 'react';
import { Drawer, ConfigProvider, Menu } from 'antd';
import { arrow, logo } from './icons';
import { formatRoutes, getNavSelect } from './utils';
import authComponent from '@jusda-tools/auth-component';
import './styles/sider-nav-bar-light.less';

interface IRoute {
    name: string;
    path?: string;
    routes?: IRoute[];
    target?: '_blank' | '_self' | '_parent' | '_top';
    [key: string]: any;
}

interface SiderNavBarProps {
    name: string;
    visible: boolean;
    routes: IRoute[];
    onClick?: Function;
    theme?: 'light' | 'dark';
    router?: any;
    handlerOnClick?: Function;
}

const SiderNavBar: React.FC<SiderNavBarProps> = (props) => {
    const { authorized } = authComponent;
    const [routeList, setRouteList] = React.useState([]);
    const [openKeys, setOpenKeys] = React.useState<string[]>([]);
    const [selectedKeys, setSelectedKeys] = React.useState<string[]>([]);

    const {
        routes = [],
        name = 'BU NAME',
        theme = 'light',
        router,
        onClick,
        visible,
        handlerOnClick = () => { },
    } = props;

    const switchDrawerVisible = () => {
        handlerOnClick(!visible);
    };

    const menuClick = (route: IRoute) => {
        setSelectedKeys([route.name]);
        if (route.target) {
            const { origin, pathname } = window.location;
            window.open(`${origin}${pathname}#${route.path}`, route.target);
        } else if (onClick) {
            onClick(route);
        } else if (router && router.push) {
            router.push(route.path);
        }
    };

    const getMenuNodes = (routes: any) => {
        const deepRenderMenus = (nodes: any) => {
            return nodes.map((item: any) => {
                if(item.authCode && !authorized(item.authCode)){
                    return null;
                }
                if (!item.routes) {
                    return (
                        <Menu.Item onClick={() => menuClick(item)} key={item.name}>
                            <span title={item.name}>{item.name}</span>
                        </Menu.Item>
                    );
                }
                return (
                    <Menu.SubMenu
                        key={item.name}
                        title={<span title={item.name}>{item.name}</span>}
                    >
                        {deepRenderMenus(item.routes)}
                    </Menu.SubMenu>
                );
            });
        };

        return (
            <div>
                <div>
                    <Menu
                        mode="inline"
                        openKeys={openKeys}
                        selectedKeys={selectedKeys}
                        onOpenChange={(keys: any) => setOpenKeys(keys)}
                    >
                        {deepRenderMenus(routes)}
                    </Menu>
                </div>
            </div>
        );
    };

    React.useEffect(() => {
        const newRoutes = formatRoutes(routes);
        setRouteList(newRoutes as any);
        const navSelectInfo = getNavSelect(newRoutes as any);
        setOpenKeys(navSelectInfo.defaultOpenKeys);
        setSelectedKeys(navSelectInfo.defaultSelectedKeys);
    }, [routes]);

    return (
        <ConfigProvider prefixCls="jusda-sider">
            <div className={`sider-nav-bar-wrapper-${theme}`}>
                <Drawer
                    placement="left"
                    closable={false}
                    mask={false}
                    width={200}
                    visible={visible}
                    getContainer={false}
                    style={{ position: 'absolute', }}
                    handler={<div className={`arrow-icon ${visible ? 'icon-right' : 'icon-left'}`} onClick={switchDrawerVisible}>{arrow}</div>}
                >
                    <div className="bu-info-wrapper">
                        <div className="bu-name-icon-wrapper">
                            {logo}<span/>{name}
                        </div>
                        <div className="bu-line" />
                    </div>
                    <div className="nav-content">
                        {getMenuNodes(routeList)}
                    </div>
                </Drawer>
            </div>
        </ConfigProvider>
    );
};

export default SiderNavBar;