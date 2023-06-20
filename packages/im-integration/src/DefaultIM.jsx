import React, { Component } from 'react';
import { imIcons } from './icons/index.jsx';
import envConfig from './envConfig.js';
import { ConfigProvider, message } from 'antd';
import sendData from './utils/sendData';
import getIMInfoReq from './utils/getIMInfoByUserId';
import request from '@jusda-tools/web-api-client';
import './styles/defaultim.less';

class DefaultIM extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msgState: null,
            config: envConfig
        };
    }

    componentDidMount() {
        // 获取用户是否有未读消息
        const { isMsgRemind } = this.props;
        if (isMsgRemind) {
            this.getMsgStateFun();
            this.msgStateTimeOut = setInterval(() => {
                this.getMsgStateFun();
            }, 10000);
        }
    }

    componentWillMount() {
        if (this.msgStateTimeOut) {
            clearTimeout(this.msgStateTimeOut);
        }
    }

    // 已默认选择需要联系的对象
    async openDefaultIM () {
        const { orderId, userId, businessData } = this.props;
        if(!userId) { 
            message.error('The User ID does not exist!');
            return;
        }
        const { config: { imRedirectUrl } } = this.state;
        const data = await this.getUserId(userId);
        const user = {
            userId,
        }

        sendData.sendBusinessData(businessData, user).then(res => {
            if (res && res.success) {
                window.open(`${imRedirectUrl}?toaccount=${data[0].imUsername}&orderid=${orderId}`);
            } else {
                message.error(res.message);
            }
        });
    }

    // 获取用户id
    getUserId(userId) {
        const params = typeof userId === 'string' ? [userId] : userId;
        return new Promise((resolve, reject) => {
            getIMInfoReq.getIMInfo(params).then(res => {
                if (res && res.success) {
                    resolve(res.data);
                } else {
                    message.error(res.message);
                    reject();
                }
            });
        });
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
        if (['403'].includes(errorCode)) { // 403 清空timer
            clearTimeout(this.msgStateTimeOut);
        }
    }

    render() {
        const { themeType = 'dark', content, isMsgRemind = false } = this.props; // 主题类型
        const { msgState } = this.state;
        return (
            <ConfigProvider prefixCls="imant">
                {content ?
                    <div className="im-custom-icon" onClick={this.openDefaultIM.bind(this)}>
                        {isMsgRemind && msgState?.generalMsgRead ? <img src={require('./assets/img/remind.gif')} /> : null}
                        {content}
                    </div>
                    :
                    <div className="im-icon" onClick={this.openDefaultIM.bind(this)}>
                        {isMsgRemind && msgState?.generalMsgRead ? <img src={require('./assets/img/remind.gif')} /> : null}
                        {imIcons[themeType].imIcon}
                    </div>
                }
            </ConfigProvider>
        );
    }
}

export default DefaultIM;
