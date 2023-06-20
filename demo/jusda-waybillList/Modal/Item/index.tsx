import React, {
  FunctionComponent,
  useContext,
  useState,
  useEffect,
} from 'react';
import moment from 'moment';
import './index.less';
import { Row, Col, Form, Button } from 'antd';
interface ItemProps {
  // type?: string;
  title?: string;
  code?: string;
  setCurrentSort?: (val: any) => void;
  sort?: number;
  actives?: boolean;
  milestoneList: any;
  milestones: any;
  iconColor?: string;
}
const Item: FunctionComponent<ItemProps> = (props) => {
  const {
    // type, // 图标的icon
    children,
    title, // 节点名称
    code, // 当前节点对应的唯一code
    setCurrentSort, //设置最后亮的节点
    sort, // 该项绑定的唯一排序
    actives, // 当前节点是否亮
    milestoneList, // 获取当前节点结构
    milestones, // 获取当前日期数据
    iconColor, // 自定义颜色
  } = props;
  // 判断是否显示当前节点
  const isShow = !!milestoneList?.find((item: any) => item.code === code);
  // 获取当前节点数据
  const milestone = milestones?.find((item: any) => item.code === code);
  // 设置最后亮的节点sort
  useEffect(() => {
    if (milestone && milestone['act']) {
      setCurrentSort && setCurrentSort(sort);
    }
  }, [milestone]);

  const [form] = Form.useForm();
  useEffect(() => {
    // 其他节点回显数据
    let newData = {
      est: milestone?.est ? moment(milestone?.est) : null,
      act: milestone?.act ? moment(milestone?.act) : null,
      cutoff: milestone?.cutoff ? moment(milestone?.cutoff) : null,
    };
    form.setFieldsValue(newData);
  }, [milestones]);
  return (
    <div>
      {isShow && (
        <div
          className={`modal-item  ${
            'WARNING' === milestone?.riskLevel ? 'redIcon' : ''
          } ${actives ? 'actives' : ''}`}
        >
          <Form form={form}>
            <Row gutter={30}>
              <Col span={4}>
                {/* <i className={`iconfont item-first ${type} ${actives ? 'itemActive' : ''} iconfont`} style={{color:"WARNING" === milestone?.riskLevel?iconColor:''}}></i> */}
                <i
                  className={`icon-B_yiwancheng-01 iconfont ${"WARNING" === milestone?.riskLevel?'redIconBorder':''}`}
                  style={{
                    color: 'WARNING' === milestone?.riskLevel ? iconColor : '',
                  }}
                ></i>
                <div>{title}</div>
              </Col>
              {children}
            </Row>
           
          </Form>
        </div>
      )}
    </div>
  );
};
export default Item;
