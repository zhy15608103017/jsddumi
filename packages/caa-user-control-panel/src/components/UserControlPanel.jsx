/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import request from '@jusda-tools/web-api-client';
import authTools from '@jusda-tools/auth-tools';
import { CookieTools } from '@jusda-tools/jusda-publicmethod';
import intl from 'react-intl-universal';
import PropTypes from 'prop-types';
// import Dropdown from 'rc-dropdown';
// import Menu, { SubMenu, MenuItem } from 'rc-menu';
import { Dropdown, Menu, ConfigProvider } from 'antd';
import envConfig from '../envConfig.js';
import { iconUserAvatar } from '../icons/index.jsx';
import ChangePwdModal from './ChangePwdModal.jsx';
import zhCN from '../locales/zh-CN.js';
import enUS from '../locales/en-US.js';
// import 'rc-dropdown/assets/index.css';
// import 'rc-menu/assets/index.css';
import '../styles/UserControlPanel-light.less';
import '../styles/UserControlPanel-dark.less';

const { SubMenu, Item } = Menu;
const MenuItem = Item;

const { JusdaUserInfo } = authTools;

const cookieTools = new CookieTools();

const locales = {
    'en-US': enUS,
    'zh-CN': zhCN,
};

export default class UserControlPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initLocaleDone: false,
            visible: false,
            changePasswordVisible: false,
            identities: [],
            language: '',
            config: envConfig,
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
    }

    changeLocale = () => {
        const { userIdentitySwitcher: { locale } } = this.props;
        let language = 'zh-CN';
        if (locale && locale !== 'zh-CN') {
            language = 'en-US';
        }
        if (!locale && navigator.language !== 'zh-CN') {
            language = 'en-US';
        }
        intl.init({
            currentLocale: language,
            locales,
        }).then(() => { this.setState({ initLocaleDone: true, language }); });
    }

    queryIdentities = async () => {
        const userInfo = new JusdaUserInfo().getFullInfo();
        const { config: { identitiesUrl } } = this.state;
        // proxyUser有值=模拟用户
        const data = await request.get(`${identitiesUrl}&isNeedProxied=${!!userInfo.data.proxyUser}`);
        if (data && data.success) {
            this.setState({ identities: data.data });
        }
    }

    defaultChildren = () => {
        const userInfo = new JusdaUserInfo().getFullInfo();
        const { theme } = this.props;
        const { identities, visible } = this.state;
        let username = 'username';
        let tenantName = 'tenantName';
        try {
            username = userInfo.data.user.username;
            const userIdentity = identities.find(item => userInfo.data.userIdentity.userIdentityId === item.identityId) || {};
            // 模拟用户 显示模拟身份的租户名称
            if (userInfo.data.proxyUser) {
                tenantName = userInfo.data.userIdentity.tenant.tenantName;
            } else {
                tenantName = userIdentity.tenant && userIdentity.tenant.name;
            }
        } catch (error) {
            console.warn('用户信息有误', error);
        }
        return (
            <div className={`user-info-container-${theme} ${visible ? `user-info-container-visible-${theme}` : ''}`}>
                {iconUserAvatar}
                <div className="name-content">
                    <div className="name">{username}</div>
                    <div className="companyName">{tenantName}</div>
                </div>
            </div>
        );
    }

    identitySwitch = async (v) => {
        const { config: { loginAsUrl } } = this.state;
        const data = await request.post(`${loginAsUrl}${v.identityId}`);
        if (data && data.success) {
            window.location.reload();
        }
    }

    handleChangePassword = () => {
        this.setState({
            changePasswordVisible: true,
            visible: false,
        });
    }

    renderOverlay = () => {
        const userInfo = new JusdaUserInfo().getFullInfo();
        const { identities } = this.state;
        const { theme } = this.props;
        const userIdentitySwitcher = {
            ...UserControlPanel.defaultProps.userIdentitySwitcher,
            ...userIdentitySwitcher,
        };
        const { enable, requirePermission, subMenuWrapClassName } = userIdentitySwitcher;
        const menu = (
            <Menu>
                {
                    enable && !userInfo.data.proxyUser && identities.length > 1
                    && (
                        <SubMenu
                            title={(
                                <div className="switchIdentity-title">
                                    {intl.get('UserControlPanel.switchIdentity')}
                                </div>
                            )}
                            popupClassName={`UserControlPanel-submenu-${theme} ${subMenuWrapClassName || ''}`}
                            onTitleClick={(e) => {
                                // fixed: 点击后左上角闪动
                                e.domEvent.preventDefault();
                                e.domEvent.stopPropagation();
                            }}
                        >
                            {identities.map((item) => {
                                return (
                                    <MenuItem
                                        key={item.tenant && item.tenant.name}
                                        onClick={() => this.identitySwitch(item)}
                                        disabled={!requirePermission ? false : !item.tenant.hasAppPermission}
                                        className={userInfo.data.userIdentity.userIdentityId === item.identityId ? 'current-identity' : ''}
                                    >
                                        {item.tenant && <IdentityMenu name={item.tenant.name} />}
                                    </MenuItem>
                                );
                            })}
                        </SubMenu>
                    )
                }
                {
                    // 模拟用户不能修改密码
                    !userInfo.data.proxyUser
                    && (
                        <MenuItem onClick={this.handleChangePassword}>
                            {intl.get('UserControlPanel.changePassword')}
                        </MenuItem>
                    )
                }
                {this.props.overlay}
                <MenuItem
                    onClick={() => {
                        new JusdaUserInfo().logout();
                    }}
                >
                    {intl.get('UserControlPanel.logout')}
                </MenuItem>
            </Menu>
        );
        // fixed 用div包一层避免容器组件的Prefix透传 导致submenu漂移
        // return <div>{menu}</div>;
        return menu;
    }

    onVisibleChange = (visible) => {
        if (visible) {
            this.changeLocale();
        }
        const { onVisibleChange } = this.props;
        if (onVisibleChange) {
            onVisibleChange(visible);
        }
        this.setState({ visible });
    }

    render() {
        const {
            config,
            language,
            initLocaleDone,
            changePasswordVisible,
        } = this.state;
        const {
            theme,
            children,
            overlay,
            onVisibleChange,
            overlayClassName,
            userIdentitySwitcher,
            ...otherProps
        } = this.props;
        return (
            initLocaleDone
            && (
                <ConfigProvider prefixCls="rc" input={{ style: { color: '#000' } }}>
                    <Dropdown
                        {...otherProps}
                        overlay={this.renderOverlay()}
                        onVisibleChange={this.onVisibleChange}
                        overlayClassName={`UserControlPanel-overlay-${theme} ${overlayClassName || ''}`}
                    >
                        {this.defaultChildren()}

                    </Dropdown>
                    <ChangePwdModal
                        api={config}
                        theme={theme}
                        language={language}
                        visible={changePasswordVisible}
                        onCancel={() => this.setState({ changePasswordVisible: false })}
                    />
                </ConfigProvider>
            )
        );
    }
}

function IdentityMenu(props) {
    const { name } = props;
    return name;
    // return (
    //     <div className="identity-menu">
    //         <div className="prefix-name">{name.substring(0, 1)}</div>
    //         <div className="full-name">{name}</div>
    //     </div>
    // );
}

IdentityMenu.propTypes = {
    name: PropTypes.string,
};

UserControlPanel.propTypes = {
    userIdentitySwitcher: PropTypes.shape({
        enable: PropTypes.bool,
        requirePermission: PropTypes.bool,
        locale: PropTypes.string,
        subMenuWrapClassName: PropTypes.string,
    }),
    theme: PropTypes.oneOf(['light', 'dark']),
};

UserControlPanel.defaultProps = {
    userIdentitySwitcher: {
        enable: true,
        requirePermission: true,
        locale: undefined,
    },
    theme: 'light',
};
