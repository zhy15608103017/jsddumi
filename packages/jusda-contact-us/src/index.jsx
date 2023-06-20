import React, { useRef, useState, useEffect } from "react";
import { Popover, ConfigProvider } from 'antd';
import './index.less';
import locales from './locales'
import { currentLanguage } from '@jusda-tools/language-control-panel'
import { ImSuspend } from '@jusda-tools/im-component'
import Feedback, { Sdp } from '@jusda-tools/jusda-feedback';
import Draggable from 'react-draggable';
import { mp_domain_prefix } from '@jusda-tools/url-config';

const imSvg = require('./assets/imIcon.svg')
const contactSvg = require('./assets/contact.svg')
const JusAISvg = require('./assets/openAITitle.png')
const feedbackSvg = require('./assets/feedback.svg')
const remind = require('./assets/remind.gif')
const configLocales = locales.get(currentLanguage())

window.Sdp = new Sdp();

export default function ContactUs(props) {
    const [locales, setLocales] = useState(configLocales);
    const [isShowImModal, setIsShowImModal] = useState(false);
    const [isShowFeedback, setIsShowFeedback] = useState(false);
    const [showIm, setShowIm] = useState(false);
    const [showRemind, setShowRemind] = useState(false);
    const [JusAIVisible, setJusAIVisible] = useState(false);

    const imRef = useRef();

    const { isShowJusdaAI = true, jusdaAIIcon } = props;
    const JusAIUrl = `${mp_domain_prefix}/im/#/?type=OpenAI`;
    const closeIcon = (<svg t="1624347187587" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16765" width="24" height="24"><path d="M822.624 246.624a32 32 0 0 0-45.248-45.248L512 466.752 246.624 201.376a32 32 0 0 0-45.248 45.248L466.752 512l-265.376 265.376a32 32 0 1 0 45.248 45.248L512 557.248l265.376 265.376a32 32 0 0 0 45.248-45.248L557.248 512l265.376-265.376z" p-id="16766" fill="#97979F"></path></svg>)

    const openIm = () => {
        setIsShowImModal(true);
        imRef.current && imRef.current.openDefaultIM();
    }

    const openJusAI = () => {
        setJusAIVisible(true);
    }

    const closeIm = () => {
        setIsShowImModal(false);
    }

    const feedbackModal = () => {
        setIsShowFeedback(!isShowFeedback);
    }

    const PopoverContent = () => {
        return (
            <div className="jusda-popover-content">
            {
                isShowJusdaAI&&<div onClick={openJusAI}>
                    <div className="title">
                        {jusdaAIIcon?jusdaAIIcon:<img src={JusAISvg} />}
                        <div>{locales.JusAI}</div>
                    </div>
                    <div className="tip">
                        {locales.JusAITip}
                    </div>
                </div>
            }
            {
                showIm && (
                    <div onClick={openIm}>
                        <div className="title">
                            <img src={contactSvg} alt="" />
                            <div>{locales.imTitle}</div>
                            {showRemind ? <img src={remind} className="remind-img" /> : null}
                        </div>
                        <div className="tip">
                            {locales.imTip}
                        </div>
                    </div>
                )
            }
            <div onClick={feedbackModal}>
                <div className="title">
                    <img src={feedbackSvg} alt="" />
                    <div>{locales.feedbackTitle}</div>
                </div>
                <div className="tip">
                    <div>{locales.feedbackTip}</div>
                </div>
            </div>
            </div>
        )
    };

    const imCallBack = () => {
        if (imRef.current) {
            const imState = imRef.current.state
            const { businessList, userId } = imState
            if(businessList || userId) {
                setShowIm(true);
            }
        }
    }

    const imMsgCallBack = () => {
        if (imRef.current) {
            const imState = imRef.current.state
            if (imState.msgState && imState.msgState.generalMsgRead && props.isMsgRemind) {
                setShowRemind(true);
            }
        }
    }

    useEffect(() => {
        imCallBack();
        imMsgCallBack();
    }, [imRef])

    return (
        <ConfigProvider prefixCls="juslink">
            <div className="jusda-contact-us">
                
                <Draggable handle={'.contact-us-container'} bounds={'body'}>
                    <div className="contact-us-container" style={{ ...(props.defaultPosition || { right: '16px', bottom: '16px' }) }}>
                        {
                            isShowImModal || JusAIVisible ? null : (
                                <Popover
                                    placement="left"
                                    getPopupContainer={triggerNode => triggerNode.parentNode}
                                    title={null}
                                    destroyTooltipOnHide={true}
                                    content={<PopoverContent />}
                                >
                                    <img className="jusda-contact-img" src={imSvg} alt="" />
                                    <div className={'jusda-contact ' + (currentLanguage() === 'zh-CN' ? 'jusda-contact-zh' : 'jusda-contact-en')}>
                                        <span>{locales.header}</span>
                                    </div>
                                </Popover>
                            )
                        }
                    </div>
                </Draggable>
                <ImSuspend
                    ref={imRef}
                    hideOpenImg
                    isShowModal={isShowImModal}
                    imCallBack={imCallBack}
                    imMsgCallBack={imMsgCallBack}
                    closeIM={closeIm}
                    {...props}
                />
                <Feedback isModalVisible={isShowFeedback} closeModalCallback={feedbackModal} />
                {
                    JusAIVisible && (
                        <div className="JusAI">
                            <div onClick={() => setJusAIVisible(false)} className="JusAI-close-icon" >
                                {closeIcon}
                            </div>
                            <iframe
                                allow="microphone;camera"
                                className="JusAI-iframe"
                                src={JusAIUrl}>
                            </iframe>
                        </div>
                    )
                }
                
            </div>
        </ConfigProvider>
    )
}