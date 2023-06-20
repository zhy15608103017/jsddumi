import React, { useEffect } from 'react';
import { timeFormat, checkInSource } from '../../utils/fn';
import { SetpColor } from '../../assets/svgIcon';
import '../../index.less';
const Item = (props) => {
    const { title, // 进度title
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
    logisticsOrderId, } = props;
    const milestone = milestones === null || milestones === void 0 ? void 0 : milestones.find((item) => item.code === code);
    // 是否有实际时间（设置最后亮的节点sort）
    useEffect(() => {
        if (milestone && milestone[act]) {
            setCurrentSort && setCurrentSort(sort);
        }
        else {
            setCurrentSort && setCurrentSort(0);
        }
    }, [milestone]);
    // 是否有实际时间（设置最后亮的节点sort）
    useEffect(() => {
        if (milestone && milestone[act]) {
            setCurrentSort && setCurrentSort(sort);
        }
        else {
            setCurrentSort && setCurrentSort(0);
        }
    }, [logisticsOrderId]);
    // 判断是否需要高亮显示，当实际时间晚于预计时间是高亮
    const isHiglight = !!(milestone && milestone[est] && milestone && milestone[act]);
    const isSea = checkInSource(['TPM_SEA'], transportMode || '');
    return (React.createElement("div", { className: "item" },
        React.createElement("div", { className: `milestone-item ${actives ? 'active' : ''}` },
            React.createElement("span", { className: "title" }, title),
            React.createElement("span", { className: `circle`, onClick: handleClick },
                SetpColor(['WARNING', 'REMINDER', 'PRE_WARNING'].includes(milestone === null || milestone === void 0 ? void 0 : milestone.riskLevel)
                    ? '#ff0000'
                    : actives || (milestone && milestone[act])
                        ? '#6FC677'
                        : '#cdcdcd'),
                !hideLine && React.createElement("span", { className: "lines" }),
                ' '),
            React.createElement("div", { className: "" },
                React.createElement("div", { className: "time" }, milestone && milestone[est] && milestone[est] !== null && code !== 'SST_BIN' && (React.createElement("span", null,
                    "Est:",
                    milestone && isSea
                        ? timeFormat(milestone[est], 'day')
                        : timeFormat(milestone[est], 'hour')))),
                React.createElement("div", { className: "time" }, milestone && milestone[act] && milestone[act] !== null && (React.createElement("span", { style: {
                        color: isHiglight &&
                            (isSea
                                ? timeFormat(milestone[est], 'day')
                                : timeFormat(milestone[est], 'hour')) <
                                (isSea
                                    ? timeFormat(milestone[act], 'day')
                                    : timeFormat(milestone[act], 'hour'))
                            ? 'red'
                            : '',
                    } },
                    "Act:",
                    milestone && isSea
                        ? timeFormat(milestone[act], 'day')
                        : timeFormat(milestone[act], 'hour')))),
                React.createElement("div", { className: "time" }, milestone && milestone[cutoff] && milestone[cutoff] !== null && code !== 'SST_BIN' && (React.createElement("span", null,
                    "Cut-off:",
                    milestone && isSea
                        ? timeFormat(milestone[cutoff], 'day')
                        : timeFormat(milestone[cutoff], 'hour'))))))));
};
export default Item;
