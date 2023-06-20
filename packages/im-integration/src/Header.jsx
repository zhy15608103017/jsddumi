import React, { Component } from 'react';
import { imIcons } from './icons/index.jsx';
import envConfig from './envConfig.js';
import request from '@jusda-tools/web-api-client';
import { ConfigProvider } from 'antd';
// import AddRessBook from './components/addRessBook';
// import AddRessBookData from './utils/getAddRessBookData';
import './styles/header.less';
import 'antd/es/popover/style/index.less';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msgState: null,
            // addRessBookList: [],
            config: envConfig,
        };
    }

    componentDidMount() {
        // 获取用户是否有未读消息
        this.getMsgStateFun();
        this.msgStateTimeOut = setInterval(() => {
            this.getMsgStateFun();
        }, 10000);

        // 获取通讯录列表
        // const that = this;
        // AddRessBookData.addCallBack({
        //     key: 'Header',
        //     fun: (data) => {
        //         that.setState({
        //             addRessBookList: data
        //         });
        //     }
        // })
    }

    componentWillMount() {
        // AddRessBookData.removeCallBack({
        //     key: 'Header',
        // });
        clearTimeout(this.msgStateTimeOut);
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

    handleImClick() {
        const { config: { imRedirectUrl } } = this.state;
        window.open(`${imRedirectUrl}`);
    }

    render() {
        const { msgState } = this.state;
        const { themeType = 'dark', businessData = [], content } = this.props; // 主题类型
        return (
            <ConfigProvider prefixCls="imant">
                <div className="im-div">
                    {/* <div className="im-addressbook">
                        <Popover overlayClassName="addressbook-popover" placement="topLeft" trigger="click" content={<AddRessBook addRessBookList={addRessBookList}></AddRessBook>}>
                            <div className="kefu-icon">{imIcons[themeType].kefuIcon}</div>
                        </Popover>
                    </div> */}
                    <div className="im-msg" onClick={this.handleImClick.bind(this)}>
                        {content ? content : imIcons[themeType].imMsg}
                        {msgState && msgState.generalMsgRead ? <div className="msg-count"><span>New</span></div> : ''}
                    </div>
                </div>
            </ConfigProvider>
        );
    }
}

export default Header;