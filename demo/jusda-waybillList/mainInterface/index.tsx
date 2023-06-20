import React, {
  FunctionComponent,
  useContext,
  useState,
  useEffect,
} from 'react';
import './index.less';
import { Button, message } from 'antd';
import Item from '../Item';
import Modal from '../Modal';
import { ICON_CODE } from '../utils/const';
// import { getShipmentsOwner } from '../utils/http';
import { getShipmentsOwner } from '../api/MileStone';
import language from '../locales/index';
// import { currentLanguage } from '@jusda-tools/jusda-publicMethod';
// import enUS from '../locales/en-US.js';
// import zhCN from '../locales/zh-CN.js';
// // 国际化弹框按钮
// const setLanguage = new Map()
//     .set('en-US', enUS.JusdaWaybillList)
//     .set('zh-CN', zhCN.JusdaWaybillList);
// const jusdaLanguage = currentLanguage();
// let language: string = setLanguage.get(jusdaLanguage);

interface MileStoneProps {
  seveNewMilestones: (data: any, callback: Function) => void;
  status: boolean;
  logisticsOrderId: any;
  milestones: any;
  route: any;
  transportMode: any;
  iconColor?: string;
  // updatedBtn?:string;
  // headerText?:string
}
const MileStone: FunctionComponent<MileStoneProps> = (props: any) => {
  const {
    seveNewMilestones, // 保存弹窗当前日期数据方法
    status, //针对货主隐藏更新节点按钮字段 || 只允许承运商操作里程碑
    logisticsOrderId, // ???
    milestones, //日期数据
    route, // 运输路线
    transportMode, // 运输方式
    iconColor, // 自定义异常图标颜色（非必传）
    // updatedBtn,//自定义弹框按钮文字（非必传）
    // headerText // 自定义弹框title文本（非必传）
  } = props;
  const [curMilestones, setCurMilestones] = useState(milestones); // 保存业务方传入日期数据
  const [milestoneList, setMilestoneList] = useState<any[]>([]); // 保存节点数据
  //请求节点数据
  useEffect(() => {
    if (route && transportMode) {
      const promise: any = getShipmentsOwner(route, transportMode);
      promise.then((res: any) => {
        setMilestoneList([...res?.data]);
      });
    }
  }, [route, transportMode]);
  // 保存传入日期数据，避免在修改时间时触发props
  useEffect(() => {
    if (milestones && milestones.length > 0) {
      let res = JSON.parse(JSON.stringify(milestones));
      setCurMilestones([...res]);
    }
  }, [milestones]);
  const [modal, setmodal] = useState(false); // 弹框是否开启状态值
  const [width, setwidth] = useState(80); // 运输节点图标偏移高度
  const [currentSort, setSort] = useState(1); // icon 高亮
  //只允许承运商操作里程碑
  const openDetail = () => {
    if (status) {
      setmodal(true);
    }
  };
  // 设置运输方式icon高度
  useEffect(() => {
    const length = document.querySelectorAll('.milestone-item.active')?.length; //获取活动的节点数量
    if (length === 1) {
      setwidth(80); //设置运输节点图标偏移高度
      return;
    }
    if (length > 1) {
      setwidth(80 + 70 * (length - 1));
    }
    return () => {
      setwidth(80);
    };
  }, [currentSort]);
  //根据外部数据取icon
  const transportModes = [
    {
      code: 'TPM_ROAD',
      icon: (
        <i
          style={{ top: `${width}px` }}
          className="transport-land-transportation-side transport  iconfont"
        ></i>
      ),
    },
    {
      code: 'TPM_SEA',
      icon: (
        <i
          style={{ top: `${width}px` }}
          className="transport-ship-transportation-side transport  iconfont"
        ></i>
      ),
    },
    {
      code: 'TPM_AIR',
      icon: (
        <i
          style={{ top: `${width}px` }}
          className="transport-air-transport-side transport  iconfont"
        ></i>
      ),
    },
    {
      code: 'TPM_RAIL',
      icon: (
        <i
          style={{ top: `${width}px` }}
          className="transport-rail-transportation-side transport  iconfont"
        ></i>
      ),
    },
    {
      code: 'TPM_EXPRESS',
      icon: (
        <i
          style={{ top: `${width}px` }}
          className="transport-car-transportation-side transport  iconfont"
        ></i>
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
    seveNewMilestones(data, (v: any) => {
      if (v.status === 'success' || v.success || v) {
        setmodal(false);
        setCurMilestones([...data]);
      } else {
        let res = JSON.parse(JSON.stringify(milestones));
        setCurMilestones([...res]);
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
                // type={ICON_CODE[item.code]}
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
          let res = JSON.parse(JSON.stringify(milestones));
          setCurMilestones([...res]);
          setmodal(false);
        }}
        modalOk={(data) => {
          setData(data);
        }}
        transportMode={transportMode}
        milestones={curMilestones}
        milestoneList={milestoneList}
        iconColor={iconColor}
        // headerText={headerText}
      />
    </div>
  );
};
export default MileStone;
