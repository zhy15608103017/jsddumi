import React, { useState, useEffect, useRef } from 'react';
import { Select } from 'antd';
import styled from 'styled-components';
import { addressIntl } from '../../Intl/index';

const { address } = addressIntl;

const { Option } = Select;

const AddIcon = styled.div`
  text-align: center;
  color: #ea9000;
  font-size: 12px;1
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

const AddressSelect = (props: any) => {
    const {
        optionsData,
        addressSelectConfig,
        onChange: propOnChange,
        value: propValue,
        modal,
        style,
        selectProps = {},
        disable = false,
    // isInternationalPartner = false,
    } = props;
    const [value, setValue] = useState(propValue);
    const monitor = useRef(true);
    const [visible, setVisible] = useState(false);

    const { isAddAble } = addressSelectConfig;
    const handleChange = (value: any) => {
        setValue(value);
    };

    const showModal = () => {
        setVisible(true);
    };

    useEffect(() => {
        if (monitor.current) {
            if (value !== propValue) {
                return propOnChange(value, true);
            }
            if (value !== undefined && propValue !== undefined) {
                return propOnChange(value, false);
            }
        }
    }, [value]);

    useEffect(() => {
        if (propValue !== value && monitor.current) {
            setValue(propValue);
        }
    }, [propValue]);
    const Modal = React.isValidElement(modal)
        ? React.cloneElement(modal, {
        // @ts-ignore
            visible,
            setVisible,
        })
        : null;

    const ref = React.createRef<HTMLDivElement>();

    useEffect(() => {
        return () => {
            monitor.current = false;
        };
    }, []);

    return (
        <div ref={ref}>
            <Select
                getPopupContainer={() => ref.current}
                allowClear
                placeholder={address['Please Select']}
                onChange={handleChange}
                defaultValue={value}
                value={value}
                showSearch
                style={style ? style : {}}
                disabled={disable}
                dropdownRender={(menu) => (
                    <div style={{ cursor: 'pointer' }}>
                        {menu}
                        {isAddAble ? (
                            <AddIcon onClick={showModal}>
                +{address.add} {addressSelectConfig?.partNerTitle}
                            </AddIcon>
                        ) : null}
                    </div>
                )}
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
            {Modal}
        </div>
    );
};

export default AddressSelect;
