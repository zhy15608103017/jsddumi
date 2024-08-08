/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable camelcase */
import { css } from '@emotion/css';
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

const applyDrawerStyle = (uiTheme): any=>{
    const drawerBodyColor = uiTheme === 'light' ? 'rgba(255,255,255)' : 'grgba(66, 66,66, 0.9)';
    const drawerBody_Title_Svg_Fill = uiTheme === 'light'? 'path{fill: #666666;}':'';
    const drawerBody_Title_Span_Color = uiTheme === 'light'? '#666666':'#e0e0e0';
    const cross_line_BackgroundColor =  uiTheme === 'light'? '#cccccc':'#666666';
    const item_title_Color = uiTheme === 'light' ? '#222222':'#e0e0e0';
    const svg_icon_Path_Fill = uiTheme === 'light' ? '#222222':'#ffffff';
    const animation_time = uiTheme === 'light' ? '1s' : '0.7s linear';
    return css `
        height: calc(100vh - 50px) !important;
        position: absolute;
        top: 50px;
        z-index: 9999;
        .${ant_prefix}-drawer-content-wrapper {
            width: auto !important;
            min-width: 200px;
            .${ant_prefix}-drawer-content {
                background-color: unset;
                .${ant_prefix}-drawer-body {
                    padding: 0;
                    background: ${drawerBodyColor};
                    overflow: unset;
                    .content_div{
                        padding: 20px 0;
                        width: 100%;
                        height: 100%;
                    }
                    .title {
                        padding: 0 15px;
                        display: flex;
                        // justify-content: center;
                        align-items: center;
                        svg {
                            width: 26px;
                            height: 26px;
                            display: inline-block;
                            ${drawerBody_Title_Svg_Fill}
                        }
                        span {
                            font-size: 16px;
                            color: ${drawerBody_Title_Span_Color};
                            margin-left: 11px;
                            line-height: 19px;
                            height: 19px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                    }
                    .cross_line {
                        width: calc(100% - 39px);
                        height: 1px;
                        margin-left: 18px;
                        margin-top: 19px;
                        background: ${cross_line_BackgroundColor};
                    }
                    .apply_isordered_content, .apply_notordered_content {
                        .item {
                            height: 40px;
                            margin: 4px 0;
                            padding-left: 15px;
                            display: flex;
                            align-items: center;
                            cursor: pointer;
                            &.active,
                            &:hover {
                                background-color: ${colorPrimary};
                                .item_title {
                                    color: #000000;
                                }
                                .item_notorder {
                                    color: #000000;
                                    border: 1px solid #000000;
                                }
                                // img {
                                //     fill: #000000;
                                // }
                                .svg_icon {
                                    svg {
                                        path{
                                            fill: #000000;
                                        }
                                    }
                                }
                            }
                            .svg_icon {
                                div {
                                    width: 26px;
                                    height: 26px;
                                    svg {
                                        width: 26px;
                                        height: 26px;
                                    }
                                }
                            }
                            .item_title {
                                font-size: 14px;
                                color: ${item_title_Color};
                                margin: 0 12.5px;
                                // max-width: 71px;
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                            }
                            .item_notorder {
                                // width: 46px;
                                font-size: 12px;
                                color: ${colorPrimary};
                                margin-right: 22px;
                                margin-left: auto;
                                border: 1px solid ${colorPrimary};
                                padding: 0 4px;
                                line-height: 17px;
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                            }
                            .svg_icon {
                                svg {
                                    path{
                                        fill: ${svg_icon_Path_Fill};
                                    }
                                }
                            }
                            // img {
                            //     width: 26px;
                            //     height: 26px;
                            //     display: inline-block;
                            //     fill: #ffffff;
                            // }
                        }
                        .currentProduct {
                            background-color: ${colorPrimary};
                            ${  uiTheme === 'light' ? '': `
                                .item_title {
                                    color: #000000;
                                }
                                .svg_icon {
                                    svg {
                                        path{
                                            fill: #000000;
                                        }
                                    }
                                }
                            `}
                        }
                    }
                    .apply_notordered_content {
                        overflow: hidden;
                        .item_disabled {
                            cursor: not-allowed;
                        }
                    }
                    .notordered_title{
                        padding: 0 20px;
                        display: flex;
                        align-items: center;
                        cursor: pointer;
                        margin-top: 19px;
                        .title_name{
                            display: flex;
                            align-items: center;
                        }
                    }
                    .contenthide{
                        height: 0;
                    }
                    .contentshow{
                        height: auto;
                    }
                    .divshow{
                        animation: show ${animation_time};
                    }
                    .divhide{ 
                        animation: hide ${animation_time};
                        animation-fill-mode:forwards;
                        overflow: hidden;
                    }
                    @keyframes show
                    {
                    from {transform:translateY(-100%)}
                    to {transform:translateY(0%)}
                    }
                    @keyframes hide
                    {
                    from {transform:translateY(0%)}
                    to {transform:translateY(-100%)}
                    }
                }
            }
        }
    `;
};

// ============================== Export ==============================
export {
    applyDrawerStyle,
};