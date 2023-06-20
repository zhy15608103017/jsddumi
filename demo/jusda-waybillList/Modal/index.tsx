import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { Modal, Col, Form, DatePicker, message } from 'antd';
import { checkInSource } from '../utils/fn';
import Item from './Item';
import './index.less';
import { ICON_CODE, ICON_TIMESTR } from '../utils/const';
import { transitionTime } from '../utils/fn';
import language from '../locales/index';

interface ModalProps {
  visible?: boolean;
  onCancel?: () => void;
  modalOk?: (data: any) => void;
  milestoneList?: any;
  milestones: any;
  transportMode: any;
  // headerText?: any;
  iconColor?: string;
}
const MileStoneModal: FunctionComponent<ModalProps> = (props) => {
  const {
    visible, //是否显示弹窗
    modalOk, //Modal确定事件
    onCancel, //Modal取消事件
    milestoneList, // 节点数据
    milestones, // 业务时间数据
    transportMode, // 运输方式
    // headerText, //弹框文本，默认值为订单运输状态更新
    iconColor, //自定义颜色
  } = props;
  const [curMilestones, setCurMilestones] = useState<any[]>([]); // 保存当前弹框日期改变后的数据
  // const isSea = checkInSource(['TPM_SEA'], transportMode); // 海运不显示时分秒
  const [currentSort, setSort] = useState(1);
  const [num,setNum]=useState(0)//判断时间是否校验通过
  useEffect(() => {
    setCurMilestones([...milestones]);
  }, [props.milestones]);
  // 设置当前有实际时间（act）的节点值
  const setCurrent = (val: any) => {
    setSort(val);
  };
  /**
     * 校验实际时间选择
     1）下一个节点的时间不能早于上一个节点
     2）上一个节点有值的情况下，下一个节点才能有值
     */
  const validateAct = (rule: any, value: any, callback: any, code: any) => { 
    try {
      let curIndex = 0;
      let lastCode = '';
      let nextCode = '';
      let lastObj;
      let nextObj;

      milestoneList.forEach(function (_value: any, index: any) {
        if (code === _value.code) {
          curIndex = index;
          lastCode = milestoneList[curIndex - 1]?.code;
          nextCode = milestoneList[curIndex + 1]?.code;
          lastObj = curMilestones?.find((item: any) => item.code === lastCode);
          nextObj = curMilestones?.find((item: any) => item.code === nextCode);
        }
      });
      //只能选择到秒 比较的是毫秒 因此去掉后三位
      const lastAct = transitionTime(lastObj?.act);
      const nextAct = transitionTime(nextObj?.act);
      const valueTime = transitionTime(value?.valueOf());
     
      // else if (!value || curIndex === 0 || lastCode === 'SST_BIN') {
      //   callback();
      //   return;
      // }
      if(!value){
        setNum(num+0)
        return;
      } else if (!parseInt(lastAct)&&!lastObj || !parseInt(lastAct)&&!lastObj?.act) {
        // 不能跳跃填写实际时间
        callback(language['JusdaWaybillList.不能跳跃填写实际时间']);
        setNum(num+1)
        return;
      } else if (parseInt(lastAct) > parseInt(valueTime)) {
        //早于上一个节点时间
        callback(language['JusdaWaybillList.当前节点早于上一个节点时间']);
        setNum(num+1)
        return;
      } else if (nextObj?.act && parseInt(valueTime) > parseInt(nextAct)) {
        //晚于下一个节点
        callback(language['JusdaWaybillList.当前节点晚于下一个节点时间']);
        setNum(num+1)
        return;
      }
      callback();
    } catch (error) {
      console.log('error', error);
    }
    if(num>0){
      setNum(num-1)
    }
  };
  return (
    <div>
      <Modal
        destroyOnClose
        maskClosable={false}
        visible={visible}
        title={language['JusdaWaybillList.订单运输状态更新']}
        centered
        className="MileStone-common-modal"
        width="1000px"
        okText={language['JusdaWaybillList.确定']}
        cancelText={language['JusdaWaybillList.取消']}
        onOk={(v) => {
          if (num!==0) {
            message.error(
              language['JusdaWaybillList.时间校验有误请重新选择时间'],
            );
            return
          }
          modalOk && modalOk(curMilestones);
        }}
        onCancel={() => {
          onCancel && onCancel();
        }}
      >
        {useMemo(
          () =>
            milestoneList.map((item: any, index: number) => {
              return (
                <Item
                  key={index}
                  title={item.name}
                  sort={index + 1}
                  actives={currentSort >= index + 1}
                  setCurrentSort={setCurrent}
                  milestoneList={milestoneList}
                  milestones={curMilestones}
                  code={item.code}
                  // type={ICON_CODE[item.code]}//若需根据code动态改变icon需要type
                  iconColor={iconColor}
                >
                  <Col span={6}>
                    <Form.Item
                      label={
                        ICON_TIMESTR[item.code]
                          ? ICON_TIMESTR[item.code][0]
                          : language['JusdaWaybillList.实际时间']
                      }
                      name={
                        milestoneList[index].code === 'SST_BIN' ? 'act' : 'est'
                      }
                      labelCol={{ span: 24 }}
                    >
                      <DatePicker
                        placeholder={language['JusdaWaybillList.请选择时间']}
                        getPopupContainer={(triggerNode) => {
                          return triggerNode;
                        }}
                        disabled={
                          milestoneList[index].code === 'SST_BIN' ? true : false
                        }
                        showTime={true}
                        onChange={(mdate, date) => {
                          let valueTime: any = null;
                          if (date) {
                            valueTime = new Date(date).getTime();
                          }
                          //判断是否已经push过该数据，如果已经存在直接修改时间的值
                          let exist = curMilestones.some(
                            (v: any) => v.code === milestoneList[index].code,
                          );
                          if (exist) {
                            curMilestones.map((v: any) => {
                              if (v.code === milestoneList[index].code) {
                                v.est = valueTime;
                                if (milestoneList[index].code === 'SST_BIN') {
                                  v.act = valueTime;
                                }
                              }
                            });
                          } else {
                            // 不存在日期数据，手动push
                            curMilestones.push({
                              id: null,
                              code: milestoneList[index].code,
                              milestoneType: 'TRANSPORT_MILESTONE',
                              est: valueTime,
                              act:
                                milestoneList[index].code === 'SST_BIN'
                                  ? valueTime
                                  : null,
                              cutoff: null,
                            });
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
                        name="act"
                        labelCol={{ span: 24 }}
                        rules={[
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
                        ]}
                      >
                        <DatePicker
                          placeholder={language['JusdaWaybillList.请选择时间']}
                          getPopupContainer={(triggerNode) => {
                            return triggerNode;
                          }}
                          showTime={true}
                          onChange={(mdate, date) => {
                            let valueTime: any = null;
                            if (date) {
                              valueTime = new Date(date).getTime();
                            }
                            //判断是否已经push过该数据，如果已经存在直接修改时间的值
                            let exist = curMilestones.some(
                              (v: any) => v.code === milestoneList[index].code,
                            );
                            if (exist) {
                              curMilestones.map((v: any) => {
                                if (v.code === milestoneList[index].code) {
                                  v.act = valueTime;
                                }
                              });
                            } else {
                              // 不存在日期数据，手动push
                              curMilestones.push({
                                id: null,
                                code: milestoneList[index].code,
                                milestoneType: 'TRANSPORT_MILESTONE',
                                est: null,
                                act: valueTime,
                                cutoff: null,
                              });
                            }
                            setCurMilestones([...curMilestones]);
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
                        name="cutoff"
                        labelCol={{ span: 24 }}
                      >
                        <DatePicker
                          placeholder={language['JusdaWaybillList.请选择时间']}
                          getPopupContainer={(triggerNode) => {
                            return triggerNode;
                          }}
                          showTime={true}
                          onChange={(mdate, date) => {
                            let valueTime: any = null;
                            if (date) {
                              valueTime = new Date(date).getTime();
                            }
                            //判断是否已经push过该数据，如果已经存在直接修改时间的值
                            let exist = curMilestones.some(
                              (v: any) => v.code === milestoneList[index].code,
                            );
                            if (exist) {
                              curMilestones.map((v: any) => {
                                if (v.code === milestoneList[index].code) {
                                  v.cutoff = valueTime;
                                }
                              });
                            } else {
                              // 不存在日期数据，手动push
                              curMilestones.push({
                                id: null,
                                code: milestoneList[index].code,
                                milestoneType: 'TRANSPORT_MILESTONE',
                                est: null,
                                act: null,
                                cutoff: valueTime,
                              });
                            }
                            setCurMilestones([...curMilestones]);
                          }}
                        />
                      </Form.Item>
                    </Col>
                  )}
                </Item>
              );
            }),
          [visible, currentSort],
        )}
      </Modal>
    </div>
  );
};
export default MileStoneModal;
