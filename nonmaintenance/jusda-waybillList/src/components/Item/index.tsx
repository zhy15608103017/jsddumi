import React, { FunctionComponent, useEffect } from 'react';
import{timeFormat,checkInSource}from '../../utils/fn'

import '../../index.less';
interface MileStoneProps {
    title?: string;
    est?: string;
    cutoff?: string;
    act?: any;
    hideLine?: boolean;
    handleClick?: () => void;
    setCurrentSort?: (val: any) => void;
    // type?: string;
    actives?: boolean;
    code?: string;
    sort?: number;
    milestones:any;
    transportMode:any
    logisticsOrderId:any
    iconColor?:string
}
const Item: FunctionComponent<MileStoneProps> = (props) => {
    const {
        title, // 进度title
        est = 'est',  // 预计时间
        act = 'act',// 实际时间
        cutoff = 'cutoff',// 截港时间
        sort,// 该项绑定的唯一排序
        hideLine, // 隐藏线
        handleClick,  // 最后亮的节点
        // type,// 图标的icon
        code, // 当前节点对应的唯一code
        actives, // 当前节点是否亮
        setCurrentSort,  // 设置最后亮的节点sort
        milestones, // 当前节点的实际和预计时间
        transportMode, //运输方式
        logisticsOrderId,
        iconColor// 自定义异常图标颜色
    } = props;
    const milestone = milestones?.find((item: any) => item.code === code);
    // 是否有实际时间（设置最后亮的节点sort）
    useEffect(() => {
        if (milestone && milestone[act]) {
            setCurrentSort && setCurrentSort(sort);
        }
    }, [milestone]);
    // 是否有实际时间（设置最后亮的节点sort）
    useEffect(() => {
        if (milestone && milestone[act]) {
            setCurrentSort && setCurrentSort(sort);
        }
    }, [logisticsOrderId]);
    // 判断是否需要高亮显示，当实际时间晚于预计时间是高亮
    const isHiglight = !!(milestone && milestone[est] && milestone && milestone[act]);
    const isSea = checkInSource(['TPM_SEA'],transportMode||'');
    return (
        <div className="item">
            <div className={`milestone-item ${actives ? 'active' : ''}`}>
                {/* 进度提示文字 */}
                <span className="title">{title}</span>
                {/* 进度条 */}
                <span className={`circle ${"WARNING" === milestone?.riskLevel?'redIcon':''}`} onClick={handleClick}>
                    {/* <i className={`iconfont item-first ${type} ${actives ? 'itemActive' : ''} iconfont`} style={{color:"WARNING" === milestone?.riskLevel?iconColor:''}}></i> */}
                    {/* <i className={`icon-B_yiwancheng-01 iconfont`} style={{color:"WARNING" === milestone?.riskLevel?iconColor:''}}></i> */}
                    <i className={`icon-B_yiwancheng-01 iconfont ${"WARNING" === milestone?.riskLevel?'redIconBorder':''}` }  style={{color:"WARNING" === milestone?.riskLevel?iconColor:''}}></i>
                    {!hideLine && <span className="lines"></span>}{' '}
                </span>
                {/* 预计时间&实际时间 */}
                <div className="">
                    {milestone && milestone[est] &&  milestone[est] !== null&&code !== 'SST_BIN' && (
                        <div className="time">
                            Est:
                            {milestone && isSea
                                ? timeFormat(milestone[est], 'day')
                                : timeFormat(milestone[est], 'hour')}
                        </div>
                    )}
                    {milestone && milestone[act]&& milestone[act]!==null && (
                        <div
                            className="time"
                            style={{
                                color:
                                    isHiglight &&
                                    (isSea ? timeFormat(milestone[est], 'day') : timeFormat(milestone[est], 'hour')) <
                                        (isSea ? timeFormat(milestone[act], 'day') : timeFormat(milestone[act], 'hour'))
                                        ? 'red'
                                        : '',
                            }}
                        >
                            Act:
                            {milestone && isSea
                                ? timeFormat(milestone[act], 'day')
                                : timeFormat(milestone[act], 'hour')}
                        </div>
                    )}
                    {milestone && milestone[cutoff]&&milestone[cutoff]!==null && code !== 'SST_BIN' && (
                        <div className="time">
                            Cut-off:
                            {milestone && isSea
                                ? timeFormat(milestone[cutoff], 'day')
                                : timeFormat(milestone[cutoff], 'hour')}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Item;
