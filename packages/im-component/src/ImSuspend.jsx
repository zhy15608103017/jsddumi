import * as React from 'react'
import IframeModal from './IframeModal.jsx'
import Draggable from 'react-draggable';
import getCfgTypeUrl from './envConfig.js';
import "./styles/imSuspend.less"
import sendBusiness from './utils/sendBusinessData';
import getIMInfoReq from './utils/getIMInfoByUserId';
import request from '@jusda-tools/web-api-client';
import { message } from 'antd';
import locales from './locales'
import { currentLanguage } from '@jusda-tools/language-control-panel'

const imSvg = require('./assets/img/IM.svg')
const remind = require("./assets/img/remind.gif")

export default class ImSuspend extends React.Component {
    constructor(props) {
        super(props)
        const config = getCfgTypeUrl();
        const configLocales = locales.get(currentLanguage())
        this.state = {
            visible: false,
            moveX: 0,
            moveY: 0,
            config,
            configLocales,
            imUrl: undefined,
            msgState: null,
            isShowCustomer: false,
            imUserData: null,
            dialogId: null,
            crmCode: null,
            businessList: null,
            userId: props.userId,
        }
    }
    async componentDidMount() {
        const { isMsgRemind, tenantCode, imCallBack, imMsgCallBack } = this.props;

        // 判断是否开启未读消息提醒
        if (isMsgRemind) {
            this.getMsgStateFun();
            this.msgStateTimeOut = setInterval(() => {
                this.getMsgStateFun();
                imMsgCallBack&&imMsgCallBack();
            }, 10000);
        }
        let tenantData;
        if (tenantCode) {
            // 获取用户crmcode
            tenantData = await getIMInfoReq.getCrmCode(tenantCode);
        }
        if (tenantData && tenantData.company && tenantData.company.crmCode) {
            // 获取白名单crmcode 
            const whitelist = await getIMInfoReq.getWhiteUser();
            const isWhiteUser = whitelist[0].value.includes(tenantData.company.crmCode);
            if (isWhiteUser) {
                // 获取客服绑定的userId
                const userData = await getIMInfoReq.getUserId({ jusdaDomainAccountEq: whitelist[1].value });
                if(userData.userId) {
                    this.setState(() => ({
                        userId: userData.userId
                    }));
                }
            } else {
                const businessList = await getIMInfoReq.getCustomerCode({ crmCode: tenantData.company.crmCode });
                this.setState(() => ({
                    crmCode: tenantData.company.crmCode,
                    businessList: businessList && businessList.length > 0 ? businessList : null
                }));
            }
        }
        imCallBack&&imCallBack();
        window.addEventListener('message', event => {
            if (event.data === 'close') {
                this.setState(() => ({
                    visible: false,
                    imUrl: undefined,
                }))
            } else if (event.data === 'hide') {
                this.setState(() => ({
                    visible: false,
                }))
            }
        })
    }

    componentWillMount() {
        if (this.msgStateTimeOut) {
            clearTimeout(this.msgStateTimeOut);
        }
    }

    // 获取客服与客户userId，创建群聊并打开im系统
    selectCustomer = async (data) => {
        // console.log('selectCustomer2:', this.props);
        const { orderId, businessData, baseUrl } = this.props;
        const { crmCode, configLocales } = this.state;
        const params = {
            // businessCode: data.key,
            siteCode: data.key,
            crmCode,
            orderCode: orderId || '',
        }
        // 获取客服工号
        const jobNumber = await getIMInfoReq.getEmployeeInfo(params);
        // 获取客服绑定的userId
        const userData = await getIMInfoReq.getUserId({ jusdaDomainAccountEq: jobNumber });
        if (!userData || !userData.userId) {
            message.error(configLocales.configError);
            return;
        }
        // 获取客服账号信息
        const { config: { imRedirectUrl } } = this.state;
        const imUserData = await this.getUserId(userData.userId);
        this.setState({
            imUserData: imUserData
        });
        // 获取当前登录的账号信息
        const fromUserData = await getIMInfoReq.getFromIMInfo();
        // 判断是否绑定客服与客户为同一人
        if (imUserData[0].userId === fromUserData.userId) {
            message.error(this.state.configLocales.sessionError)
            return;
        }

        // 检测是否重复创建群组
        const dialogData = await this.checkGroup(data.key, fromUserData);
        // console.log('dialogId:', dialogId);

        const businessParams = {
            businessData: JSON.stringify(businessData) || null,
            dialogId: dialogData.dialogId,
            groupId: dialogData.groupId
        }
        if (dialogData.groupId) {
            // 更新业务数据
            sendBusiness.updateBusinessData(businessParams).then((res) => {
                if (res && res.success) {
                    this.setState({
                        isShowCustomer: false,
                        imUrl: `${baseUrl ? baseUrl : imRedirectUrl}?toaccount=${imUserData[0].imUsername}&orderid=${orderId}&type=simple&businesscode=${data.key}&dialogtype=${crmCode ? 'team' : ''}&tonickName=${imUserData[0].nickName}&dialogid=${dialogData.dialogId}`
                    })
                }
            })
        } else {
            this.setState({
                isShowCustomer: false,
                imUrl: `${baseUrl ? baseUrl : imRedirectUrl}?toaccount=${imUserData[0].imUsername}&orderid=${orderId}&type=simple&businesscode=${data.key}&dialogtype=${crmCode ? 'team' : ''}&tonickName=${imUserData[0].nickName}&dialogid=${dialogData.dialogId}`
            })
        }

    }

