/* eslint-disable react/no-unknown-property */
/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { extend } from '@jusda-tools/web-api-client';
import authTools from '@jusda-tools/auth-tools';
import PropTypes from 'prop-types';
import { Dropdown, Menu, ConfigProvider, message } from 'antd';
import { mpApiUrl, mp_domain_prefix, sccp_domain_prefix } from '@jusda-tools/url-config';
import { CookieTools } from '@jusda-tools/jusda-publicmethod';
import { avatar } from '../icons';
import envConfig from '../envConfig.js';
import zhCN from '../locales/zh-CN.js';
import enUS from '../locales/en-US.js';
// import '../styles/UserControlPanel-dark.less';
// import '../styles/UserControlPanel-light.less';
import { userInfoStyle, userInfoContainerStyle, userControlPanelSubmenu, overlayPanelContainer } from '../styles/index';

const request = extend({});
const { SubMenu, Item } = Menu;
const MenuItem = Item;

const { JusdaUserInfo } = authTools;

const cookieTools = new CookieTools();

const locales = new Map()
    .set('en-US', enUS)
    .set('zh-CN', zhCN);

const websiteMap = new Map()
    .set('Information', {
        prefix: mp_domain_prefix,
        suffix: '/personalcenter/',
    })
    .set('Settings', {
        prefix: mp_domain_prefix,
        suffix: '/personalcenter/#/personalCenter/changPwdTypes',
    })
    .set('safeSetting', {
        prefix: mp_domain_prefix,
        suffix: '/personalcenter/#/personalCenter/securitySetting',
    })
    .set('Account', {
        prefix: mp_domain_prefix,
        suffix: '/personalcenter/#/personalCenter/tripartiteAccount',
    })
    .set('feedback', {
        prefix: sccp_domain_prefix,
        suffix: '/fb/',
    }).set('internalmsg', {
         prefix: mp_domain_prefix,
         suffix: '/internalmsg/',
   });

