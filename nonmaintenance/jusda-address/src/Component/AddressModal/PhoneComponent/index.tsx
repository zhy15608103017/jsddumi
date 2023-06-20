import React, { useEffect, useState } from 'react';
import { FormInstance, Form, Input, Select } from 'antd';
import EnglishInput from '../../EnglishInput';
import { useAddressIntl } from '../../../useIntl';
import { getAreaCode } from '../../../Api';
import { filterOption } from '../../../utils/Fn';
import './index.less';

const { Item } = Form;
const { Option } = Select;

interface areaOption {
  countryCode: string;
  countryName: string;
  countryNameLocal: string;
  phoneAreaCode: number;
}

const PhoneComponent = ({
  form,
  tag,
  dataLanguageType = 'zh-CN',
}: {
  form: FormInstance;
  tag: [...any];
  dataLanguageType: 'zh-CN' | 'en-US'; //获取数据语言类型
}) => {
  const { formatMessage } = useAddressIntl();
  const [areaOption, setAreaOption] = useState([]);
  const isInternational = tag?.some((item) => item === 'international');
  const isShipperAndConsignee = tag?.some(
    (item) => item === 'shipperAddressAndConsigneeAddress',
  );
  const EnglishInputOrInput = (props: any) =>
    isInternational && isShipperAndConsignee ? (
      <EnglishInput {...props} />
    ) : (
      <Input {...props} />
    );
  useEffect(() => {
    getAreaCode({ dataLanguageType }).then((res: any) => {
      setAreaOption(res?.result || []);
    });
  }, []);
  const AreaCode = ({ name }: { name: string }) => {
    const node = (
      <Item noStyle name={name}>
        <Select
          filterOption={filterOption}
          showSearch
          optionLabelProp="value"
          dropdownMatchSelectWidth={330}
          style={{ width: 70 }}
        >
          {areaOption?.map((item: areaOption) => {
            return (
              <Option
                key={item.phoneAreaCode + item.countryName}
                value={item.phoneAreaCode}
              >
                {item.countryNameLocal}-{item.phoneAreaCode}
              </Option>
            );
          })}
        </Select>
      </Item>
    );
    return node;
  };

  return (
    <div className={'phone-container'}>
      <Item
        rules={[
          { required: true, message: formatMessage({ id: 'Please Contact' }) },
        ]}
        name={'contactsName'}
        label={formatMessage({ id: 'Contact' })}
      >
        <EnglishInputOrInput
          placeholder={formatMessage({ id: 'Please Contact' })}
          style={{ width: 200 }}
        />
      </Item>
      <Item
        required={true}
        rules={[
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (value && getFieldValue('telephoneArea')) {
                return Promise.resolve();
              }
              return Promise.reject(formatMessage({ id: 'Please phone' }));
            },
          }),
        ]}
        name={'mobile'}
        label={formatMessage({ id: 'Mobile phone' })}
      >
        <Input
          placeholder={formatMessage({ id: 'Mobile phone' })}
          addonBefore={<AreaCode name={'mobileArea'} />}
        />
      </Item>
      <Item name={'telephone'} label={formatMessage({ id: 'Tel' })}>
        <Input
          placeholder={formatMessage({ id: 'Tel' })}
          addonBefore={<AreaCode name={'telephoneArea'} />}
        />
      </Item>
    </div>
  );
};
export default PhoneComponent;
