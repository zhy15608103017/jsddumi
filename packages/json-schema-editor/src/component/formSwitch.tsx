import * as React from 'react'
import { Switch } from "antd";
import type { SwitchProps } from 'antd/es/switch'

interface FormSwitchType extends SwitchProps {
    value?: boolean,
    onChange?: (data:boolean)=>void;
}
export default function FormSwitch(props:FormSwitchType){
    const {value, onChange, ...rest} = props;
    return <Switch 
            {...rest}
            checked={value}
            onChange={(checked:boolean)=>{
                onChange && onChange(checked);
            }}
        />
}