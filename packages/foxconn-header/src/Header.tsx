/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/interface-name-prefix */
/* eslint-disable */
// @ts-nocheck
import React, { useState, useEffect } from 'react';
import request from '@jusda-tools/web-api-client';
import { ConfigProvider, Divider, Tooltip } from 'antd';
import ApplyDrawer from './components/ApplyDrawer/ApplyDrawer';
// @ts-ignore
import QrcodeIcon from './components/QrcodeIcon';
// @ts-ignore
import UserControlPanel from '@jusda-tools/user-control-panel';
// @ts-ignore
import { mp_workbench_url } from '@jusda-tools/url-config';
import { flod } from './assets/svgIcon';
// @ts-ignore
import executeStateFN from '../utils/globalVariable';
import { announcementIcon, helpIcon, taskCenterIcon, workbenchIcon } from './icon';
import { websitePathsBackup } from '../utils/websiteUrls';
import { mpApiUrl } from '@jusda-tools/url-config';
import './styles/dark.less';
import './styles/light.less';
// @ts-ignore
// eslint-disable-next-line
import { foxconnIcon } from "./assets/svgIcon";

type LocaleType = 'zh-CN' | 'en-US';

interface OpenTargetTabConfigType {
    helpCenter?: boolean;
    announcementCenter?: boolean;
    personalCenter?: boolean;
    messagesCenter?: boolean;
}

interface UserIdentitySwitcherType {
    enable?: boolean;
    requirePermission?: boolean;
    subMenuWrapClassName?: string;
}
interface HeaderProps {
    locale?: LocaleType;
    theme?: 'light' | 'dark';
    showNavigation?: boolean;
    showWorkbench?: boolean;
    showTaskCenter?: boolean;
    onLogout?: () => void;
    onIdentityChange?: () => void;
    logoReplaceReactNode?: React.ReactNode;
    leftReactNode?: React.ReactNode;
    rightReactNode?: React.ReactNode;
    userIdentitySwitcher?: UserIdentitySwitcherType;
    openTargetTabConfig?: OpenTargetTabConfigType;
}

const LANGS = ['zh-CN', 'en-US'];

const internationalMap = new Map()
    .set('zh-CN', {
        'intl.工作台': '工作台',
        'intl.帮助中心': '帮助中心',
        'intl.公告中心': '公告中心',
        'intl.首页logo': '点击返回JusLink首页',
        'intl.任务中心': '任务中心'
    })
    .set('en-US', {
        'intl.工作台': 'Work Space',
        'intl.帮助中心': 'Help Center',
        'intl.公告中心': 'Announcement Center',
        'intl.首页logo': 'Click to visit JusLink homepage',
        'intl.任务中心': 'Task Center'
    });

