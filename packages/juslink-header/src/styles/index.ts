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

const turnopen = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(90deg);
    }
`;

const turnclose = keyframes`
    from {
        transform: rotate(90deg);
    }
    to {
        transform: rotate(0deg);
    }
`;

const headerStyle = (uiTheme): any => {
    const backgroundColor = uiTheme === 'light' ? colorPrimary : '#222';

    const tooltip_backgroundColor = uiTheme === 'light' ? '#fff' : 'rgba(66, 66, 66, 0.9)';
    injectGlobal`
    .tooltip_overlay_${uiTheme} {
        // position: relative !important;
        padding-top: 14px !important;
        .${ant_prefix}-tooltip-arrow {
            // margin-top: -6px !important;
            width: 0 !important;
            height: 0 !important;
            margin-top: 3px !important;
            .${ant_prefix}-tooltip-arrow-content {
                width: 5px !important;
                height: 5px !important;
                &::before{
                    background: ${tooltip_backgroundColor} !important;
                }
            }
        }
        .${ant_prefix}-tooltip-content{
            top: -9px;
            .${ant_prefix}-tooltip-inner {
                // margin-top: -6px !important;
                margin-top: -14px !important;
                background: ${tooltip_backgroundColor} !important;
                ${uiTheme === 'light' && 'color: #000000 !important;'}
            }
        }
    }
`;

    return css `
    width: 100%;
    height: 50px;
    background-color: ${backgroundColor};
    position: relative;
    display: flex;
    ${uiTheme === 'dark' && `
    :global .transform-pop-container {
        :global .ant-popover-arrow {
            display: none !important;
        }
        :global .ant-popover-inner {
            background-color: transparent;
            box-shadow: none;
        }
    }
    `}
    `;
};

const workbenchStyle = (uiTheme): any => {
    const workbench_btn_Span_Color = uiTheme === 'light' ? '#222222' : colorPrimary;
    const workbench_btn_Hover_BackgroundColor = uiTheme === 'light' ? colorPrimary : '#3d3d3d';
    return css `
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 32px;
        line-height: 18px;
        cursor: pointer;
        height: 32px;
        ${uiTheme === 'light' ? 'margin-top: 10px;padding: 0 9px;' : 'padding: 10px 9px 9px 10px;height: 100%;'}
        svg {
            width: 18px;
            height: 18px;
            margin-right: 7px;
            ${uiTheme === 'light' ? 'color: #2c2c2c;' : `fill: ${colorPrimary};`}
        }
        span {
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: ${workbench_btn_Span_Color};
            text-align: center;
        }
        &:hover {
            background: ${workbench_btn_Hover_BackgroundColor};
            ${uiTheme === 'light' && `
                box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.5);
                border-radius: 3px;
                border-radius: 3px;
            `}
        }
    `;
};

const headerLeftStyle = (uiTheme): any => {
    const apply_icon_Svg_Fill = uiTheme === 'light' ? '#000': colorPrimary;
    const logo_Hove_After = uiTheme === 'light' ? '#fff' : 'rgba(66, 66, 66, 0.9)';
   
    return css `
        display: flex;
        float: left;
        ${uiTheme === 'dark' && 'background-color: #222;'}
        .apply_icon {
            width: 56px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            > svg {
                fill: ${apply_icon_Svg_Fill};
            }
        }
        .open {
            svg {
                animation: ${turnopen} 0.5s;
                animation-fill-mode: forwards;
            }
        }
        .close {
            svg {
                animation: ${turnclose} 0.5s;
                animation-fill-mode: forwards;
            }
        }
        .logo_${uiTheme} {
            width: 144px;
            height: 50px;
            cursor: pointer;
            // background-color: #000000;
            position: relative;
            text-align: center;
            &:hover {
                // background-color: #3e3e3e;
                &::after {
                    ${uiTheme === 'light' && 'color: #000;'}
                    position: absolute;
                    top: 55px;
                    left: 1px;
                    // transform: translateX(-50%);
                    background: ${logo_Hove_After};
                    border-radius: 4px;
                    width: 145px;
                    height: 30px;
                    padding-top: 4px;
                    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.5);
                    ${uiTheme === 'light' && 'z-index: 10;'}
                }
            }
            img {
                // width: 107px;
                max-width: 500px;
                height: 50px;
                // transform: translateY(4px);
            }
            &.tip_lang_zh-CN {
                &:hover::after {
                    width: 145px !important;
                    content: "\\70b9\\51fb\\8fd4\\56de\\004a\\0075\\0073\\004c\\0069\\006e\\006b\\9996\\9875" !important;
                }
            }
            &.tip_lang_en-US {
                &:hover::after {
                    width: 220px !important;
                    content: "Click to visit JusLink homepage" !important;
                }
            }
        }
    `;
};

const headerRightStyle = (uiTheme): any => {
    const tooltip_icon_SvgFill =  uiTheme === 'light' ? '#222' : colorPrimary;
    const tooltip_icon_Hover =  uiTheme === 'light' ? '#f9b400' : '#3d3d3d';

    return css `
        margin-left: auto;
        display: flex;
        padding-right: 16px;
        .tooltip_icon {
            width: 50px;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            > svg {
                fill: ${tooltip_icon_SvgFill};
            }
            &:hover {
                background-color: ${tooltip_icon_Hover};
            }
        }
        .dividerWarp {
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0 16px;
            .line {
                height: 24px;
                width: 1px;
                background-color: #cb9c00;
            }
        }
        .has-new-bulletin {
            position: relative;
            i {
                position: absolute;
                height: 8px;
                width: 8px;
                border-radius: 50%;
                display: block;
                background-color: #ff6c6c;
                top: 20%;
                right: 18%;
            }
        }
        .not-new-bulletin {
            i {
                display: none;
            }
        }
    `;
};

// ============================== Export ==============================
export {
    headerStyle,
    workbenchStyle,
    headerLeftStyle,
    headerRightStyle
};