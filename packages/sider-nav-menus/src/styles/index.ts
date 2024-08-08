/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable camelcase */
import { css, injectGlobal, keyframes } from '@emotion/css';
import { theme } from 'antd';
import { getAntdConfig } from "@jusda-tools/jusda-theme-config";

// eslint-disable-next-line camelcase, @typescript-eslint/camelcase
const ant_prefix = 'juslink';
const jusdaThemeConfig = {
    token: getAntdConfig('v5'),
};
const { getDesignToken } = theme;

const themeConfig = getDesignToken(jusdaThemeConfig);
const { colorPrimary } = themeConfig;
const rootStyle = getComputedStyle(document.documentElement);


const siderMenuPopup = (): any => {
    const jusda_sidebar_menu_yellow_text_color = rootStyle.getPropertyValue('--jusda-sidebar-menu-yellow-text-color');
    return css `
        .${ant_prefix}-menu-vertical.${ant_prefix}-menu-sub > .${ant_prefix}-menu-item{
                display: flex;
                align-items: center;
        }
        // .${ant_prefix}-menu-item-selected,
        // .${ant_prefix}-menu-submenu-selected{
        //     .juslink-menu-submenu-title{
        //         color: ${jusda_sidebar_menu_yellow_text_color} !important;
        //         svg path{
        //             fill: ${jusda_sidebar_menu_yellow_text_color} !important;
        //         }
        //     }
        // } 
        .${ant_prefix}-menu-item-selected{
            color: ${jusda_sidebar_menu_yellow_text_color};
        }
    `;
};

const siderNavMenuWrapper = (): any =>{
    const jusda_selectedbackground = rootStyle.getPropertyValue('--jusda-selected-background');
    const jusda_sidebar_menu_yellow_text_color = rootStyle.getPropertyValue('--jusda-sidebar-menu-yellow-text-color');
    return css `
    height: calc(100vh - 50px);
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.16);
    display: flex;
    flex-direction: column;
    .nav-content{
        flex: 1;
        overflow: hidden auto;
        overflow-y: overlay;
        // padding-top: 17px; 
    }
    // 滚动条样式 start
    .nav-content::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }

    .nav-content::-webkit-scrollbar-track {
        // background: rgba(128, 128, 128, 0.1);
        border-radius: 3px;
        -webkit-box-shadow: inset 0 0 5px rgba(37,37,37,.05);
        background: #f6f6f6;
    }

    .nav-content::-webkit-scrollbar-thumb {
        // background: rgba(0, 0, 0, 0.2);
        border-radius: 3px;
        -webkit-box-shadow: inset 0 0 5px hsla(0,0%,100%,.05);
        background: #E0E0E0;
    }
    // 滚动条样式 end
    .bu-info-wrapper{
        .bu-name-icon-wrapper{
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            color: #222222;
            padding: 20px 0;
            font-weight: 500;
            span{
                margin-left: 18px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                display: inline-block;
                max-width: 156px;
            }
        }
        .bu-line{
            width: 80%;
            height: 1px;
            background: #E0E0E0;
            margin: 0 auto;
            margin-bottom: 10px;
        }
    }
    .${ant_prefix}-layout-sider-trigger{
        height: 40px;
        line-height: 40px;
        background-color: #cccccc !important;
        color: #FFFFFF !important;
        &:hover{
            // color: #E1E1E1;
            background-color: #E1E1E1;
            cursor: pointer;
        }
        div{
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            svg{
                height: 20px;
                width: 20px;
            }
        }
    }
    .${ant_prefix}-menu:not(.juslink-menu-horizontal) .${ant_prefix}-menu-item-selected{
        background-color: ${jusda_selectedbackground};
        width: 100%;
    }
    .${ant_prefix}-menu-submenu-selected{
        .juslink-menu-submenu-title{
            color: ${jusda_sidebar_menu_yellow_text_color};
            svg path{
                fill: ${jusda_sidebar_menu_yellow_text_color};
            }
        }
    } 
   .${ant_prefix}-menu-item-selected{
        color: ${jusda_sidebar_menu_yellow_text_color};
        svg path{
            fill: ${jusda_sidebar_menu_yellow_text_color};
        }
    }
   .${ant_prefix}-menu-inline .${ant_prefix}-menu-item,
   .${ant_prefix}-menu-inline .${ant_prefix}-menu-submenu-title{
        display: flex;
        align-items: center;
   }
   .${ant_prefix}-menu-inline .${ant_prefix}-menu-item{
        width: calc(100% - 6px);
   }
   .${ant_prefix}-menu-item .${ant_prefix}-menu-item-icon, .${ant_prefix}-menu-submenu-title .${ant_prefix}-menu-item-icon, .${ant_prefix}-menu-item .anticon, .${ant_prefix}-menu-submenu-title .anticon{
        margin-right: 0 !important;
        min-width: 32px;
   }
   .${ant_prefix}-menu-inline-collapsed > .${ant_prefix}-menu-submenu > .${ant_prefix}-menu-submenu-title,
   .${ant_prefix}-menu-inline-collapsed > .${ant_prefix}-menu-item {
        padding: 0 calc(50% - 32px / 2) !important;
        display: flex;
        align-items: center;
   }
   .${ant_prefix}-menu-item .anticon,
   .${ant_prefix}-menu-inline-collapsed > .${ant_prefix}-menu-item .anticon ,
   .${ant_prefix}-menu-inline-collapsed > .${ant_prefix}-menu-submenu > .${ant_prefix}-menu-submenu-title .anticon{
       display: flex;
       align-items: center;
       margin-right: 0 !important;
       min-width: 32px;
       min-height: 32px;
   }
   .${ant_prefix}-menu-vertical{
    .${ant_prefix}-menu-item,.${ant_prefix}-menu-submenu-title{
        margin-inline: unset;
        }
   }
    .${ant_prefix}-menu-inline.${ant_prefix}-menu-root .${ant_prefix}-menu-submenu-title >*{
        flex: unset !important;
    }
    `;
};


// ============================== Export ==============================
export {
    siderMenuPopup,
    siderNavMenuWrapper,
};