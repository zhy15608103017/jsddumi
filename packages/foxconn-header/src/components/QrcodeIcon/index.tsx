/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { Dropdown } from 'antd';
import { qrcodeIcon } from './icons';
// @ts-ignore
import LocalPermissionWrap from '@jusda-tools/local-permission';
import './styles/dark.less';
import './styles/light.less';

const internationalMap = new Map()
    .set('zh-CN', {
        'intl.扫码关注公众号': '扫码关注公众号',
        'intl.扫码下载客户端': '扫码下载客户端'
    })
    .set('en-US', {
        'intl.扫码关注公众号': 'The official account',
        'intl.扫码下载客户端': 'JusLink APP',
    });


interface ScanQrcodeIconProps {
    theme?: 'light' | 'dark';
    locale?: 'zh-CN' | 'en-US';
}
const ScanQrcodeIcon: React.FC<ScanQrcodeIconProps> = (props) => {
    const { locale = 'en-US', theme = 'light' } = props;
    return (
        <Dropdown
            overlay={(
                <div className="dropdown-content">
                    <LocalPermissionWrap>
                        <div className="qrcode-col">
                            <div className="qrcode-icon wechat-icon" />
                            <div className="desc">
                                {internationalMap.get(locale)['intl.扫码关注公众号']}
                            </div>
                        </div>
                    </LocalPermissionWrap>
                    <div className="qrcode-col">
                        <div className="qrcode-icon download-icon" />
                        <div className="desc">
                            {internationalMap.get(locale)['intl.扫码下载客户端']}
                        </div>
                    </div>
                </div>
            )}
            transitionName=""
            overlayClassName={`scan-qrcode-icon-overlay-${theme}`}
            placement="bottomRight"
        >
            <div className={`scan-qrcode-icon-wrap-${theme}`}>
                {qrcodeIcon}
            </div>
        </Dropdown>
    );
};

export default ScanQrcodeIcon;