export default class UserControlPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            identities: [],
            config: envConfig,
            language: 'en-US',
            unreadNum: 0,
            username: '',
            tenantName: '',
        };
    }

    componentDidMount() {
        const { config: { clientId } } = this.state;
        request.interceptors.request.use((_, options) => {
            const { headers } = options;
            const authorization = `Bearer ${cookieTools.getToken()}`;
            return {
                options: {
                    ...options,
                    headers: { ...headers, authorization, clientId },
                },
            };
        }, { global: false });
        this.changeLocale();
        this.queryIdentities();
        this.countMessageNumber();
    }

    getUserNameAndIdentity = () => {
        const userInfo = new JusdaUserInfo().getFullInfo();
        const {
            // identities,
            language,
        } = this.state;

        try {
            this.setState({ username: userInfo.data.user.username });
            // const userIdentity = identities.find(item => userInfo.data.userIdentity.userIdentityId === item.identityId) || {};
            const { tenant } = userInfo.data.userIdentity;
            this.setState({ tenantName: language === 'en-US' ? tenant.tenantEnName : tenant.tenantName });

            // // 模拟用户 显示模拟身份的租户名称
            // if (userInfo.data.proxyUser) {
            //     this.setState({ tenantName: userInfo.data.userIdentity.tenant.tenantName });
            // } else {
            //     this.setState({ tenantName: userIdentity.tenant && userIdentity.tenant.name });
            // }
        } catch (error) {
            console.warn('用户信息有误', error);
        }
    }

    changeLocale = () => {
        const { locale } = this.props;
        const LANGS = ['zh-CN', 'en-US'];
        if (LANGS.includes(locale)) {
            this.setState({ language: locale });
        }
    }

    intl = (key) => {
        return locales.get(this.state.language)[key];
    }

    queryIdentities = async () => {
        const userInfo = new JusdaUserInfo().getFullInfo();
        const { config: { identitiesUrl } } = this.state;
        // proxyUser有值=模拟用户
        const data = await request.get(`${identitiesUrl}&isNeedProxied=${!!userInfo.data.proxyUser}`);
        if (data && data.success) {
            this.setState({ identities: data.data });
        }
        // 获取用户名和身份
        this.getUserNameAndIdentity();
    }

    defaultChildren = () => {
        const { visible, username, tenantName } = this.state;
        const { theme } = this.props;
        return (
            <div className={`${userInfoContainerStyle(theme)} user-info-container-${theme} ${visible ? `user-info-container-visible-${theme}` : ''}`}>
                {avatar}
                <div className={`${userInfoStyle(theme)} user-info-${theme}`}>
                    <div title={username}>{username}</div>
                    <div title={tenantName}>{tenantName}</div>
                </div>
            </div>
        );
    }

    // 获取未读消息数量
    countMessageNumber = async () => {
        const userInfo = new JusdaUserInfo().getFullInfo();
        const params = {
            read: false,
            typeCode: null,
            userId: userInfo.data.user.userId,
        };
        const result = await request.post(`${mpApiUrl}/juslink-internal-message/receiver/count`, { data: { ...params } });
        if (result.success) {
            this.setState({
                unreadNum: result.data,
            });
        }
    }

    identitySwitch = async (identityId) => {
        const { onIdentityChange } = this.props;
        const { config: { loginAsUrl } } = this.state;
        const data = await request.post(`${loginAsUrl}${identityId}`);
        const { success, errorCode } = data;
        if (!success && errorCode === 'LOGIN_ERROR_IP') {
            message.error(this.intl('login.ip无法使用'));
        } else if (success && onIdentityChange && typeof onIdentityChange === 'function') {
            onIdentityChange();
        } else if (data && success) {
            window.location.reload();
        }
    }

    gotoUrl = (type) => {
        const { openTargetTabConfig } = this.props;
        const tyleList = ['safeSetting', 'Settings', 'Information', 'Account', 'internalmsg'];
        const { prefix, suffix } = websiteMap.get(type) || {};
        if (((openTargetTabConfig?.personalCenter || openTargetTabConfig?.messagesCenter) && tyleList.includes(type))) {
            window.location.href = `${prefix}${suffix}`;
        } else {
            window.open(`${prefix}${suffix}`);
        }
    }

    logoutClick = () => {
        const { onLogout } = this.props;
        if (onLogout && typeof onLogout === 'function') {
            onLogout();
        } else {
            new JusdaUserInfo().logout();
        }
    }

    returnCountNumberDom = (num) => {
        if (num > 99) {
            return (
                <>{this.intl('UserControlPanel.未读消息')}<span style={{ color: 'red', cursor: 'pointer', marginLeft: 8, fontWeight:600 }}>(99+)</span></>
            );
        } else {
            return (
                <>{this.intl('UserControlPanel.未读消息')}<span style={{ color: 'red', cursor: 'pointer', marginLeft: 8, fontWeight:600 }}>({num})</span></>
            );
        }
    }

    menuItemClick = (event) => {
        const { key, keyPath } = event;
        if (keyPath && keyPath.length === 1) {
            this.gotoUrl(key);
        }
        if (keyPath && keyPath.length === 2) {
            const userInfo = new JusdaUserInfo().getFullInfo();
            // 当前租户无需切换
            if (userInfo.data.userIdentity.userIdentityId !== key) {
                this.identitySwitch(key);
            }
        }
    }

    renderOverlay = () => {
        const userInfo = new JusdaUserInfo().getFullInfo();
        const {
            identities,
            unreadNum,
            username,
            tenantName,
        } = this.state;
        const { theme, userIdentitySwitcher: propsAttribute } = this.props;
        const userIdentitySwitcher = {
            ...UserControlPanel.defaultProps.userIdentitySwitcher,
            ...propsAttribute,
        };
        const { enable, requirePermission, subMenuWrapClassName } = userIdentitySwitcher;
        const menuItems = [];
        if (identities.length > 1) {
            const identitiesItems = identities.map((item) => {
                return ({
                    key: item.identityId,
                    label: <div className="default-identity">{item?.tenant?.name}</div>,
                    disabled: !requirePermission ? false : !item?.tenant?.hasAppPermission,
                    className: userInfo.data?.userIdentity?.userIdentityId === item.identityId ? 'current-identity' : '',
                });
            });
            menuItems.push({
                key: 'switchIdentity',
                label: (
                    <div className="jusda-title">
                        <div className="icon switch-icon" />
                        {this.intl('UserControlPanel.切换身份')}
                    </div>
                ),
                popupClassName: `${userControlPanelSubmenu(theme)} UserControlPanel-submenu-${theme} ${subMenuWrapClassName || ''}`,
                onTitleClick: (e) => {
                    // fixed: 点击后左上角闪动
                    e.domEvent.preventDefault();
                    e.domEvent.stopPropagation();
                },
                children: identitiesItems,
            });
        }
        const menuData = [{
            key: 'safeSetting',
            label: <div className="jusda-title"><div className="icon safe-setting-icon" />{this.intl('UserControlPanel.安全设置')}</div>,
        }, {
            key: 'internalmsg',
            label:
    <div className="jusda-title">
        <div className="icon message-icon" />
        {unreadNum > 0 ? this.returnCountNumberDom(unreadNum) : `${this.intl('UserControlPanel.未读消息')}`}
    </div>,
        }, {
            key: 'feedback',
            label: <div className="jusda-title"><div className="icon feed-back-icon" />{this.intl('UserControlPanel.我的反馈')}</div>
        }];
        menuItems.push(...menuData);

        return (
            <div className={`overlay-panel-container-${theme} ${overlayPanelContainer(theme)}`}>
                <div className="user-base-info">
                    <div className="base-info-user-desc">
                        <div className="base-info-user-icon" />
                        <div className="base-info-user-text">
                            <div>{username}</div>
                            <div>{tenantName}</div>
                        </div>
                    </div>
                </div>
                { enable && !userInfo?.data?.proxyUser && (
                    <React.Fragment>
                        <div className="person-info-menus">
                            <span onClick={() => this.gotoUrl('Information')} title={this.intl('UserControlPanel.个人信息full')}>{this.intl('UserControlPanel.个人信息')}</span>
                            <span onClick={() => this.gotoUrl('Settings')} title={this.intl('UserControlPanel.安全设置full')} className="settings">{this.intl('UserControlPanel.修改密码')}</span>
                            <span onClick={() => this.gotoUrl('Account')} title={this.intl('UserControlPanel.第三方账号full')}>{this.intl('UserControlPanel.第三方账号')}</span>
                        </div>
                        <i className="line" />
                        <div className="menus">
                            <Menu onClick={this.menuItemClick} items={menuItems} />
                        </div>
                    </React.Fragment>
                )}
                <div
                    className="login-out"
                    onClick={() => this.logoutClick()}
                >
                    {this.intl('UserControlPanel.退出登录')}
                </div>
            </div>
        );
    }

    onVisibleChange = (visible) => {
        const { onVisibleChange } = this.props;
        if (onVisibleChange) {
            onVisibleChange(visible);
        }
        this.setState({ visible });
    }

    render() {
        const {
            theme,
            locale,
            children,
            onVisibleChange,
            overlayClassName,
            userIdentitySwitcher,
            ...otherProps
        } = this.props;
        return (
            <ConfigProvider prefixCls="juslink">
                <Dropdown
                    {...otherProps}
                    placement="bottomLeft"
                    dropdownRender={this.renderOverlay}
                    onOpenChange={this.onVisibleChange}
                    overlayClassName={`UserControlPanel-overlay-${theme} ${overlayClassName || ''}`}
                >
                    {this.defaultChildren()}
                </Dropdown>
            </ConfigProvider>
        );
    }
}

UserControlPanel.propTypes = {
    userIdentitySwitcher: PropTypes.shape({
        enable: PropTypes.bool,
        requirePermission: PropTypes.bool,
        subMenuWrapClassName: PropTypes.string,
    }),
    locale: PropTypes.oneOf(['zh-CN', 'en-US']),
    theme: PropTypes.oneOf(['light', 'dark']),
};

UserControlPanel.defaultProps = {
    userIdentitySwitcher: {
        enable: true,
        requirePermission: true,
    },
    locale: 'en-US',
    theme: 'light',
};
