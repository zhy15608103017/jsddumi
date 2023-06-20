import React from 'react';
import { useAddressIntl } from '../../useIntl';
import ButtonAndIcon from '../../Component/ButtonAndIcon';
import { UsedAddressIcon } from '../../assets/SvgIcon';
import './index.less';

const Title = ({
  title,
  openAddModal = () => {},
  readOnlyProperty = false,
  required = true,
  titleCustomButton = [],
}: {
  title: string;
  readOnlyProperty: boolean;
  openAddModal: Function;
  required: boolean;
  titleCustomButton?: [...any];
}) => {
  const { formatMessage } = useAddressIntl();

  return (
    <div className={'address-title-container'}>
      <div className={'address-title address-title-common-button'}>
        {required && <span className="address-title-required">*</span>}
        {title}
      </div>
      <div
        style={{ display: 'flex' }}
        className={'address-title-common-button'}
      >
        {titleCustomButton?.map((item: any, index: number) => (
          <div key={index + 15500}>{item}</div>
        ))}
        {!readOnlyProperty && (
          <ButtonAndIcon
            onClick={() => openAddModal(false)}
            icon={<UsedAddressIcon />}
            label={formatMessage({ id: 'common address' })}
          />
        )}
      </div>
    </div>
  );
};

export default Title;
