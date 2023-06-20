import React, { useState, useEffect } from 'react';
import { useAddressIntl } from '../../useIntl';
import { Select } from 'antd';
import { getArea } from '../../Api';
const { Option } = Select;

interface SearchSelectProps {
  url: string;
  parentCode: string;
  value?: string;
  onChange?: (e: string, v: string) => void;
  dataLanguageType: string;
  disabled?: boolean;
}

const SearchSelect = ({
  url,
  parentCode = '',
  value = '',
  dataLanguageType = localStorage.umi_locale,
  onChange = () => {},
  disabled = false,
}: SearchSelectProps) => {
  const { formatMessage } = useAddressIntl();
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState(value);
  const [selectedParentCode, setSelectedParentCode] = useState(parentCode);

  useEffect(() => {
    if (!(!selectedParentCode && !selectedValue && value && parentCode)) {
      if (parentCode !== selectedParentCode) {
        // 清空值
        onChange('', '');
        // 清空下拉
        setOptions([]);
      }
    }
  }, [value, parentCode]);

  useEffect(() => {
    setSelectedParentCode(parentCode);
    if (parentCode) {
      getArea(parentCode, url, { dataLanguageType }).then(({ result }: any) => {
        setOptions(result);
      });
    }
  }, [parentCode]);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

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

  const handleChange = (e: string, option: any) => {
    onChange(option.key, option.value);
  };

  // 获取name值.
  const getValue = () => {
    if (!(options && options.length)) return null;
    const selectedOptions: any = options.filter(
      ({ code, name }) => selectedValue === code,
    );
    if (selectedOptions && selectedOptions.length) {
      if (dataLanguageType === 'en-US') {
        // @ts-ignore
        return selectedOptions[0].name;
        // @ts-ignore
      } else return selectedOptions[0].nameLocal || selectedOptions[0].name;
    }
  };

  return (
    <Select
      style={{ width: '25%' }}
      placeholder={formatMessage({ id: url })}
      disabled={disabled}
      showSearch={true}
      value={getValue()}
      onChange={handleChange}
      dropdownMatchSelectWidth={false}
    >
      {getOptions()}
    </Select>
  );
};

export default SearchSelect;
