/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable camelcase */
import { css } from '@emotion/css';
import { theme } from 'antd';
import { getAntdConfig } from "@jusda-tools/jusda-theme-config";
import downAppPng from '../../../assets/icon/downloadAppQRcode_prod.png';
import wechatIcon from '../../../assets/icon/wechatIcon.png';

// eslint-disable-next-line camelcase, @typescript-eslint/camelcase
const ant_prefix = 'juslink';
const jusdaThemeConfig = {
    token: getAntdConfig('v5'),
};
const { getDesignToken } = theme;

const themeConfig = getDesignToken(jusdaThemeConfig);
const { colorPrimary } = themeConfig;


const qrcodeIconOverlay = (): any => {
    return css `
        padding-top: unset !important;
        .${ant_prefix}-popover-inner{
            padding: unset !important;
            .${ant_prefix}-popover-inner-content {
                padding: unset !important;
            }
        }
    `;
};

const scanQrcodeIconWrapStyle = (uiTheme): any => {
    const svgFill = uiTheme === 'light' ? '#222' : colorPrimary;
    const hoverBackground = uiTheme === 'light' ? '#F9B400' : '#3D3D3D';
    return css `
    height: 50px;
    width: 50px;
    display: flex;
    align-items: center;   
    justify-content: center;
    cursor: pointer;
    >svg{
        fill: ${svgFill};
    }
    &:hover{
        background-color: ${hoverBackground};
    }
    `;
};

const popoverContentStyle = (uiTheme): any => {
    const contentBackground = uiTheme === 'light' ? '#ffffff' : 'rgba(66,66,66,0.90)';
    const textColor = uiTheme === 'light' ? '#000000' : '#ffffff';
    return css `
    margin-top: -1px;
    opacity: 0.9;
    background: ${contentBackground};
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.50);
    display: flex;
    padding: 30px;
    padding-top: 18px;
    padding-bottom: 20px;
    .qrcode-col{
        display: flex;
        flex-direction: column;
        align-items: center;
        .qrcode-icon{
            height: 80px;
            width: 80px;
            margin-bottom: 10px;
            background-size: cover;
        }
        .wechat-icon{
            background-image: url(${wechatIcon});
        }
        .download-icon{
            background-image: url(${downAppPng});
        }
        .desc{
            font-size: 12px;
            color: ${textColor};
            width: 84px;
        }
    }
    .qrcode-col:nth-child(2){
        margin-left: 30px;
    }
    `;
};

// ============================== Export ==============================
export {
    qrcodeIconOverlay,
    scanQrcodeIconWrapStyle,
    popoverContentStyle,
};