import React, { useContext,useRef } from 'react';
// MetadataFunctionContextProvider在v1.4.0版本及以后可以使用默认导入
// import MetadataFunctionContextProvider from '@jusda-tools/metadata-ui-render';
import {
  MetadataFunctionContextProvider,
  CustomAreaFormRender,
  MetadataFunctionContext,
} from '@jusda-tools/metadata-ui-render';
import { Button } from 'antd';

const Test = (props) => {
  const contextValue = useContext(MetadataFunctionContext);
  const { getListTypeFunctionQueryPropertyConfig, formatQueryValueAccordToFunctionConf } = contextValue;
  return <Button onClick={() => {
    const data = getListTypeFunctionQueryPropertyConfig();
    const formattedFormdata = formatQueryValueAccordToFunctionConf({ code: '4342', "birthday": '2017-3-1', transportModeCodeEq: 'rwrwerew' })
    console.log('data', data, formattedFormdata);
    //
  }}>Click Here</Button>

}

const App = () => {
  const formRef = useRef();

  return (
    <div>
      <MetadataFunctionContextProvider
        tenantCode="TEN_5004822448287686656"
        functionCode="test-form"
        value={{
          // ...业务自定义数据
          test: 'test1',
        }}
      >
        <Button
          onClick={() => {
            console.log('form', formRef.current);
            console.log('Save', formRef.current?.getValues());
            //
          }}
        >
          Save
        </Button>
        <CustomAreaFormRender areaCode="QUYU" ref={formRef} />
        <Test />
      </MetadataFunctionContextProvider>
    </div>
  );
};

export default App;