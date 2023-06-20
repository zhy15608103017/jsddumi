import React, {
  forwardRef,
} from 'react';
import { FormInstance, Form, Input } from 'antd';
import CascadeComponent from '../../CascadeComponent';

import SwitchButton from '../../SwitchButton';
import { useAddressIntl } from '../../../useIntl';
import './index.less';
import TransportSelect from './TransportSelect';

const Cascade = (
  {
    form,
    showErrorTip,
    handleSwitchManualInput = () => { },
    isManualInput = false,
    tag,
    dataLanguageType,
    shippingMode,
    defineTransportLocationRange = {},
    ...args
  }: {
    form: FormInstance;
    countryCodesIn?: [...any];
    showErrorTip: boolean;
    handleSwitchManualInput: Function;
    isManualInput: boolean;
    dataLanguageType: 'zh-CN' | 'en-US';
    tag?: [...any];
    shippingMode?: string;
    defineTransportLocationRange?: {
      api?: Function;
      params?: { shippingMode: string };
    };
  },
  ref: any,
) => {
  const { formatMessage } = useAddressIntl();

  const isInternational = tag?.some((item) => item === 'international');

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '88px',
      }}
    >
      <div style={{ width: isInternational ? '80%' : '100%' }}>
        <Form.Item
          rules={[
            {
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                let sign = false;
                const countryCode = value[0];
                const validatorLength = countryCode === 'CN' ? 4 : 3;
                sign = value.every((item: any, index: number) => {
                  // 国内地址的时候 必须要选到市区
                  if (index < validatorLength) {
                    return item;
                  }
                  return true;
                });
                //

                if (!sign) {
                  return Promise.reject(
                    formatMessage({
                      id: 'Please Administrative Region',
                    }),
                  );
                }
                return Promise.resolve();
              },
            }),
          ]}
          className={'cascade-container'}
          name="cascadeCode"
          label={`${formatMessage({ id: 'Administrative Region' })} ${showErrorTip
              ? formatMessage({
                id:
                  'This area does not support automatic address search mode',
              })
              : ''
            }`}
        >
          <CascadeComponent
            form={form}
            disabled={!isManualInput && !isInternational}
            isInternational={isInternational}
            dataLanguageType={dataLanguageType}
            {...args}
          />
        </Form.Item>
      </div>
      <div style={{ width: isInternational ? '20%' : 0 }}>
        {isInternational && (
          <Form.Item
            label=" "
            required={false}
            rules={[
              {
                required: shippingMode === 'TPM_EXPRESS' ? false : true,
                message: formatMessage({ id: 'Please select a city code' }),
              },
            ]}
            name="transportLocationCode"
          >
            <TransportSelect defineTransportLocationRange={defineTransportLocationRange} />
          </Form.Item>
        )}
      </div>
      {isManualInput && !isInternational && (
        <span
          style={{
            position: 'absolute',
            top: '-6px',
            right: 0,
          }}
          className={'address-cascade-switch'}
        >
          <SwitchButton
            handleClick={() => handleSwitchManualInput(false)}
            label={formatMessage({
              id: 'Switch to automatic mode',
            })}
          />
        </span>
      )}
      <Form.Item hidden={true} name="cascadeName">
        <Input />
      </Form.Item>
    </div>
  );
};

export default forwardRef(Cascade);