    async checkGroup(businessCode, fromUserData) {
        const { businessData } = this.props;
        const params = {
            extra: businessCode,
            owner: fromUserData.imUsername,
        }
        const groupData = await getIMInfoReq.checkGroup(params)
        // console.log('groupData:', groupData);
        if (groupData && groupData.data && groupData.success) {
            const business = await sendBusiness.getBusinessData(groupData.data.id)
            return { dialogId: business.data.dialogId, groupId: business.data.groupId }
        } else if (groupData && !groupData.data && groupData.success) {
            const business = await sendBusiness.sendBusinessDataGroup(businessData)
            // console.log('businessData:', business)
            return { dialogId: business.data.dialogId }
        }
    }

    // 已默认选择需要联系的对象
    openDefaultIM = async () => {
        const { crmCode, userId, configLocales } = this.state
        // console.log(crmCode);
        const { orderId, businessData, baseUrl } = this.props;
        if (!userId && !crmCode) {
            message.error(configLocales.configError);
            return;
        }
        if (crmCode && !userId) {
            this.setState({
                isShowCustomer: true
            })
            return;
        }
        const { config: { imRedirectUrl } } = this.state;
        const imUserData = await this.getUserId(userId);
        this.setState({
            imUserData: imUserData
        });
        sendBusiness.sendBusinessData(businessData, userId).then(res => {
            if (res && res.success) {
                const params = {
                    businessData: JSON.stringify(businessData) || null,
                    dialogId: res.data.dialogId,
                }
                sendBusiness.updateBusinessData(params).then((dialog) => {
                    if (dialog && dialog.success) {
                        this.setState({
                            isShowCustomer: false,
                            imUrl: `${baseUrl ? baseUrl : imRedirectUrl}?toaccount=${imUserData[0].imUsername}&orderid=${orderId}&type=simple`
                        })
                    }
                })
            } else {
                message.error(res.message);
            }
        });
    }

    // 获取用户id  
    async getUserId(userId) {
        const params = typeof userId === 'string' ? [userId] : userId;
        const imUserData = await getIMInfoReq.getIMInfo(params)
        return imUserData;
    }

    // 获取用户是否有未读消息
    async getMsgStateFun() {
        const { config: { imApiUrl } } = this.state;
        const imMsgState = await request.get(`${imApiUrl}/message/getMessageAlert`);
        const { success, errorCode } = imMsgState;
        if (success === true) {
            this.setState({
                msgState: imMsgState.data,
            });
        }
        // 未登录验证
        if (['403', '40012', '40001'].includes(errorCode)) { // 403 清空timer
            clearTimeout(this.msgStateTimeOut);
        }
    }

    hideModal = () => {
        const { closeIM } = this.props;
        closeIM && closeIM();
        this.setState(() => ({
            visible: false,
        }))
    }

    // 判断每次拖动距离判断事件类型:
    // 1、当拖动距离大于或等于5px时，判定为拖动事件，此时不打开iframe弹窗
    // 2、当拖动距离小于5px时，判定为点击事件，此时打开iframe弹窗
    // 3、每次拖动或点击完成后会保存当前位置与下次拖动进行比较
    moveStop = async (e) => {
        const { moveX, moveY } = this.state
        if (Math.abs(e.layerX - e.offsetX - moveX) < 5 && Math.abs(e.layerY - e.offsetY - moveY) < 5) {
            await this.openDefaultIM()
            this.setState(() => ({
                visible: true,
                moveX: e.layerX - e.offsetX,
                moveY: e.layerY - e.offsetY
            }))
        } else {
            this.setState(() => ({
                visible: false,
                moveX: e.layerX - e.offsetX,
                moveY: e.layerY - e.offsetY
            }))
        }
    }

    render() {
        let { imUrl, msgState, content, visible, isShowCustomer, configLocales, crmCode, businessList, userId } = this.state;
        const { isMsgRemind, defaultPosition, isShowModal, hideOpenImg } = this.props;
        const show = hideOpenImg?!hideOpenImg:businessList || userId
        return (
            <div>
                {
                    show && <Draggable handle=".im-open" onStop={this.moveStop} bounds={'body'}>
                        <div title={configLocales.dragTooltip} className="im-open" style={{ ...defaultPosition, display: visible ? 'none' : 'block' }}>
                            {isMsgRemind && msgState && msgState.generalMsgRead ? <img src={remind} className="im-remind-img" /> : null}
                            {content ? content : <img src={imSvg} className="im-open-img" />}
                        </div>
                    </Draggable>
                }
                <IframeModal
                    onCancel={this.hideModal}
                    selectCustomer={this.selectCustomer}
                    visible={visible || isShowModal}
                    imUrl={imUrl}
                    isShowCustomer={isShowCustomer}
                    businessList={businessList}
                    crmCode={crmCode} />
            </div>
        );
    }
}