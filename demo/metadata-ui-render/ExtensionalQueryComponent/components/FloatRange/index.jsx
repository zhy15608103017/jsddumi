import { Input } from 'antd';
import { useState, useEffect } from 'react';
import './index.less'

function FloatRange(props) {
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
    <Input
      className='combined-search-form-range-input-input'
      value={start}
      onChange={(e) => {
        if (/^\d+(\.)?(\d+)?$/.test(e.target.value)) {
          setStart(e.target.value);
          return
        };
        setStart('')
      }}
    />
    <span className='combined-search-form-range-input-separator'>~</span>
    <Input
      className='combined-search-form-range-input-input'
      value={end}
      onChange={(e) => {
        if (/^\d+(\.)?(\d+)?$/.test(e.target.value)) {
          setEnd(e.target.value);
          return
        };
        setEnd('')
      }}
    />
  </div>

}

export default FloatRange;
