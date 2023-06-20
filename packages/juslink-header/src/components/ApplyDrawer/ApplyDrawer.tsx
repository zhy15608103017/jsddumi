/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/interface-name-prefix */
import React, { useState, useEffect } from 'react';
import { ReactSVG } from 'react-svg';
import { Drawer } from 'antd';
// @ts-ignore
import executeStateFN from '../../../utils/globalVariable';
import {
    applyIncon,
    arrow_down,
    arrow_right,
} from '../../assets/svgIcon';
import './applydrawerLight.less';
import './applydrawerDark.less';

interface ApplyDrawerProps {
    visible: boolean;
    showState: any;
    onChangeVisible: Function;
    onChangeShowState: Function;
    language: 'zh-CN' | 'en-US';
    theme?: 'light' | 'dark';
    navigationData: any;
}


const ApplyDrawer: React.FC<ApplyDrawerProps> = (props) => {
    let {
        theme,
        visible,
        onChangeVisible,
        language,
        showState,
        onChangeShowState,
        navigationData = [],
    } = props;
    const [isOrdered, setIsOrdered] = useState([]);
    const [notOrdered, setNotOrdered] = useState([]);
    const [clickState, setClickState] = useState<any>(showState);
    let timer: NodeJS.Timeout | null = null;

    const titleLanguages: any = {
        applyTitle: {
            'zh-CN': '产品及服务', // 中文
            'en-US': 'Products' // 英文
        },
        otherApplyTitle: {
            'zh-CN': '其他产品',
            'en-US': 'Others'
        },
        notorder: {
            'zh-CN': '未订购',
            'en-US': 'Not ordered'
        }
    };

    useEffect(() => {
        setClickState(undefined);
    }, [])

    useEffect(() => {
        /* eslint-disable */
        //@ts-ignore
        const { isIntranet, root_domain } = window.jusdaBaseConfig;
        if (isIntranet && root_domain && root_domain.length > 0) {
            navigationData.forEach((item)=>{
                item.url = item.url.replace('.jus-link.com', root_domain);
                item.icon = item.icon.replace('.jus-link.com', root_domain);
            })
        }
        const isOrdered = navigationData.filter((item: any) => {
            return item.ordered;
        });
        const notOrdered = navigationData.filter((item: any) => {
            return !item.ordered;
        });
        
        setIsOrdered(isOrdered);
        setNotOrdered(notOrdered);
    }, [navigationData])

    const getDescribed = (item: any) => {
        return language === 'en-US' ? item.enName : item.name;
    };

    const moveInDraw = () => {
        timer = null;
        executeStateFN.setData(false);
        onChangeVisible(true);
    };

    const moveOutDraw = () => {
        executeStateFN.setData(true);
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(() => {
            executeStateFN.getData() && onChangeVisible(false);
        }, 100);
    };

    const itemClickHandler = (item: any) => {
        if (item.url && item.ordered) {
            window.open(item.url, 'target');
            moveOutDraw();
        }
    };

    const showStateHandler = () => {
        onChangeShowState(!showState);
        setClickState(!(clickState || false));
    }

    // @ts-ignore
    const productCode = window?.jusdaBaseConfig?.productCode;

    return (
        <Drawer
            className={`jusda_header_drawer_${theme}`}
            title={null}
            placement='left'
            closable={false}
            visible={visible}
            getContainer={false}
            destroyOnClose={true}
        // onClose={onChangeVisible(false)}
        >
            <div className="content_div"
                onMouseEnter={moveInDraw}
                onMouseLeave={moveOutDraw}
            >
                <div style={{ height: 'auto' }}>
                    <div className="title">
                        {applyIncon}
                        <span title={titleLanguages?.applyTitle[language]}>{titleLanguages?.applyTitle[language]}</span>
                    </div>
                    <div className="cross_line"></div>
                    <div className="apply_isordered_content">
                        {
                            isOrdered.map((item: any, index: any) => {
                                const currentProduct = item.ordered && item.code === productCode;
                                return (
                                    <div
                                        key={item.code}
                                        className={`item ${currentProduct ? 'currentProduct' : ''}`}
                                        onClick={() => itemClickHandler(item)}
                                    >
                                        <ReactSVG className="svg_icon" src={item.icon} />
                                        {/* <div className="svg_icon" dangerouslySetInnerHTML={{ __html: item.svgIcon }} /> */}
                                        <span className="item_title">{getDescribed(item)}</span>
                                    </div>
                                );
                            })
                        }
                    </div>
                    {notOrdered && notOrdered.length > 0 ?
                        (
                            <>
                                <div className="cross_line"></div>
                                <div className="notordered_title" onClick={showStateHandler}>
                                    <span className="title_name" title={titleLanguages?.otherApplyTitle[language]}>
                                        {titleLanguages?.otherApplyTitle[language]}{showState ? arrow_down : arrow_right}
                                    </span>
                                </div>
                                <div className={`apply_notordered_content`}>
                                    <div className={`${clickState === undefined ? (showState ? 'contentshow' : 'contenthide') : ''}
                                ${(showState === true && clickState !== undefined) ? 'divshow' : ''}
                                ${(showState === false && clickState !== undefined) ? 'divhide' : ''}`
                                    }>
                                        {
                                            notOrdered.map((item: any, index: any) => {
                                                const currentProduct = item.ordered && item.code === productCode;
                                                return (
                                                    <div
                                                        key={item.code}
                                                        className={`item item_disabled ${currentProduct ? 'currentProduct' : ''}`}
                                                        onClick={() => itemClickHandler(item)}
                                                    >
                                                        <ReactSVG className="svg_icon" src={item.icon} />
                                                        {/* <div className="svg_icon" dangerouslySetInnerHTML={{ __html: item.svgIcon }} /> */}
                                                        <span className="item_title">{getDescribed(item)}</span>
                                                        <span className="item_notorder" title={titleLanguages?.notorder[language]}>
                                                            {titleLanguages?.notorder[language]}
                                                        </span>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            </>
                        )
                        : null}

                </div>
            </div>
        </Drawer>
    );
};

export default ApplyDrawer;
