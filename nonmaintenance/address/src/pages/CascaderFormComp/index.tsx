import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import SearchSelect from './SearchSelect';
import * as Api from '../../Api/index';
import { getInterfaceData } from '../Address/tools';
const { Option } = Select;

const requsetUrlMap = [
    // 省份州区：根据国家编码查询所有
    'subdivisions',
    // 城市：根据省份州区编码查询所有
    'cities',
    // 区县：根据市编码查询所有
    'counties',
];

const initialValue = new Array(4) as string[];

interface CascaderFormCompProps {
    codeEq?: string;
    value?: any;
    onChange?: Function;
    setCityOption?: Function;
    isInternationalPartner: boolean;
    language: string;
    form?: any;
    needValue?: boolean;
    disabled?: boolean;
    // changeName?: Function;
}

const CascaderFormComp = ({
    codeEq,
    value = initialValue,
    onChange = () => {},
    setCityOption = () => {},
    isInternationalPartner = false,
    language = localStorage.umi_locale,
    form,
    needValue = false,
    disabled = false,
}: // changeName = () => {}
CascaderFormCompProps) => {
    const [cascaderCode, setCascaderCode] = useState(
        needValue ? value.codes : value
    );
    const [cascaderValue, setCascaderValue] = useState(['', '', '', '']);
    const [options, setOptions] = useState([]);
    const getOptions = () => {
        if (options && options.length) {
            if (language === 'en-US') {
                return options.map(({ code, name }: any, index) => (
                    <Option key={code} value={name}>
                        {name}
                    </Option>
                ));
            } else {
                return options.map(({ code, name, nameLocal }: any, index) => (
                    <Option key={code} value={nameLocal || name}>
                        {nameLocal || name}
                    </Option>
                ));
            }
        }
        return null;
    };

    const handleChange = (index: number, e: string, v: string) => {
        let newCascaderCode = [...cascaderCode];

        newCascaderCode.splice(index, 1, e);
        if (index <= 2) {
            form && form.setFieldsValue({ transportLocationCode: null });
        }
        newCascaderCode = newCascaderCode.map((it: any, idx: number) => {
            return idx > index ? '' : it;
        });

        setCascaderCode(newCascaderCode);
        if (needValue) {
            let values = [...cascaderValue];
            values[index] = v || '';
            values = values.map((it: any, idx: number) => {
                return idx > index ? '' : it;
            });
            setCascaderValue(values);
            onChange({ codes: newCascaderCode, values });
        } else {
            onChange(newCascaderCode);
        }
    };

    // 用于将选中的地区名称传递出去， 通常在选择五子码的时候 不会执行地区的onChange事件，  所以这里在判断cascaderCode值达到3个的时候就执行
    // 但是在选择地址达到3个的时候也会执行这里， 目前只是重复覆盖数据，所以暂时不另行处理
    const setOptValues = (data: any) => {
        const { country, subdivision, city } = data;
        const values = [...cascaderValue];
        if (language === 'en-US') {
            values[0] = country.name;
            values[1] = subdivision.name;
            values[2] = city.name;
        } else {
            values[0] = country.nameLocal || country.name;
            values[1] = subdivision.nameLocal || subdivision.name;
            values[2] = city.nameLocal || city.name;
        }
        values[3] = '';

        onChange({ codes: cascaderCode, values });
    };

    useEffect(() => {
        Api.getCountries({ codeEq, isInternationalPartner }).then(
            ({ result: { data } }: any) => {
                setOptions(data);
            }
        );
    }, []);

    useEffect(() => {
        setCascaderCode(value);
    }, [value]);

    useEffect(() => {
        if (cascaderCode?.[2]) {
            getInterfaceData(Api?.getTransportLocationCode, {
                cityCodeEq: cascaderCode?.[2],
                isInternationalPartner,
            }).then((res) => {
                if (needValue && res.length) {
                    setOptValues(res[0]);
                }
                setCityOption(res);
            });
        }
    }, [cascaderCode]);

    // 获取name值.
    const getValue = () => {
        if (!(options && options.length)) return null;
        const seletedOptions: any = options.filter(
            ({ code, name }) => cascaderCode[0] === code
        );
        if (seletedOptions && seletedOptions.length) {
            if (language === 'en-US') {
                return seletedOptions[0].name;
            } else return seletedOptions[0].nameLocal || seletedOptions[0].name;
        }
    };
    return (
    <>
      <Select
          disabled={disabled}
          showSearch={true}
          value={getValue()}
          onChange={(e, opt: any) => handleChange(0, opt.key, opt.value)}
          dropdownMatchSelectWidth={false}
      >
          {getOptions()}
      </Select>
      {cascaderCode && cascaderCode.length
          ? cascaderCode.map((item: any, index: number, array: any) => {
              if (index + 1 === array.length) return null;
              return (
                  <SearchSelect
                      disabled={disabled}
                      url={requsetUrlMap[index]}
                      parentCode={item}
                      language={language}
                      key={index + '100a'}
                      value={array[index + 1]}
                      onChange={(e, v) => {
                          if (e) {
                              handleChange(index + 1, e, v);
                          }
                      }}
                  />
              );
          })
          : null}
    </>
    );
};

export default CascaderFormComp;
