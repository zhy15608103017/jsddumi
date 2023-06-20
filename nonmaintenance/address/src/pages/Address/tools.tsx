import * as React from "react";

const createForm3 = (Form: any, getFieldDecorator: any) => (props: any) => {
  const { label, name, rules, children, optionsss, ...other } = props;
  return (
    <Form.Item label={label} {...other}>
      {name ? getFieldDecorator(name, optionsss)(children) : children}
    </Form.Item>
  );
};

const createForm4 = (Form: any) => (props: any) => {
  const { label, name, rules, children, optionsss = {}, ...other } = props;
  return (
    <Form.Item
      label={label}
      name={name}
      rules={rules}
      {...optionsss}
      {...other}
    >
      {children}
    </Form.Item>
  );
};

const nameLocalTransport = (item: any, params: any) => {
  let value = "";
  value = item?.[params?.ctDescribe];
  if (!value && params?.ctDescribe === "nameLocal") {
    value = item?.["name"];
  }
  return value;
};

// 毒瘤接口所致 将接口返回数据处理后导出(添加ctCode与ctDescribe)
const getInterfaceData = async (func: Function, params: any) => {
  const { ctCode } = params;
  let returnData = "";
  await func(params).then((res: any) => {
    if (res?.result?.data) {
      returnData = res?.result?.data?.map((item: any) => {
        return {
          ctCode: item[ctCode],
          ctDescribe: nameLocalTransport(item, params),
          ctAbbreviation: item[params?.ctAbbreviation],
          ctAddressCode: item[params?.ctAddressCode],
          ...item,
        };
      });
    } else if (res?.result) {
      returnData = res?.result?.map((item: any) => {
        return {
          ctCode: item[ctCode],
          ctDescribe: nameLocalTransport(item, params),
          ctAbbreviation: item[params?.ctAbbreviation],
          ctAddressCode: item[params?.ctAddressCode],
          ...item,
        };
      });
    } else if (res?.data) {
      returnData = res?.data.map((item: any) => {
        return {
          ctCode: item[ctCode],
          ctDescribe: nameLocalTransport(item, params),
          ctAbbreviation: item[params?.ctAbbreviation],
          ctAddressCode: item[params?.ctAddressCode],
          ...item,
        };
      });
    }
  });
  return returnData;
};

export { createForm3, createForm4, getInterfaceData };
