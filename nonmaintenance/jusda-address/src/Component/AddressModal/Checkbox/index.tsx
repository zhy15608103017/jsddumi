import React, { useEffect } from 'react';
import { Checkbox } from 'antd';
import { useAddressIntl } from '../../../useIntl';
import './index.less';

const CheckboxComponent = ({
  onChange = () => {},
  value,
  disabledShareInternational,
  tag = [],
}: {
  value?: boolean;
  onChange?: Function;
  disabledShareInternational: boolean;
  tag?: [...any];
}) => {
  const isInternational = tag.some((item) => item === 'international');
  const { formatMessage } = useAddressIntl();
  const handleChange = (value: any) => {
    onChange(value.target.checked);
  };
  useEffect(() => {
    if (typeof value !== 'boolean') {
      onChange(isInternational);
    }
  }, []);
  return (
    <div className={'checkbox-container'}>
      <Checkbox
        disabled={disabledShareInternational}
        onChange={handleChange}
        checked={value}
      />
      <label className={'checkbox-label-container'}>
        {formatMessage({
          id: 'Is this data shared at home and abroad',
        })}
      </label>
    </div>
  );
};

export default CheckboxComponent;
