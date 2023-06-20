// @ts-nocheck
import React, { FunctionComponent, useEffect, useState } from 'react';
import moment from 'moment';
import './index.less';
import { Row, Col, Form, Modal, DatePicker } from 'antd';
import language from '../../locales/index';
import { transitionTime } from '../../utils/fn';
import { ICON_TIMESTR } from '../../utils/const';
import { SetpColor } from '../../assets/svgIcon';

interface ItemProps {
    title?: string;
    code?: string;
    setCurrentSort?: (val: any) => void;
    sort?: number;
    actives?: boolean;
    milestoneList: any;
    milestones: any;
    iconColor?: string;
    visible: boolean;
    modalOk: Function;
    onCancel: Function;
    transportMode: string;
}
let timer: any = null;
const Item: FunctionComponent<ItemProps> = (props) => {
    const {
        visible,
        code, // 当前节点对应的唯一code
        setCurrentSort, // 设置最后亮的节点
        sort, // 该项绑定的唯一排序
        milestoneList, // 获取当前节点结构
        onCancel,
        modalOk,
        milestones,
    } = props;
    const [form] = Form.useForm();
    // 获取当前节点数据
    const milestone = milestones?.find((item: any) => item.code === code);

    // 判断是否显示当前节点
    // const isShow = !!milestoneList?.find((item: any) => item.code === code);
    const [curMilestones, setCurMilestones] = useState<any[]>([]); // 保存当前弹框日期改变后的数据
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
        if (!props.milestoneList.length) return;
        const newCurMilestones = JSON.parse(JSON.stringify(props.milestones));
        const list: any = [];
        props.milestoneList.map((item: any) => {
            let isExist = false;
            let cnode = null;
            newCurMilestones.forEach((ele: any) => {
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
            } else {
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

        list.map((item: any) => {
            fromDatas[`${item.code}_est`] = item?.est?.time ? moment(item?.est.time)?.utcOffset(item?.est.zone) : null;
            fromDatas[`${item.code}_act`] = item?.act?.time ? moment(item?.act.time)?.utcOffset(item?.act.zone) : null;
            fromDatas[`${item.code}_cutoff`] = item?.cutoff?.time
                ? moment(item.cutoff?.time)?.utcOffset(item.cutoff.zone)
                : null;
        });

        visible && form.setFieldsValue(fromDatas);
    }, [props.milestoneList, props.milestones, visible]);


    // 获取最近有时间的节点信息
    const getRecentNodeTime = (startIndex: number, endIndex: number, curMilestones: any) => {
        let nodeTime: number = 0
        if (startIndex < endIndex) {
            for (let i = endIndex-1; i > startIndex; i--) {
                if (curMilestones[i]?.act) {
                    nodeTime = transitionTime(curMilestones[i]?.act)
                    break
                }
            }
        }
        else {
            for (let i = startIndex+1; i < endIndex; i++) {
                if (curMilestones[i]?.act) {
                    nodeTime = transitionTime(curMilestones[i]?.act)
                    break
                }
            }
        }
        return nodeTime
    }
    /**
     * 校验实际时间选择
     1）下一个节点的时间不能早于上一个节点
     2）上一个节点有值的情况下，下一个节点才能有值
     */
    const validateAct = (rule: any, value: any, callback: any, code: any) => {
        try {
            let currentObj;
            let lastAct;
            let nextAct;
            milestoneList.forEach(function (_value: any, index: any) {
                if (code === _value.code) {
                    lastAct = getRecentNodeTime(0, index, curMilestones)
                    nextAct = getRecentNodeTime(index, curMilestones.length, curMilestones)
                    currentObj = curMilestones?.find((item: any) => item.code === code);
                }
            });
            const valueTime = transitionTime(currentObj?.act);
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
        } catch (error) {
            console.log('error', error);
        }
    };
    return (
        <div>
            {visible && (
                <Modal
                    //  footer={null}
                    destroyOnClose
                    visible={visible}
                    title={language['JusdaWaybillList.订单运输状态更新']}
                    centered
                    bodyStyle={{ height: '450px', overflow: 'auto' }}
                    className="MileStone-common-modal modalGroup"
                    width="1000px"
                    okText={language['JusdaWaybillList.确定']}
                    cancelText={language['JusdaWaybillList.取消']}
                    onOk={async (v) => {
                        try {
                            const values = await form.validateFields();
                            if (values) {
                                // 过滤掉空的时间数据

                                const filterData = curMilestones.filter((v) => v.act || v.est || v.cutoff);

                                modalOk && modalOk(filterData);
                            }
                        } catch (errorInfo: any) {
                            // 返回报错信息，滚动到第一个报错的位置
                            form.scrollToField(errorInfo.errorFields[0].name.toString());
                        }
                    }}
                    onCancel={() => {
                        onCancel && onCancel();
                    }}
                >
                    <Form form={form} scrollToFirstError={true}>
                        {milestoneList &&
                            milestoneList.map((item: any, index: number) => {
                                const milestone = milestones?.find((v: any) => v.code === item.code);
                                // 当前节点
                                const currentNode = curMilestones[index]?.act;
                                if (curMilestones[index]?.act) {
                                    if (timer) clearTimeout(timer);
                                    timer = setTimeout(() => {
                                        setSort(index);
                                    }, 200);
                                }
                                return (
                                    <div
                                        key={item.id}
                                        className={`modal-item  ${milestone?.riskLevel === 'WARNING' ||
                                                milestone?.riskLevel === 'REMINDER' ||
                                                milestone?.riskLevel === 'PRE_WARNING'
                                                ? 'redIcon'
                                                : ''
                                            } ${currentSort >= index ? 'actives' : ''}`}
                                    >
                                        <Row gutter={30}>
                                            <Col span={3}>
                                                {SetpColor(
                                                    milestone?.riskLevel === 'WARNING' ||
                                                        milestone?.riskLevel === 'REMINDER' ||
                                                        milestone?.riskLevel === 'PRE_WARNING'
                                                        ? '#ff0000'
                                                        : milestone && (milestone.est || milestone.act)
                                                            ? '#6FC677'
                                                            : '#cdcdcd',
                                                )}
                                                <div>{item.name}</div>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item
                                                    label={
                                                        ICON_TIMESTR[item.code]
                                                            ? ICON_TIMESTR[item.code][0]
                                                            : language['JusdaWaybillList.预计时间']
                                                    }
                                                    name={
                                                        `${item.code}` === 'SST_BIN'
                                                            ? `${item.code}_act`
                                                            : `${item.code}_est`
                                                    }
                                                    labelCol={{ span: 24 }}
                                                >
                                                    <DatePicker
                                                        format="YYYY-MM-DD HH:mm"
                                                        placeholder={language['JusdaWaybillList.请选择时间']}
                                                        getPopupContainer={(triggerNode) => {
                                                            return triggerNode;
                                                        }}
                                                        disabled={curMilestones[index]?.code === 'SST_BIN'}
                                                        // showTime={!isSea}
                                                        allowClear={!curMilestones[index]?.hasEst}
                                                        showTime={true}
                                                        onChange={(mdate, date) => {
                                                            let valueTime: any = null;
                                                            if (date) {
                                                                valueTime = new Date(date).getTime();
                                                            }
                                                            curMilestones[index].est = valueTime;
                                                            if (item.code === 'SST_BIN') {
                                                                curMilestones[index].act = valueTime;
                                                            }
                                                            setCurMilestones([...curMilestones]);
                                                        }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            {/* SST_BIN 已接单 只有实际时间  */}
                                            {item.code !== 'SST_BIN' && (
                                                <Col span={6}>
                                                    <Form.Item
                                                        label={
                                                            ICON_TIMESTR[item.code]
                                                                ? ICON_TIMESTR[item.code][1]
                                                                : language['JusdaWaybillList.实际时间']
                                                        }
                                                        name={`${item.code}_act`}
                                                        labelCol={{ span: 24 }}
                                                        rules={currentNode &&
                                                            [
                                                                {
                                                                    required: true,
                                                                    validator: (
                                                                        rule: any,
                                                                        value: any,
                                                                        callback: any,
                                                                    ) => {
                                                                        validateAct(rule, value, callback, item.code);
                                                                    },
                                                                },
                                                            ]
                                                        }
                                                    >
                                                        <DatePicker
                                                            format="YYYY-MM-DD HH:mm"
                                                            placeholder={language['JusdaWaybillList.请选择时间']}
                                                            getPopupContainer={(triggerNode) => {
                                                                return triggerNode;
                                                            }}
                                                            allowClear={!curMilestones[index]?.hasAct}
                                                            showTime={true}
                                                            onChange={(mdate, date) => {
                                                                let valueTime: any = null;
                                                                if (date) {
                                                                    valueTime = new Date(date).getTime();
                                                                }
                                                                curMilestones[index].act = valueTime;
                                                                setCurMilestones([...curMilestones]);

                                                                // setCurMilestones([...curMilestones]);
                                                            }}
                                                        />
                                                    </Form.Item>
                                                </Col>
                                            )}
                                            {/* SST_POL 已抵始发港 多一个截港时间 */}
                                            {item.code !== 'SST_BIN' && item.code === 'SST_POL' && (
                                                <Col span={6}>
                                                    <Form.Item
                                                        label={ICON_TIMESTR[item.code][2]}
                                                        // name="cutoff"
                                                        name={`${item.code}_cutoff`}
                                                        labelCol={{ span: 24 }}
                                                    >
                                                        <DatePicker
                                                            format="YYYY-MM-DD HH:mm"
                                                            allowClear={!curMilestones[index]?.hasCutoff}
                                                            placeholder={language['JusdaWaybillList.请选择时间']}
                                                            getPopupContainer={(triggerNode) => {
                                                                return triggerNode;
                                                            }}
                                                            // showTime={!isSea}
                                                            showTime={true}
                                                            onChange={(mdate, date) => {
                                                                let valueTime: any = null;
                                                                if (date) {
                                                                    valueTime = new Date(date).getTime();
                                                                }
                                                                curMilestones[index].cutoff = valueTime;
                                                                setCurMilestones([...curMilestones]);
                                                            }}
                                                        />
                                                    </Form.Item>
                                                </Col>
                                            )}
                                        </Row>
                                    </div>
                                );
                            })}
                    </Form>
                </Modal>
            )}
        </div>
    );
};
export default Item;
