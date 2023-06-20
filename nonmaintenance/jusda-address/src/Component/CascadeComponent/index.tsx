import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import SearchSelect from './SearchSelect';
import { getCountries } from '../../Api';
import './index.less';
import { useAddressIntl } from '../../useIntl';
import { FormInstance } from 'antd/es/form';
const { Option } = Select;

const requestUrlMap = [
  // 省份州区：根据国家编码查询所有
  'subdivisions',
  // 城市：根据省份州区编码查询所有
  'cities',
  // 区县：根据市编码查询所有
  'counties',
];

const initialValue = new Array(4) as string[];

interface CascadeFormCompProps {
  value?: any;
  onChange?: Function;
  setCityOption?: Function;
  isInternational?: boolean;
  setRegionTransportLocationOption?: Function;
  form: FormInstance;
  disabled?: boolean;
  dataLanguageType: 'zh-CN' | 'en-US';
  countryCodesIn?: [...any];
  defineTransportLocationRange?: {
    api?: Function;
    params?: { shippingMode: string };
  };
}

const CascadeFormComp = ({
  value = initialValue,
  onChange = () => {},
  isInternational = false,
  dataLanguageType = 'zh-CN',
  setRegionTransportLocationOption = () => {},
  disabled = false,
  form,
  countryCodesIn = [],
}: CascadeFormCompProps) => {
  const [cascadeCode, setCascadeCode] = useState(value);
  const { formatMessage } = useAddressIntl();
  const [options, setOptions] = useState([]);
  const getOptions = () => {
    if (options && options.length) {
      if (dataLanguageType === 'en-US') {
        return options.map((item: any) => {
          const newItem = JSON.stringify({ ...(item || {}) });
          return (
            <Option key={newItem} value={item.name}>
              {item.name}
            </Option>
          );
        });
      } else {
        return options.map((item: any) => {
          const newItem = JSON.stringify({ ...(item || {}) });
          return (
            <Option key={newItem} value={item.nameLocal || item.name}>
              {item.nameLocal || item.name}
            </Option>
          );
        });
      }
    }
    return null;
  };

  const handleChange = (index: number, itemData: string, value: string) => {
    const data = JSON.parse(itemData);
    const { code } = data;
    
    let newCascadeCode = [...cascadeCode];
    let newCascadeName = form.getFieldValue('cascadeName') || [];

    newCascadeCode.splice(index, 1, code);
    newCascadeCode = newCascadeCode.map((item: any, idx: number) => {
      return idx > index ? '' : item;
    });

    newCascadeName.splice(index, 1, value);
    newCascadeName = newCascadeName.map((item: any, idx: number) => {
      return idx > index ? '' : item;
    });

    setCascadeCode(newCascadeCode);
    form?.setFieldsValue({
      cascadeName: newCascadeName,
    });
    onChange(newCascadeCode);
  };

  useEffect(() => {
    getCountries({
      codeIn: countryCodesIn,
      internationalShareEq: isInternational,
    }).then(({ result: { data } }: any) => {
      setOptions(data);
    });
  }, [isInternational]);

  // 编辑时
  useEffect(() => {
    setCascadeCode(value);
    const transportLocationCode = form.getFieldValue('transportLocationCode');
    if (transportLocationCode) {
      setRegionTransportLocationOption([
        {
          value: transportLocationCode,
          name: transportLocationCode,
          id: transportLocationCode,
        },
      ]);
    }
  }, [value]);

  // 获取name值.
  const getValue = () => {
    if (!(options && options.length)) return null;
    const selectedOptions: any = options.filter(
      ({ code }) => cascadeCode[0] === code,
    );
    if (selectedOptions && selectedOptions.length) {
      if (dataLanguageType === 'en-US') {
        return selectedOptions[0].name;
      } else return selectedOptions[0].nameLocal || selectedOptions[0].name;
    }
  };
  return (
    <div className={'address-cascade-container'}>
      <Select
        style={{ width: '25%' }}
        placeholder={formatMessage({ id: 'country' })}
        disabled={disabled}
        showSearch={true}
        value={getValue()}
        onChange={(e, opt: any) => handleChange(0, opt.key, opt.value)}
        dropdownMatchSelectWidth={false}
      >
        {getOptions()}
      </Select>
      {cascadeCode && cascadeCode.length
        ? cascadeCode.map((item: any, index: number, array: any) => {
            if (index + 1 === array.length) return null;
            return (
              <SearchSelect
                disabled={disabled}
                url={requestUrlMap[index]}
                parentCode={item}
                dataLanguageType={dataLanguageType}
                key={index + '100a'}
                value={array[index + 1]}
                onChange={(allData, value) => {
                  if (value) {
                    handleChange(index + 1, allData, value);
                  }
                }}
              />
            );
          })
        : null}
    </div>
  );
};

export default CascadeFormComp;
