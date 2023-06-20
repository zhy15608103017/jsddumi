import * as React from 'react';
import { Switch,Button,ConfigProvider } from 'antd';
const Text =()=>{
    function onChange(checked:any) {
        console.log(`switch to ${checked}`);
      }
    return <div>
        <ConfigProvider prefixCls="jusda-feedback">
        <Switch defaultChecked onChange={onChange} />
  <Button>My Button</Button>
</ConfigProvider>
    
    </div>
}
export default Text;
