import { InputNumber } from 'antd';
import React, { useState, useEffect } from 'react';
import './index.less'

export default function IntegerRange(props) {
  const { value = [], onChange } = props;
  const [startS, endS] = value;
  const [start, setStart] = useState(startS);
  const [end, setEnd] = useState(endS);

  useEffect(() => {
    if (value !== undefined) {
      onChange && onChange([start, end])
    }
  }, [start, end])

  useEffect(() => {
    if (Array.isArray(value)) {
      setStart(value[0])
      setEnd(value[1])
    }
  }, [value])

  return <div className='combined-search-form-range-input-box'>
    <InputNumber
      className='combined-search-form-range-input-number'
      value={start}
      onChange={(v) => {
        setStart(v);
      }}
    />
    <span className='combined-search-form-range-input-separator'>~</span>
    <InputNumber
      className='combined-search-form-range-input-number'
      value={end}
      onChange={(v) => {
        setEnd(v);
      }}
    />
  </div>
}