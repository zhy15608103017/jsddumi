import React, { Component } from 'react';
import { imIcon, imIcons } from './icons/index.jsx';
import { Popover, ConfigProvider } from 'antd';
import AddRessBook from './components/addRessBook';
import AddRessBookData from './utils/getAddRessBookData';
import './styles/detail.less';
import 'antd/es/popover/style/index.less';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addRessBookList: [],
        };
    }

    componentDidMount(){
        // 获取通讯录列表
        const that = this;
        AddRessBookData.addCallBack({
            key: 'Detail',
            fun: (data) => {
                that.setState({
                    addRessBookList: data
                });
            }
        })
    }

    componentWillMount() {
        AddRessBookData.removeCallBack({
            key: 'Detail',
        });
    }

    render() {
        const { addRessBookList } = this.state;
        const { themeType = 'dark', businessData = [], blNo, menuDirection = 'right', content } = this.props; // 主题类型
        return (
            <ConfigProvider prefixCls="imant">
                <div className="im-detail">
                    <Popover
                        overlayClassName="detail-addressbook addressbook-popover"
                        arrowPointAtCenter
                        autoAdjustOverflow
                        placement={menuDirection}
                        trigger="click"
                        content={<AddRessBook businessData={businessData} addRessBookList={addRessBookList} orderId={blNo} type={themeType} />}
                    >
                        {/* <span className="iconfont iconfont iconC_IM-" /> */}
                        {content ? content : <div className="im-icon">{imIcons[themeType].imIcon}</div>}
                    </Popover>
                </div>
            </ConfigProvider>
        );
    }
}

export default Detail;