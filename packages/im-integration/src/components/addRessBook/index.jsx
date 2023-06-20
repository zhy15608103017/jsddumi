import React, { Component } from 'react';
import { getInitial } from '../../utils/wordprocess';
import sendData from '../../utils/sendData';
import { Collapse, message } from 'antd';
const { Panel } = Collapse;
import envConfig from '../../envConfig.js';
import { themeClass } from './constant';
import 'antd/es/collapse/style/index.less';
import './index.less';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addRessBookList : this.props.addRessBookList,
            config: envConfig,
        };
    }

    // 联系人点击
    contactOnClick = (imUsername, user) => {
        const { orderId, businessData } = this.props;
        const { config: { imRedirectUrl } } = this.state;
        sendData.sendBusinessData(businessData, user).then(res => {
            if (res && res.success) {
                window.open(`${imRedirectUrl}?toaccount=${imUsername}&orderid=${orderId}`);
            } else {
                message.error('The system is busy, Please try Again later!');
            }
        });
    }

    render() {
        const { addRessBookList } = this.state;
        const { type } = this.props;
        const defaultKey = addRessBookList && addRessBookList.length > 0 ? addRessBookList[0].tenantName : [];
        return (
            <div className={`addRessBook ${themeClass[type]}`}>
                <Collapse expandIconPosition={'right'} defaultActiveKey={defaultKey}>
                    {
                        addRessBookList.map((item) => {
                            const { tenantName, users } = item;
                            return (
                                <Panel header={tenantName} key={tenantName}>
                                    <ul className="addRessBook-ul">
                                        {
                                            users.map((user) => {
                                                return (
                                                    <div
                                                        key={user.imUsername}
                                                        className={`contact ${user.status === 'offline' ? 'offline' : 'online'}`}
                                                        onClick={() => this.contactOnClick(user.imUsername, user)}
                                                    >
                                                        <div className="contact-status" />
                                                        <div className="contact-people">
                                                            <div className="contact-icon">{getInitial(user.nickName)}</div>
                                                            <div className="contact-left" title={user.nickName || '空'}>
                                                                {user.nickName || '空'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        }
                                    </ul>
                                </Panel>
                            );
                        })
                    }
                </Collapse>
            </div>
        );
    }
}

export default Index;
