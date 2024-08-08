/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable camelcase */
import React from 'react';
import { css } from '@emotion/css';
// import { theme } from 'antd';
import { getAntdConfig } from "@jusda-tools/jusda-theme-config";
import userAvatar42 from './userAvatar42.png';
// import { themeTokenFn } from '@jusda-tools/antd-theme-token';
// eslint-disable-next-line camelcase, @typescript-eslint/camelcase
const ant_prefix = 'juslink';
// const { getDesignToken } = theme;

const config: any = {
    token: getAntdConfig('v5'),
};
// const themetoken = themeTokenFn.getToken() || config;
// const themeConfig = getDesignToken(themetoken);
const { colorPrimary } = config.token;

const textHover = (uiTheme: string) => {
    const color = uiTheme === 'light' ? 'var(--jusda-action-icon-color)' : colorPrimary;
    return {
        color,
        cursor: 'pointer',
    };
};

const userInfoStyle = (uiTheme: string) : any => {
    const colorObject = uiTheme === 'dark' ? { color: colorPrimary } : {};
    return css({
        maxWidth: '160px',
        marginLeft: '15px',
        display: 'flex',
        flexDirection: 'column',
        fontSize: '12px',
        '& div': {
            maxWidth: '160px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            ...colorObject,
        },
    });
};

const userInfoContainerStyle = (uiTheme: string) : any => {
    const hoverColor = uiTheme === 'light' ? 'var(--jusda-action-icon-color)' : '#3D3D3D';
    return css({
        height: '100%',
        padding: '0px 10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: hoverColor,
        },
    });
};

const userControlPanelSubmenu = (uiTheme : string): any => {
    const colorObject = {
        ulColor: uiTheme === 'light' ? '#222222' : '#fff',
        ulBackColor: uiTheme === 'light' ? '#ffffff' : '#000000',
        currentColor: uiTheme === 'light' ? 'var(--jusda-background-white-text-secondary)' : colorPrimary,
    };
    const item_disabled = uiTheme === 'light' ? 'rgba(0, 0, 0, 0.25)' : 'grey';

    return css`
        .${ant_prefix}-menu: {
            borderRadius: 0px !important,
        }
        ul,li{
            opacity: 0.86;
            background: ${colorObject.ulBackColor} !important;
            color: ${colorObject.ulColor} !important;
            font-size: 12px !important;
        }
        li[role="menuitem"]{
            height: 30px;
            line-height: 30px;
            margin: unset !important;
            padding: unset !important;
        }
        .default-identity{
            padding-left: 20px;
        }
        .default-identity:hover{
            background-color: ${colorPrimary};
            color: var(--jusda-primary-button-text-color);
        }
        .${ant_prefix}-menu-item-disabled{
            cursor: not-allowed !important;
            color: gray !important;
        }
        .current-identity{
            color: ${colorObject.currentColor} !important;
        }
        .${ant_prefix}-dropdown-menu-item-disabled{
            color: ${item_disabled} !important
        }
    `;
};

const overlayPanelContainer = (uiTheme : string): any => {
    const loginOutback = uiTheme === 'light' ? 'rgba(74,74,74,.05)' : '#4A4A4A';
    const colorObject = {
        panelContainerBack: uiTheme === 'light' ? '#ffffff' : 'rgba(66, 66,66, 0.9)',
        panelContainerColor: uiTheme === 'light' ? '#222222' : '#ffffff',
        settingsBorder: uiTheme === 'light' ? '#222222' : '#fff',
        menusUl: uiTheme === 'light' ? '#222222' : '#fff',
        menuItemSelected: uiTheme === 'light' ? '#222222' : '#fff',
    };
    const iconColor = uiTheme === 'light' ? '#222222' : '#ffc500';
    const iconColorHover = uiTheme === 'light' ? 'var(--jusda-primary-button-text-color)' : '#222222';

    return css`
    width: 330px;
    max-height: 307px;
    opacity: 0.86;
    background: ${colorObject.panelContainerBack};
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.50);
    margin-top: -1px;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    color: ${colorObject.panelContainerColor};
    justify-content: space-between;
    .user-base-info{
        height: 80px;
        padding: 20px;
        .base-info-user-desc{
            height: 40px;
            display: flex;
            margin-bottom: 20px;
            .base-info-user-icon{
                background-image: url(${userAvatar42});
                background-size: cover;
                height: 40px;
                width: 40px;
            }
            .base-info-user-text{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding-left: 20px;
                div{
                    max-width: 224px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }

    }
    .person-info-menus{
        display: flex;
        justify-content: space-evenly;
        padding-bottom: 20px;
        span{
            height: 14px;
            line-height: 14px;
            cursor: pointer;
        }
        span:hover{
            ${textHover(uiTheme)}
        }
        .settings{
            padding: 0 20px;
            border-right: 1px solid ${colorObject.settingsBorder};
            border-left: 1px solid ${colorObject.settingsBorder};
        }
    }
    .line{
        width: 290px;
        margin: 0 auto;
        border-bottom: 1px dashed #666666;
    }
    .menus{
        & > ul{
            background-color: transparent !important;
            color: ${colorObject.menusUl};
            border: unset;
            border-radius: 0 !important;
            padding: 0;
            .${ant_prefix}-dropdown-menu-submenu-vertical > .${ant_prefix}-dropdown-menu-submenu-title .${ant_prefix}-dropdown-menu-submenu-arrow{
                display: none;
            }
            li,.${ant_prefix}-dropdown-menu-title-content,.${ant_prefix}-dropdown-menu-submenu-title{
                height: 40px;
                line-height: 40px;
                margin: unset !important;
                padding: unset !important;
            }
            .${ant_prefix}-dropdown-menu-item-selected{
                background-color: transparent !important;
                color: ${colorObject.menuItemSelected};
            }
            .jusda-title{
                font-size: 12px;
                padding-left: 30px;
                display: flex;
                align-items: center;
                .icon{
                    height: 22px;
                    width: 22px;
                    margin-right: 10px;
                    display: inline-grid;
                    background-size: cover;
                    svg{
                        fill: ${iconColor};
                    }
                }
                span{
                    color: ${colorObject.panelContainerColor};
                }
            }
            .jusda-title:hover{
                color: ${iconColorHover};
                .icon{
                    svg{
                        fill: ${iconColorHover};
                    }
                }
                span{
                    color: ${iconColorHover};
                }
            }
            li[role="menuitem"]:hover{
                background-color: ${colorPrimary} !important;
                color: var(--jusda-primary-button-text-color) !important;
                border-radius: 0 !important;
            }
            li[role="none"]:hover{
                background-color: ${colorPrimary} !important;
                color: var(--jusda-primary-button-text-color) !important;
                border-radius: 0 !important;
            }
        }
    }
    .login-out{
        background: ${loginOutback};
        height: 30px;
        line-height: 30px;
        text-align: center;
    }
    .login-out:hover{
        ${textHover(uiTheme)}
    }
    `;
};

// ============================== Export ==============================
export {
    userInfoContainerStyle,
    userInfoStyle,
    userControlPanelSubmenu,
    overlayPanelContainer,
};
