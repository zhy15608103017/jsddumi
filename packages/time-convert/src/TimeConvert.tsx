/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/interface-name-prefix */
/* eslint-disable */
// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { DatePicker ,Select} from 'antd';
import './styles/dark.less';
import './styles/light.less';
import moment from "moment"
// @ts-ignore
// eslint-disable-next-line
import TimeConvert from "./index"

type LocaleType = 'zh-CN' | 'en-US';


const LANGS = ['zh-CN', 'en-US'];
const { Option } = Select;

const TimezoneComponent: React.FC = (props) => {
    let {value,onOk,onChange,convertConfig} = props
    const [openPicker,setOpenPicker] = useState(false)
    if(typeof value != 'string'){
        value = ''
    }
    
    let [time,tz] = value.toString().split(' ')
    const [defaultTime,setDefaultTime] = useState(+time)
    tz = tz ? tz.toUpperCase():'UTC+'+Math.abs(new Date().getTimezoneOffset()/60)
    const [originTimezone,setOriginTimezone] = useState(tz)
    let allTimezone:string[] = []
    for(let i = 0;i < 24; i++){
        allTimezone.push('UTC+' + i/2)
    }  
    const timezoneSelect = (value:string)=>{
        setOriginTimezone(value)
        defaultTime ? onChange(TimeConvert.convertByTimezone({...convertConfig,originTimezone:value,time:defaultTime})):onChange('')
    }
    const okHandle = (now) =>{
        setDefaultTime(now?._d)
        onOk(now._d,originTimezone)
        now._d ? onChange(TimeConvert.convertByTimezone({...convertConfig,originTimezone,time:now?._d})):onChange('')
        setOpenPicker(false)
    }
    const changeHandle = (date:Date,dateString:string) => {
        setDefaultTime(date?._d)
        date ? onChange(TimeConvert.convertByTimezone({...convertConfig,originTimezone,time:date?._d})):onChange('')
        setOpenPicker(false)
    }
    return (
            <DatePicker defaultValue={defaultTime && moment(new Date(defaultTime))}
            onClick={()=>setOpenPicker(!openPicker)} 
            open={openPicker}
            onOk={okHandle}
            onChange={changeHandle} 
            renderExtraFooter={() => <><Select defaultValue={originTimezone} onSelect={timezoneSelect} style={{ width: 120 }} >
                {allTimezone.map(timezone=><Option value={timezone} key={timezone}>{timezone}</Option>)}
            </Select></>} showTime />
    );
};



export default TimezoneComponent;