const Header: React.FC<HeaderProps> = (props) => {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [hasNewBulletin, setHasNewBulletin] = useState(false);
    const [language, setLanguage] = useState<LocaleType>('en-US');
    const [navigationData, setNavigationData] = useState([]);
    const [showState, setShowState] = useState(undefined);

    const {
        locale,
        theme = 'light',
        onLogout,
        onIdentityChange,
        showNavigation = true,
        showWorkbench = true,
        logoReplaceReactNode = null,
        leftReactNode = null,
        rightReactNode = null,
        userIdentitySwitcher,
        openTargetTabConfig
    } = props;

    // @ts-ignore
    const { isIntranet } = window.jusdaBaseConfig;

    let timer: NodeJS.Timeout | null = null;

    const onChangeVisible = (state: boolean) => {
        setDrawerVisible(state);
    };

    const onChangeShowState = (state: any) => {
        setShowState(state);
    };

    const moveInDraw = () => {
        executeStateFN.setData(false);
        setDrawerVisible(true);
    };

    const moveOutDraw = () => {
        executeStateFN.setData(true);
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(() => {
            executeStateFN.getData() && setDrawerVisible(false);
        }, 100);
    };

    const logoClick = () => {
        window.open(mp_workbench_url, 'target');
    };

    const orkbenchOnClick = () => {
        window.open(mp_workbench_url, 'target');
    }

    useEffect(() => {
        LANGS.includes(locale as LocaleType) && setLanguage(locale as LocaleType);
    }, [locale]);

    useEffect(() => {
        // 调用中台获取数据
        request(mpApiUrl + '/usercenter-service/applications/base-list/home', {
            method: 'GET',
            data: {}
        }).then(response => {
            if (response.success && response.data) {
                setNavigationData(response.data);
            }
        }).catch(e => { console.error(e); });
    }, []);


    useEffect(() => {
        request(mpApiUrl + '/bulletin-center/bulletin-documents/is-new', {
            method: 'GET',
        }).then(response => {
            if (response.success && response.data) {
                setHasNewBulletin(true);
            }
        }).catch(e => { console.error(e); });
    }, []);

    const goWebsite = (type: 'ac' | 'ch' | 'tc') => {
        const url = websitePathsBackup[type];
        if ((openTargetTabConfig?.helpCenter && type === 'ch') || (openTargetTabConfig?.announcementCenter && type === 'ac')) {
            window.location.href = url;
        } else {
            window.open(url, '_blank');
        }
    };

    return (
        <ConfigProvider prefixCls="foxconn">
            <div className={`foxconn-${theme}`}>
                <div className="header_left transform-pop-container">
                    {
                        showNavigation &&
                        <div className={`apply_icon ${drawerVisible ? 'open' : 'close'}`} onMouseEnter={moveInDraw} onMouseLeave={moveOutDraw}>
                            {flod}
                        </div>
                    }
                    {
                        logoReplaceReactNode ? logoReplaceReactNode :
                            (
                                <div className={`logo_${theme} ${isIntranet !== true ? `tip_lang_${language}` : ''}`} onClick={logoClick}>
                                    {foxconnIcon}
                                </div>
                            )
                    }
                    {
                        showWorkbench &&
                        <div className="workbench_btn" onClick={orkbenchOnClick}>
                            {workbenchIcon}
                            <span>{internationalMap.get(language)['intl.工作台']}</span>
                        </div>
                    }
                </div>
                <div className="header_right">
                    {leftReactNode}
                    {
                        props.showTaskCenter ? (
                            <Tooltip
                                transitionName=""
                                overlayClassName={`tooltip_overlay_${theme}`}
                                title={internationalMap.get(language)['intl.任务中心']}
                                >
                                <div
                                    className="tooltip_icon"
                                    onClick={() => goWebsite('tc')}
                                >{taskCenterIcon} <i /></div>
                            </Tooltip>
                        ) : null
                    }
                    <QrcodeIcon
                        locale={locale}
                        theme={theme}
                    />
                    <Tooltip
                        transitionName=""
                        overlayClassName={`tooltip_overlay_${theme}`}
                        title={internationalMap.get(language)['intl.公告中心']}
                    >
                        <div
                            className={`tooltip_icon ${hasNewBulletin ? 'has-new-bulletin' : 'not-new-bulletin'}`}
                            onClick={() => goWebsite('ac')}
                        >{announcementIcon} <i /></div>
                    </Tooltip>
                    <Tooltip
                        transitionName=""
                        overlayClassName={`tooltip_overlay_${theme}`}
                        title={internationalMap.get(language)['intl.帮助中心']}
                    >
                        <div
                            className="tooltip_icon"
                            onClick={() => goWebsite('ch')}
                        >{helpIcon}</div>
                    </Tooltip>
                    {rightReactNode}
                    <div className="dividerWarp">
                        <div className="line" />
                    </div>
                    <UserControlPanel
                        locale={locale}
                        theme={theme}
                        onLogout={onLogout}
                        openTargetTabConfig={openTargetTabConfig}
                        onIdentityChange={onIdentityChange}
                        userIdentitySwitcher={userIdentitySwitcher}
                    />
                </div>
                {showNavigation && drawerVisible && <ApplyDrawer
                    visible={drawerVisible}
                    onChangeVisible={onChangeVisible}
                    showState={showState}
                    onChangeShowState={onChangeShowState}
                    language={language}
                    theme={theme}
                    navigationData={navigationData}
                />
                }
            </div>
        </ConfigProvider>
    );
};

export default Header;
