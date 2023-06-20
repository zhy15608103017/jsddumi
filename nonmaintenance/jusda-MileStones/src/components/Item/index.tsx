import React, { FunctionComponent, useEffect } from 'react';
import { timeFormat, checkInSource } from '../../utils/fn';
import { SetpColor } from '../../assets/svgIcon';
import '../../index.less';
interface MileStoneProps {
    title?: string;
    est?: string;
    cutoff?: string;
    act?: any;
    hideLine?: boolean;
    handleClick?: () => void;
    setCurrentSort?: (val: any) => void;
    actives?: boolean;
    code?: string;
    sort?: number;
    milestones: any;
    transportMode: any;
    logisticsOrderId: any;
    iconColor?: string;
}
const Item: FunctionComponent<MileStoneProps> = (props) => {
    const {
        title, // 进度title
        est = 'est', // 预计时间
        act = 'act', // 实际时间
        cutoff = 'cutoff', // 截港时间
        sort, // 该项绑定的唯一排序
        hideLine, // 隐藏线
        handleClick, // 最后亮的节点
        code, // 当前节点对应的唯一code
        actives, // 当前节点是否亮
        setCurrentSort, // 设置最后亮的节点sort
        milestones, // 当前节点的实际和预计时间
        transportMode, //运输方式
        logisticsOrderId,
    } = props;
    const milestone = milestones?.find((item: any) => item.code === code);
    // 是否有实际时间（设置最后亮的节点sort）
    useEffect(() => {
        if (milestone && milestone[act]) {
            setCurrentSort && setCurrentSort(sort);
        }
        else{
            setCurrentSort && setCurrentSort(0)
        }
    }, [milestone]);
    // 是否有实际时间（设置最后亮的节点sort）
    useEffect(() => {
        if (milestone && milestone[act]) {
            setCurrentSort && setCurrentSort(sort);
        }
        else{
            setCurrentSort && setCurrentSort(0)
        }
    }, [logisticsOrderId]);
    // 判断是否需要高亮显示，当实际时间晚于预计时间是高亮
    const isHiglight = !!(milestone && milestone[est] && milestone && milestone[act]);
    const isSea = checkInSource(['TPM_SEA'], transportMode || '');
    return (
        <div className="item">
            <div className={`milestone-item ${actives ? 'active' : ''}`}>
                {/* 进度提示文字 */}
                <span className="title">{title}</span>
                {/* 进度条 */}
                <span className={`circle`} onClick={handleClick}>
                    {/* 
          milestone?.riskLevel等于异常则展示红色图标
          */}
                    {SetpColor(
                        ['WARNING', 'REMINDER', 'PRE_WARNING'].includes(milestone?.riskLevel)
                            ? '#ff0000'
                            : actives || (milestone && milestone[act])
                            ? '#6FC677'
                            : '#cdcdcd',
                    )}
                    {!hideLine && <span className="lines"></span>}{' '}
                </span>
                {/* 预计时间&实际时间 */}
                <div className="">
                    <div className="time">
                        {milestone && milestone[est] && milestone[est] !== null && code !== 'SST_BIN' && (
                            <span>
                                Est:
                                {milestone && isSea
                                    ? timeFormat(milestone[est], 'day')
                                    : timeFormat(milestone[est], 'hour')}
                            </span>
                        )}
                    </div>
                    <div className="time">
                        {milestone && milestone[act] && milestone[act] !== null && (
                            <span
                                style={{
                                    color:
                                        isHiglight &&
                                        (isSea
                                            ? timeFormat(milestone[est], 'day')
                                            : timeFormat(milestone[est], 'hour')) <
                                            (isSea
                                                ? timeFormat(milestone[act], 'day')
                                                : timeFormat(milestone[act], 'hour'))
                                            ? 'red'
                                            : '',
                                }}
                            >
                                Act:
                                {milestone && isSea
                                    ? timeFormat(milestone[act], 'day')
                                    : timeFormat(milestone[act], 'hour')}
                            </span>
                        )}
                    </div>
                    <div className="time">
                        {milestone && milestone[cutoff] && milestone[cutoff] !== null && code !== 'SST_BIN' && (
                            <span>
                                Cut-off:
                                {milestone && isSea
                                    ? timeFormat(milestone[cutoff], 'day')
                                    : timeFormat(milestone[cutoff], 'hour')}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Item;
