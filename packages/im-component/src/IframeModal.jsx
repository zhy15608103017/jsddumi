import * as React from 'react';
import { closeIcon } from './icons/index.jsx'
import "./styles/iframeModal.less"
const frameImg = require('./assets/img/Frame.png')
import ChooseCustomer from './ChooseCustomer.jsx'
import Draggable from 'react-draggable';
import locales from './locales'
import {currentLanguage} from '@jusda-tools/language-control-panel'

export default class IframeModal extends React.Component {
    constructor(props) {
        super(props);
        const config = locales.get(currentLanguage())
        this.state = {
            config
        }
    }
    hideModal = () => {
        this.props.onCancel()
    }
    selectCustomer = (data) => {
        // console.log('selectCustomer1:', data);
        this.props.selectCustomer(data)
    }
    ImModal = () => {
        let {imUrl, visible, crmCode, isShowCustomer, businessList} = this.props;
        let {config} = this.state
        return (
            <Draggable handle=".im-head" bounds={'body'} >
                <div className="im-modal" style={{display: visible?'':'none'}}>
                    <div title={config.dragTooltip} className="im-head">
                        <img className="im-head-img" src={frameImg} />
                    </div>
                    <div onClick={this.hideModal} className="im-close-icon" >
                        {closeIcon}
                    </div>
                    { !isShowCustomer || imUrl? (
                        <iframe
                            allow="microphone;camera"
                            className="im-iframe"
                            src={imUrl}>
                        </iframe>
                    ) : <ChooseCustomer selectCustomer={this.selectCustomer} crmCode={crmCode} businessList={businessList} />}
                </div>
            </Draggable>
        )
    }
    render(){
        return ( 
            <div>
                {/* 当前方式使用卸载挂载，需验证iframe隐藏或显示是否有隐患 */}
                <this.ImModal />
            </div>
        )
    }
}