import * as React from "react";
import './styles/chooseCustomer.less';
import getIMInfoReq from './utils/getIMInfoByUserId';

import locales from './locales'
import {currentLanguage} from '@jusda-tools/language-control-panel'

const imSvg = require('./assets/img/IM.svg')
const bottomIcon = require('./assets/img/bottom.svg')

export default class ChooseCustomer extends React.Component {
    constructor(props) {
        super(props);
        const config = locales.get(currentLanguage())
        this.state = {
            customerList: [],
            config
        };
    }

    async componentWillMount() {
        const { businessList } = this.props;
        const list = [];
        businessList.forEach((item) => {
            if (!item.pcode) {
                list.push({
                    key: item.code,
                    name: item.name,
                    children: []
                })
            }
        })
        this.getBusinessTree(list, businessList)
        // console.log('businessList:', list);
        if(list.length === 1) {
            this.selectCustomer(list[0])
        }
        this.setState({
            customerList: list,
        });
    }

    getBusinessTree(list, businessList) {
        for(let index = 0; index < list.length; index++) {
            let cur = list[index];
            businessList.forEach((item) => {
                if(cur.key === item.pcode) {
                    cur.children.push({
                        key: item.code,
                        name: item.name,
                        children: []
                    })
                }
            })
            if(cur.children.length > 0) {
                return this.getBusinessTree(cur.children, businessList)
            }
        }
        return list;
    }

    dropdown = (index, evt) => {
        const customer = this.state.customerList;
        if(customer[index].children && customer[index].children.length>0) {
            customer[index].show = !customer[index].show;
            this.setState({
                customerList: customer,
            });
        }else{
            this.selectCustomer(customer[index])
        }
    };

    selectCustomer = (data, evt) => {
        if(evt) {
            evt.stopPropagation();
        }
        // console.log('selectCustomer:', data);
        this.props.selectCustomer(data)
    }

    render() {
        let {config} = this.state
        return (
            <div className="customer">
                <header className="customer-header">{config.header}</header>
                <div className="customer-body">
                    <div className="msg_style">
                        <div className="mag_title">
                            <div className="head_name">
                                <img src={imSvg} width="40" height="40" />
                            </div>
                            <div className="msg_account">{config.user}</div>
                        </div>
                        <div className="chat_info">
                            <div className="msg_content">
                                <pre className="pre-contect">
                                    <div className="pre-contect-arrows"></div>
                                    <div className="msg-box">
                                        <div className="customer-title">
                                            {config.content}
                                        </div>
                                        <div className="customer-list">
                                            <ul className="customer-ul">
                                                {this.state.customerList.map((customer, index) => {
                                                    return (
                                                        <li
                                                            key={customer.key}
                                                            onClick={(e) => this.dropdown(index, e)}
                                                        >
                                                            <span>{customer.name}</span>
                                                            {customer.children &&
                                                                customer.children.length > 0 ? (
                                                                <img width="12px" height="6px" src={bottomIcon} />
                                                            ) : null}
                                                            {customer.children &&
                                                                customer.children.length > 0 &&
                                                                customer.show ? (
                                                                <ul className="customer-ul drop-menu">
                                                                    {customer.children.map((item) => {
                                                                        return (
                                                                            <li onClick={(e) => this.selectCustomer(item, e)} key={item.key}>
                                                                                <span>{item.name}</span>
                                                                            </li>
                                                                        );
                                                                    })}
                                                                </ul>
                                                            ) : null}
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
