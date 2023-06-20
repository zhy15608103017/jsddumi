import React from 'react';
import { Select } from 'antd';
import styled from 'styled-components';

const ExternalContainer = styled.div`
   {
    font-size: 12px;
    width: 100px;
    flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
  }
`;

const { Option } = Select;

const ExternalCityOption = (params: any) => {
    const { index, item } = params;
    return (
        <Option
            key={JSON.stringify({
                countryCode: item?.countryCode,
                subdivisionCode: item?.subdivisionCode,
                cityCode: item?.cityCode,
                countyCode: item?.countyCode,
                index: index,
            })}
            value={item?.id}
        >
            <ExternalContainer>
                {item?.id}
                {/* <span>{item?.name},</span>  需求暂时改为不需要展示行政区域只需要展示五字码.
                <span> {item?.city?.name ? item?.city?.name + ',' : ''}</span>
                <span>
                    {' '}
                    {item?.country?.name}({item?.id}){' '}
                </span> */}
            </ExternalContainer>
        </Option>
    );
};

export default ExternalCityOption;
