/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/interface-name-prefix */
import React from 'react';
import { ConfigProvider, Menu, Layout } from 'antd';
import Icon, { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { formatRoutes, getNavSelect } from './utils';
import { logo } from './icons';
// @ts-ignore
import authComponent from '@jusda-tools/auth-component';
import './styles/sider-nav-menu-light.less';

const { Sider } = Layout;

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

interface IRoute {
    path?: string;
    name?: string;
    icon?: any;
    routes?: IRoute[];
    authCode?: string;
    rightContent?: React.FC;
    target?: '_blank' | '_self' | '_parent' | '_top';
    [key: string]: any;
}

interface SiderNavMenuProps {
    name?: string;
    routes: IRoute[];
    onClick?: Function;
    onCollapse?: Function;
    theme?: 'light' | 'dark';
    collapsed?: boolean;
    router?: any;
    width?: number;
    collapsedWidth?: number;
    iconSize?: number;
}

const SiderNavMenu: React.FC<SiderNavMenuProps> = (props) => {
    const { authorized } = authComponent;
    const [routeList, setRouteList] = React.useState([]);
    const [openKeys, setOpenKeys] = React.useState<string[]>([]);
    const [selectedKeys, setSelectedKeys] = React.useState<string[]>([]);

    const {
        routes = [],
        name = 'bu name',
        theme = 'light',
        router,
        onClick,
        collapsed,
        onCollapse = () => {},
        width = 264,
        collapsedWidth = 56,
        iconSize = 32,
    } = props;

    const menuClick = (route: IRoute) => {
        !route.target &&
      setSelectedKeys([
          route?.pathKey || (route.path as string) || route?.name,
      ]); // 不是外链时点击后才有选中效果
        if (route.target) {
            const { origin, pathname } = window.location;
            const url = (route.path || '').includes('http')
                ? route.path
                : `${origin}${pathname}#${route.path}`;
            window.open(url, route.target);
        } else if (onClick) {
            onClick(route);
        } else if (router && router.push) {
            router.push(route.path);
        }
    };

    const dataClean = (data: any) => {
        for (var i = 0; i < data.length; ) {
            const node = data[i];
            if (node.routes && node.routes.length > 0) {
                dataClean(node.routes);
            }
            if ((node.authCode && !authorized(node.authCode) && (!node.routes || node.routes.length === 0)) || // 有权限码，校验不过，并且无子节点
            (!node.authCode && (!node.routes || node.routes.length === 0) && !onClick && !node.path) // 无权限码，又没有子节点，没有外部的click事件，没有path, 没传router
            ) {
                data.splice(i, 1);
            } else {
                i++;
            }
        }
    };

    const getMenuNodes = (routes: any) => {
    // 根据权限code、子节点情况、节点的参数信息做节点过滤
        dataClean(routes);
        const deepRenderMenus = (nodes: any) => {
            return nodes.map((item: any) => {
                // if (item.authCode && !authorized(item.authCode)) {
                //     return null;
                // }
                if (!item.routes || item.routes.length === 0) {
                    return (
                        <MenuItem
                            key={item.pathKey || item.path || item.name}
                            icon={
                                item?.icon && (
                                    <span className="anticon">
                                        <Icon
                                            component={item.icon}
                                            style={{ fontSize: iconSize }}
                                        />
                                    </span>
                                )
                            }
                            onClick={() => menuClick(item)}
                        >
                            <span
                                title={item.name}
                                style={{
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    textIndent: '10px',
                                }}
                            >
                                {item.name} {item.rightContent}
                            </span>
                        </MenuItem>
                    );
                }
                // 不存在authCode的或者经过authCode判断存在权限的菜单
                // const authRoutesData = item.routes.filter(function (route: any) {
                //     return !(route.authCode && !authorized(route.authCode));
                // });
                return item.routes && item.routes.length > 0 ? (
                    <SubMenu
                        key={item.pathKey || item.path || item.name}
                        icon={
                            item?.icon && (
                                <span className="anticon">
                                    <Icon component={item.icon} style={{ fontSize: iconSize }} />
                                </span>
                            )
                        }
                        title={
                            <span
                                title={item.name}
                                style={{
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    textIndent: '10px',
                                }}
                            >
                                {item.name}
                            </span>
                        }
                        popupClassName={`sider-menu-popup-${theme}`}
                    >
                        {deepRenderMenus(item.routes)}
                    </SubMenu>
                ) : null;
            });
        };

        const openKeysProps = collapsed ? {} : { openKeys };

        return (
            <Menu
                mode="inline"
                selectedKeys={selectedKeys}
                onOpenChange={(keys: any) => setOpenKeys(keys)}
                {...openKeysProps}
                style={{ borderRight: 'none', width: 'unset' }}
                inlineIndent={12}
        // openKeys={['菜单2', '菜单2-1']}
                // selectedKeys={['菜单2', '菜单2-1']}
            >
                {deepRenderMenus(routes)}
            </Menu>
        );
    };

    const collapseHandlerClick = () => {
        onCollapse(!collapsed);
    };

    React.useEffect(() => {
        const newRoutes = formatRoutes(routes);
        setRouteList(newRoutes as any);
        const navSelectInfo = getNavSelect(newRoutes as any);
        setOpenKeys(navSelectInfo.defaultOpenKeys);
        setSelectedKeys(navSelectInfo.defaultSelectedKeys);
    }, [routes]);

    return (
        <ConfigProvider prefixCls="juslink">
            <div className={`sider-nav-menu-wrapper-${theme}`}>
                <div className="bu-info-wrapper">
                    <div className="bu-name-icon-wrapper">
                        {logo}
                        {collapsed ? null : (
              <>
                <span />
                {name}
              </>
                        )}
                    </div>
                    <div className="bu-line" />
                </div>
                <div className="nav-content">
                    <Sider
                        theme="light"
                        collapsible
                        collapsed={collapsed}
                        collapsedWidth={collapsedWidth}
                        width={width}
                        trigger={
                            <div onClick={collapseHandlerClick}>
                                {collapsed ? <RightOutlined /> : <LeftOutlined />}
                            </div>
                        }
                    >
                        {getMenuNodes(routeList)}
                    </Sider>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default SiderNavMenu;
