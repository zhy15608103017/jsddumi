/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/interface-name-prefix */
/* eslint-disable */
// @ts-nocheck
import React, { useState, useEffect } from 'react';
import request from '../utils/request';
import { authCodes } from '../utils/commonData';
import { ConfigProvider, Divider, Tooltip } from 'antd';
import ApplyDrawer from './components/ApplyDrawer/ApplyDrawer';
// @ts-ignore
import QrcodeIcon from './components/QrcodeIcon';
// @ts-ignore
import UserControlPanel from '@jusda-tools/user-control-panel';
// @ts-ignore
import { mp_workbench_url } from '@jusda-tools/url-config';
import { getAntdConfig } from "@jusda-tools/jusda-theme-config";
import authSwitch from '@jusda-tools/auth-switch';
import { flod } from './assets/svgIcon';
// @ts-ignore
import executeStateFN from '../utils/globalVariable';
import { announcementIcon, helpIcon, taskCenterIcon, workbenchIcon } from './icon';
import { websitePathsBackup } from '../utils/websiteUrls';
import { headerStyle, workbenchStyle, headerLeftStyle, headerRightStyle } from './styles/index';
// import './styles/dark.less';
// import './styles/light.less';
// @ts-ignore
// eslint-disable-next-line
// import logo_noBg from "./assets/icon/logo_noBg.png";
import Juslinklogo from "./assets/icon/Juslinklogo.png";

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
    const { AuthorizedSwitchWrap } = authSwitch;
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [hasNewBulletin, setHasNewBulletin] = useState(false);
    const [language, setLanguage] = useState<LocaleType>('en-US');
    const [navigationData, setNavigationData] = useState([]);
    const [showState, setShowState] = useState(undefined);
    const [logoInfo, setLogoInfo] = useState({});
    const [hasFetchedLogo, setHasFetchedLogo] = useState(false);

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

    const getLogoAndIcon = () => {
        // 调用中台获取图标信息
        request('/me/list', {
            method: 'POST',
            prefix: '/juslink-common-config/tenants',
            data: {
                keysIn:["brower_tag_icon","tenant_logo"],
                appIdEq:"TENANT_MANAGEMENT",
                groupCodeEq:"Tenant_mg_conf"
            }
        }).then(response => {
            let { success, data } = response;
            if (success && data) {
                let initObject = {};
                try {
                    data.forEach((item)=>{
                        initObject[item.key] = item.value === '' ? null : item.value;
                    })
                } catch (error) {
                    console.log('error: ', error);
                }
                setLogoInfo(initObject);
            }
        }).catch(e => {
            console.error(e);
        }).finally(() => {
            setHasFetchedLogo(true);
        });
    }

    useEffect(() => {
        if(logoInfo.brower_tag_icon){
            const link = document.querySelector("link[rel*='icon']") || document.createElement("link");
            link.type = "image/x-icon";
            link.rel = "shortcut icon";
            link.href = logoInfo.brower_tag_icon;  //icon图标
            document.getElementsByTagName("head")[0].appendChild(link);
        }
    },[logoInfo])

    useEffect(() => {
        LANGS.includes(locale as LocaleType) && setLanguage(locale as LocaleType);
    }, [locale]);

    useEffect(() => {
        // 调用中台获取数据
        request('/base-list/home', {
            method: 'GET',
            prefix: '/usercenter-service/applications',
            data: {}
        }).then(response => {
            if (response.success && response.data) {
                setNavigationData(response.data);
            }
        }).catch(e => { console.error(e); });
        getLogoAndIcon();
    }, []);


    useEffect(() => {
        request('/message-service/bulletin-documents/is-new', {
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
        <ConfigProvider
            prefixCls="juslink"
            theme={{
                token: getAntdConfig('v5'),
            }}
        >
            <div className={`${headerStyle(theme)} juslink-${theme}`}>
                <div className={`${headerLeftStyle(theme)} header_left transform-pop-container`}>
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
                                    {hasFetchedLogo && <img src={logoInfo.tenant_logo ? logoInfo.tenant_logo : Juslinklogo} />}
                                </div>
                            )
                    }
                    {
                        showWorkbench &&
                        <div className={`${workbenchStyle(theme)} workbench_btn`} onClick={orkbenchOnClick}>
                            {workbenchIcon}
                            <span>{internationalMap.get(language)['intl.工作台']}</span>
                        </div>
                    }
                </div>
                <div className={`${headerRightStyle(theme)} header_right`}>
                    {leftReactNode}
                    <AuthorizedSwitchWrap authCode={authCodes.headerTaskCtr}>
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
                    </AuthorizedSwitchWrap>
                    <AuthorizedSwitchWrap authCode={authCodes.headerDownload}>
                        <QrcodeIcon
                            locale={locale}
                            theme={theme}
                        />
                    </AuthorizedSwitchWrap>
                    <AuthorizedSwitchWrap authCode={authCodes.headerNoticeCtr}>
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
                    </AuthorizedSwitchWrap>
                    <AuthorizedSwitchWrap authCode={authCodes.headerHelpCenter}>
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
                    </AuthorizedSwitchWrap>
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
