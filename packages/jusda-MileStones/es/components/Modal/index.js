var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// @ts-nocheck
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import './index.less';
import { Row, Col, Form, Modal, DatePicker } from 'antd';
import language from '../../locales/index';
import { transitionTime } from '../../utils/fn';
import { ICON_TIMESTR } from '../../utils/const';
import { SetpColor } from '../../assets/svgIcon';
let timer = null;
const Item = (props) => {
    const { visible, code, // 当前节点对应的唯一code
    setCurrentSort, // 设置最后亮的节点
    sort, // 该项绑定的唯一排序
    milestoneList, // 获取当前节点结构
    onCancel, modalOk, milestones, } = props;
    const [form] = Form.useForm();
    // 获取当前节点数据
    const milestone = milestones === null || milestones === void 0 ? void 0 : milestones.find((item) => item.code === code);
    // 判断是否显示当前节点
    // const isShow = !!milestoneList?.find((item: any) => item.code === code);
    const [curMilestones, setCurMilestones] = useState([]); // 保存当前弹框日期改变后的数据
    const [currentSort, setSort] = useState(1);
    // const isSea = checkInSource(['TPM_SEA'], transportMode); // 海运才显示时分秒
    // 设置最后亮的节点sort
    useEffect(() => {
        if (milestone && milestone.act) {
            setCurrentSort && setCurrentSort(sort);
        }
    }, [milestone]);
    useEffect(() => {
        // 深拷贝储存日期数据
        if (!props.milestoneList.length)
            return;
        const newCurMilestones = JSON.parse(JSON.stringify(props.milestones));
        const list = [];
        props.milestoneList.map((item) => {
            let isExist = false;
            let cnode = null;
            newCurMilestones.forEach((ele) => {
                if (item.code === ele.code) {
                    isExist = true;
                    ele.disabled = true;
                    ele.hasAct = !!ele.act;
                    ele.hasEst = !!ele.est;
                    ele.hasCutoff = !!ele.cutoff;
                    cnode = ele;
                }
            });
            if (isExist) {
                list.push(cnode);
            }
            else {
                list.push({
                    id: null,
                    code: item.code,
                    milestoneType: 'TRANSPORT_MILESTONE',
                    est: null,
                    act: null,
                    cutoff: null,
                    disabled: true,
                });
            }
        });
        setCurMilestones([...list]);
        // // form表单回显赋值
        const fromDatas = {};
        list.map((item) => {
            var _a, _b, _c, _d, _e, _f, _g;
            fromDatas[`${item.code}_est`] = ((_a = item === null || item === void 0 ? void 0 : item.est) === null || _a === void 0 ? void 0 : _a.time) ? (_b = moment(item === null || item === void 0 ? void 0 : item.est.time)) === null || _b === void 0 ? void 0 : _b.utcOffset(item === null || item === void 0 ? void 0 : item.est.zone) : null;
            fromDatas[`${item.code}_act`] = ((_c = item === null || item === void 0 ? void 0 : item.act) === null || _c === void 0 ? void 0 : _c.time) ? (_d = moment(item === null || item === void 0 ? void 0 : item.act.time)) === null || _d === void 0 ? void 0 : _d.utcOffset(item === null || item === void 0 ? void 0 : item.act.zone) : null;
            fromDatas[`${item.code}_cutoff`] = ((_e = item === null || item === void 0 ? void 0 : item.cutoff) === null || _e === void 0 ? void 0 : _e.time)
                ? (_g = moment((_f = item.cutoff) === null || _f === void 0 ? void 0 : _f.time)) === null || _g === void 0 ? void 0 : _g.utcOffset(item.cutoff.zone)
                : null;
        });
        visible && form.setFieldsValue(fromDatas);
    }, [props.milestoneList, props.milestones, visible]);
    // 获取最近有时间的节点信息
    const getRecentNodeTime = (startIndex, endIndex, curMilestones) => {
        var _a, _b, _c, _d;
        let nodeTime = 0;
        if (startIndex < endIndex) {
            for (let i = endIndex - 1; i > startIndex; i--) {
                if ((_a = curMilestones[i]) === null || _a === void 0 ? void 0 : _a.act) {
                    nodeTime = transitionTime((_b = curMilestones[i]) === null || _b === void 0 ? void 0 : _b.act);
                    break;
                }
            }
        }
        else {
            for (let i = startIndex + 1; i < endIndex; i++) {
                if ((_c = curMilestones[i]) === null || _c === void 0 ? void 0 : _c.act) {
                    nodeTime = transitionTime((_d = curMilestones[i]) === null || _d === void 0 ? void 0 : _d.act);
                    break;
                }
            }
        }
        return nodeTime;
    };
    /**
     * 校验实际时间选择
     1）下一个节点的时间不能早于上一个节点
     2）上一个节点有值的情况下，下一个节点才能有值
     */
    const validateAct = (rule, value, callback, code) => {
        try {
            let currentObj;
            let lastAct;
            let nextAct;
            milestoneList.forEach(function (_value, index) {
                if (code === _value.code) {
                    lastAct = getRecentNodeTime(0, index, curMilestones);
                    nextAct = getRecentNodeTime(index, curMilestones.length, curMilestones);
                    currentObj = curMilestones === null || curMilestones === void 0 ? void 0 : curMilestones.find((item) => item.code === code);
                }
            });
            const valueTime = transitionTime(currentObj === null || currentObj === void 0 ? void 0 : currentObj.act);
            if (parseInt(lastAct) > parseInt(valueTime)) {
                // 早于上一个节点时间
                callback(language['JusdaWaybillList.当前节点早于上一个节点时间']);
                return;
            }
            if (nextAct && parseInt(valueTime) > parseInt(nextAct)) {
                // 晚于下一个节点
                callback(language['JusdaWaybillList.当前节点晚于下一个节点时间']);
                return;
            }
            callback();
        }
        catch (error) {
            console.log('error', error);
        }
    };
    return (React.createElement("div", null, visible && (React.createElement(Modal
    //  footer={null}
    , { 
        //  footer={null}
        destroyOnClose: true, visible: visible, title: language['JusdaWaybillList.订单运输状态更新'], centered: true, bodyStyle: { height: '450px', overflow: 'auto' }, className: "MileStone-common-modal modalGroup", width: "1000px", okText: language['JusdaWaybillList.确定'], cancelText: language['JusdaWaybillList.取消'], onOk: (v) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const values = yield form.validateFields();
                if (values) {
                    // 过滤掉空的时间数据
                    const filterData = curMilestones.filter((v) => v.act || v.est || v.cutoff);
                    modalOk && modalOk(filterData);
                }
            }
            catch (errorInfo) {
                // 返回报错信息，滚动到第一个报错的位置
                form.scrollToField(errorInfo.errorFields[0].name.toString());
            }
        }), onCancel: () => {
            onCancel && onCancel();
        } },
        React.createElement(Form, { form: form, scrollToFirstError: true }, milestoneList &&
            milestoneList.map((item, index) => {
                var _a, _b, _c, _d, _e, _f;
                const milestone = milestones === null || milestones === void 0 ? void 0 : milestones.find((v) => v.code === item.code);
                // 当前节点
                const currentNode = (_a = curMilestones[index]) === null || _a === void 0 ? void 0 : _a.act;
                if ((_b = curMilestones[index]) === null || _b === void 0 ? void 0 : _b.act) {
                    if (timer)
                        clearTimeout(timer);
                    timer = setTimeout(() => {
                        setSort(index);
                    }, 200);
                }
                return (React.createElement("div", { key: item.id, className: `modal-item  ${(milestone === null || milestone === void 0 ? void 0 : milestone.riskLevel) === 'WARNING' ||
                        (milestone === null || milestone === void 0 ? void 0 : milestone.riskLevel) === 'REMINDER' ||
                        (milestone === null || milestone === void 0 ? void 0 : milestone.riskLevel) === 'PRE_WARNING'
                        ? 'redIcon'
                        : ''} ${currentSort >= index ? 'actives' : ''}` },
                    React.createElement(Row, { gutter: 30 },
                        React.createElement(Col, { span: 3 },
                            SetpColor((milestone === null || milestone === void 0 ? void 0 : milestone.riskLevel) === 'WARNING' ||
                                (milestone === null || milestone === void 0 ? void 0 : milestone.riskLevel) === 'REMINDER' ||
                                (milestone === null || milestone === void 0 ? void 0 : milestone.riskLevel) === 'PRE_WARNING'
                                ? '#ff0000'
                                : milestone && (milestone.est || milestone.act)
                                    ? '#6FC677'
                                    : '#cdcdcd'),
                            React.createElement("div", null, item.name)),
                        React.createElement(Col, { span: 6 },
                            React.createElement(Form.Item, { label: ICON_TIMESTR[item.code]
                                    ? ICON_TIMESTR[item.code][0]
                                    : language['JusdaWaybillList.预计时间'], name: `${item.code}` === 'SST_BIN'
                                    ? `${item.code}_act`
                                    : `${item.code}_est`, labelCol: { span: 24 } },
                                React.createElement(DatePicker, { format: "YYYY-MM-DD HH:mm", placeholder: language['JusdaWaybillList.请选择时间'], getPopupContainer: (triggerNode) => {
                                        return triggerNode;
                                    }, disabled: ((_c = curMilestones[index]) === null || _c === void 0 ? void 0 : _c.code) === 'SST_BIN', 
                                    // showTime={!isSea}
                                    allowClear: !((_d = curMilestones[index]) === null || _d === void 0 ? void 0 : _d.hasEst), showTime: true, onChange: (mdate, date) => {
                                        let valueTime = null;
                                        if (date) {
                                            valueTime = new Date(date).getTime();
                                        }
                                        curMilestones[index].est = valueTime;
                                        if (item.code === 'SST_BIN') {
                                            curMilestones[index].act = valueTime;
                                        }
                                        setCurMilestones([...curMilestones]);
                                    } }))),
                        item.code !== 'SST_BIN' && (React.createElement(Col, { span: 6 },
                            React.createElement(Form.Item, { label: ICON_TIMESTR[item.code]
                                    ? ICON_TIMESTR[item.code][1]
                                    : language['JusdaWaybillList.实际时间'], name: `${item.code}_act`, labelCol: { span: 24 }, rules: currentNode &&
                                    [
                                        {
                                            required: true,
                                            validator: (rule, value, callback) => {
                                                validateAct(rule, value, callback, item.code);
                                            },
                                        },
                                    ] },
                                React.createElement(DatePicker, { format: "YYYY-MM-DD HH:mm", placeholder: language['JusdaWaybillList.请选择时间'], getPopupContainer: (triggerNode) => {
                                        return triggerNode;
                                    }, allowClear: !((_e = curMilestones[index]) === null || _e === void 0 ? void 0 : _e.hasAct), showTime: true, onChange: (mdate, date) => {
                                        let valueTime = null;
                                        if (date) {
                                            valueTime = new Date(date).getTime();
                                        }
                                        curMilestones[index].act = valueTime;
                                        setCurMilestones([...curMilestones]);
                                        // setCurMilestones([...curMilestones]);
                                    } })))),
                        item.code !== 'SST_BIN' && item.code === 'SST_POL' && (React.createElement(Col, { span: 6 },
                            React.createElement(Form.Item, { label: ICON_TIMESTR[item.code][2], 
                                // name="cutoff"
                                name: `${item.code}_cutoff`, labelCol: { span: 24 } },
                                React.createElement(DatePicker, { format: "YYYY-MM-DD HH:mm", allowClear: !((_f = curMilestones[index]) === null || _f === void 0 ? void 0 : _f.hasCutoff), placeholder: language['JusdaWaybillList.请选择时间'], getPopupContainer: (triggerNode) => {
                                        return triggerNode;
                                    }, 
                                    // showTime={!isSea}
                                    showTime: true, onChange: (mdate, date) => {
                                        let valueTime = null;
                                        if (date) {
                                            valueTime = new Date(date).getTime();
                                        }
                                        curMilestones[index].cutoff = valueTime;
                                        setCurMilestones([...curMilestones]);
                                    } })))))));
            }))))));
};
export default Item;
