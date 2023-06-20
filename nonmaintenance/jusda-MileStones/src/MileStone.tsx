import React, { FunctionComponent, useState, useEffect } from 'react';
import './index.less';
import { Button, message } from 'antd';
import Item from './components/Item';
import Modal from './components/Modal';
import { getShipmentsOwner } from './api/MileStone';
import { timeZone } from './utils/fn';
import language from './locales/index';
import { TpmRoadIcon, TpmSeaIcon, TpmAirIcon, TpmRailIcon, TpmExpressIcon } from './assets/svgIcon';

interface MileStoneProps {
    seveNewMilestones: (data: any, callback: Function) => void;
    status: boolean;
    logisticsOrderId: any;
    milestones: any;
    transportMode: any;
    iconColor?: string;
    sign?:string,
    logisticsOrderOperateStatus: string;
}

const MileStone: FunctionComponent<MileStoneProps> = (props: any) => {
    const {
        seveNewMilestones, // 保存弹窗当前日期数据方法
        status, // 针对货主隐藏更新节点按钮字段 || 只允许承运商操作里程碑
        logisticsOrderId, // ???
        milestones, // 日期数据
        transportMode, // 运输方式
        iconColor, // 自定义异常图标颜色（非必传）
        logisticsOrderOperateStatus, // 订单状态
        sign='4PL'//标识4pl项目为 4PL前缀
    } = props;
    const [curMilestones, setCurMilestones] = useState<any[]>([]); // 保存业务方传入日期数据
    const [milestoneList, setMilestoneList] = useState<any[]>([]); // 保存节点数据

    // 请求节点数据
    useEffect(() => {
        if (transportMode) {
            const promise: any = getShipmentsOwner(sign, transportMode);
            promise.then((res: any) => {
                const data: any = [];
                (res?.data || []).forEach((v: any) => {
                    if (v.code === 'SST_BIN') {
                        data.unshift(v);
                    } else {
                        data.push(v);
                    }
                });
                setMilestoneList([...data]);
            });
        }
    }, [transportMode]);
    // 保存传入日期数据，避免在修改时间时触发props
    useEffect(() => {
        if (milestones) {
            setCurMilestones(milestones);
        }
    }, [milestones]);
    const [modal, setmodal] = useState(false); // 弹框是否开启状态值
    const [width, setwidth] = useState(70); // 运输节点图标偏移高度
    const [currentSort, setSort] = useState(1); // icon 高亮
    // 只允许承运商操作里程碑
    const openDetail = () => {
        if (status) {
            setmodal(true);
        }
    };
    // 设置运输方式icon高度
    useEffect(() => {
        const length = document.querySelectorAll('.milestone-item.active')?.length; // 获取活动的节点数量
        if (length === 1) {
            setwidth(70); // 设置运输节点图标偏移高度
            return;
        }
        if (length > 1) {
            setwidth(70 + 70 * (length - 1));
        }
        return () => {
            setwidth(70);
        };
    }, [currentSort]);
    // 根据外部数据取icon
    const transportModes = [
        {
            code: 'TPM_ROAD',
            icon: (
                <i className=" transports" style={{ top: `${width}px` }}>
                    <TpmRoadIcon />
                </i>
            ),
        },
        {
            code: 'TPM_SEA',
            icon: (
                <i className=" transports" style={{ top: `${width}px` }}>
                    <TpmSeaIcon />
                </i>
            ),
        },
        {
            code: 'TPM_AIR',
            icon: (
                <i className="transports" style={{ top: `${width}px` }}>
                    <TpmAirIcon />
                </i>
            ),
        },
        {
            code: 'TPM_RAIL',
            icon: (
                <i className=" transports" style={{ top: `${width}px` }}>
                    <TpmRailIcon />
                </i>
            ),
        },
        {
            code: 'TPM_EXPRESS',
            icon: (
                <i className=" transports" style={{ top: `${width}px` }}>
                    <TpmExpressIcon />
                </i>
            ),
        },
    ];
    // 初始化当前高亮节点初始值
    useEffect(() => {
        setSort(1);
        return () => {
            setSort(1);
        };
    }, [logisticsOrderId]);
    // 设置当前高亮节点
    const setCurrent = (val: any) => {
        setSort(val);
    };

    // 传入修改后的数据业务方并返回结果
    const setData = (data: any) => {
        seveNewMilestones(timeZone(data), (v: any) => {
            if (v.status === 'success' || v.success || v) {
                setmodal(false);
                setCurMilestones([...data]);
            } else {
                setCurMilestones(milestones);
                message.warning(language['JusdaWaybillList.更新数据失败']);
            }
        });
    };
    return (
        <div className="milestone">
            <div className="milestoneBox">
                {milestoneList &&
                    milestoneList.map((item: any, index: number) => {
                        return (
                            <Item
                                key={item.code}
                                title={item.name}
                                code={item.code}
                                sort={index + 1}
                                actives={currentSort >= index + 1}
                                setCurrentSort={setCurrent}
                                milestones={curMilestones}
                                transportMode={transportMode}
                                logisticsOrderId={logisticsOrderId}
                                iconColor={iconColor}
                            />
                        );
                    })}
            </div>
            {/* 运输方式icon */}
            {milestoneList?.length > currentSort &&
                logisticsOrderOperateStatus === 'PENDING_UPDATE' &&
                transportModes.find((item) => item.code === transportMode)?.icon}
            {/* 针对货主隐藏更新节点按钮字段 */}
            {status && (
                <div className="update-item">
                    <Button
                        onClick={openDetail}
                        icon={
                            <i>
                                <svg
                                    className="icon svg-icon"
                                    style={{ width: '16px', height: '16px' }}
                                    aria-hidden="true"
                                >
                                    <use xlinkHref="#business-Update"></use>
                                </svg>
                            </i>
                        }
                    >
                        {language['JusdaWaybillList.更新节点']}
                    </Button>
                </div>
            )}
            {/* 编辑弹框 */}
            <Modal
                visible={modal}
                onCancel={() => {
                    setCurMilestones(milestones);
                    setmodal(false);
                }}
                modalOk={(data: any) => {
                    setData(data);
                }}
                transportMode={transportMode}
                milestones={curMilestones}
                milestoneList={milestoneList}
                iconColor={iconColor}
            />
        </div>
    );
};
export default MileStone;
