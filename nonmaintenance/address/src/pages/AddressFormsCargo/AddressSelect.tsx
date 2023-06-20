import React, {
    useState,
    useEffect,
    useRef,
    forwardRef,
    useImperativeHandle,
} from 'react';
import { Select } from 'antd';
import styled from 'styled-components';
import { addressIntl } from '../../Intl/index';

const { address } = addressIntl;

const { Option } = Select;

const AddIcon = styled.div`
  text-align: center;
  color: #ea9000;
  font-size: 12px;
  padding: 5px 0;
`;

const Abbreviation = styled.div`
  position: relative;
  top: -3px;
  height: 16px;
  text-align: left;
  span {
    font-size: 12px;
    color: #aaaaaa;
    display: inline-block;
    position: absolute;
    height: 20px;
  }
  .abbreviation-name {
    overflow: hidden;
    transform: scale(0.8, 0.8);
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 105px;
    left: -10px;
  }
  .abbreviation-code {
    right: -0px;
    transform: scale(0.8, 0.8);
  }
`;

// const;

const AddressSelect = (props: any, ref: any) => {
    const {
        optionsData,
        addressSelectConfig,
        onChange: propOnChange,
        value: propValue,
        style = {},
        selectProps = {},
        disable = false,
        isInternationalPartner = false,
    } = props;
    const [value, setValue] = useState(propValue);
    const monitor = useRef(true);

    const handleChange = (value: any, mandatory?: boolean) => {
        setValue(value);

        if (monitor.current) {
            if (value && propValue && mandatory) {
                return propOnChange(value, true);
            }
            if (value !== propValue) {
                return propOnChange(value, true);
            }
            if (value !== undefined && propValue !== undefined) {
                return propOnChange(value, false);
            }
        }
    };

    useEffect(() => {
        if (propValue !== value && monitor.current) {
            setValue(propValue);
        }
    }, [propValue]);

    useImperativeHandle(ref, () => ({
        selectChange: () => {
            handleChange(value, true);
        },
    }));

    const divRef = React.createRef<HTMLDivElement>();

    useEffect(() => {
        return () => {
            monitor.current = false;
        };
    }, []);

    return (
        <div ref={divRef}>
            <Select
                getPopupContainer={() => divRef.current}
                allowClear
                placeholder={address['Please Select']}
                onChange={handleChange}
                defaultValue={value}
                value={value}
                showSearch
                style={{ width: '100%', ...style }}
                disabled={disable}
                {...selectProps}
            >
                {optionsData.map((item: any, index: number) => {
                    const { ctDescribe = '', ctCode = index } = item;
                    if (item.enumeration === 'ADDADDRESS') {
                        //提货地址下拉框
                        return (
                            <Option key={`${ctDescribe}${ctCode}`} value={item?.ctCode}>
                                <div>
                                    {ctDescribe} {addressSelectConfig?.showCode ? ctCode : ''}
                                </div>
                                {item?.ctAbbreviation || item?.ctAddressCode ? (
                                    <Abbreviation className="abbreviation-container">
                                        <span className="abbreviation-name">
                                            {item?.ctAbbreviation}
                                        </span>
                                        <span className="abbreviation-code">
                                            {item?.ctAddressCode}
                                        </span>
                                    </Abbreviation>
                                ) : (
                                    ''
                                )}
                            </Option>
                        );
                    } else
                        return (
                            <Option key={`${ctDescribe}${ctCode}`} value={item?.ctCode}>
                                <div>
                                    {ctDescribe} {addressSelectConfig?.showCode ? ctCode : ''}
                                </div>
                                {item?.ctAbbreviation ||
                item?.ctAddressCode ||
                item?.addressAbbreviation ||
                item?.addressCode ? (
                                        <Abbreviation className="abbreviation-container">
                                            <span className="abbreviation-name">
                                                {item?.ctAbbreviation || item?.addressAbbreviation}
                                            </span>
                                            <span className="abbreviation-code">
                                                {item?.ctAddressCode || item?.addressCode}
                                            </span>
                                        </Abbreviation>
                                    ) : (
                                        ''
                                    )}
                            </Option>
                        );
                })}
            </Select>
        </div>
    );
};

export default forwardRef(AddressSelect);
