# freight-valuate-report-table 预估价格列表

## API

### freight-valuate-report-table

该组件为通过传入参数请求估价接口并返回。
该组件默认导出一个列表，用于展示估价接口返回数据。

| 参数   | 说明         | 类型   | 默认    | 备注 |
| ------ | ------------ | ------ | ------- | ---- | --- |
| locale | 国际化       | string | 'en-US' |      |     |
| localeKey | 国际化标识取值key     | string | 'umi_locale' |      |     |
| params | 接口请求参数 | any    | -       | -    |
| ref        | ref 可获取到更新列表数据的方法 updateValuation | -                           | -       | -    |

## Example

```jsx
import ValuateTable from '@jusda-tools/freight-valuate-report-table';

const App: React.FC = () => {
  return (
    <ValuateTable
      locale={'en-US'}
      params={{
        transportModeCode: 'TPM_SEA',
        deliveryModeCode: 'D2D',
        loadingModeCode: 'FCL',
        lspCode: 'DB00001',
        origin: {
          countryCode: 'CN',
          provinceCode: 'CN-51',
          cityCode: 'SCI105701',
          regionCode: '',
        },
        destination: {
          countryCode: 'CN',
          provinceCode: 'CN-41',
          cityCode: 'SCI105596',
          regionCode: '',
        },
        polCode: '',
        podCode: '',
        containers: [
          {
            containerSizeCode: 'CTT_42G1',
            containerQty: 10,
          },
        ],
      }}
    />
  );
};

export default App;
```
传入的params更新会出发估价列表发送估价请求，更新列表数据。
也在 ref 上提供了 updateValuation 方法用于手动刷新列表数据。

```jsx
import ValuateTable from '@jusda-tools/freight-valuate-report-table';
import {useRef} from 'react';

const App: React.FC = () => {
    const ref = useRef();

    const handleUpdate = ()=>{
        ref.current?.updateValuation();
    }
    
  return (
    <ValuateTable
        ref={ref}
      locale={'en-US'}
      params={{
        transportModeCode: 'TPM_SEA',
        deliveryModeCode: 'D2D',
        loadingModeCode: 'FCL',
        lspCode: 'DB00001',
        origin: {
          countryCode: 'CN',
          provinceCode: 'CN-51',
          cityCode: 'SCI105701',
          regionCode: '',
        },
        destination: {
          countryCode: 'CN',
          provinceCode: 'CN-41',
          cityCode: 'SCI105596',
          regionCode: '',
        },
        polCode: '',
        podCode: '',
        containers: [
          {
            containerSizeCode: 'CTT_42G1',
            containerQty: 10,
          },
        ],
      }}
    />
  );
};

```

### 其他组件

#### ValuateTableDrawer

    抽屉组件，内置了估价列表。

```jsx
import React, {useState} from 'react';
import {
  ValuateTableDrawer
} from '@jusda-tools/freight-valuate-report-table';

const App: React.FC = () => {
    const [visible, setVisible] = useState(false);
  
  return (
    <ValuateTableDrawer visible={visible} locale={'en-US'}
      params={{
        transportModeCode: 'TPM_SEA',
        deliveryModeCode: 'D2D',
        loadingModeCode: 'FCL',
        lspCode: 'DB00001',
        origin: {
          countryCode: 'CN',
          provinceCode: 'CN-51',
          cityCode: 'SCI105701',
          regionCode: '',
        },
        destination: {
          countryCode: 'CN',
          provinceCode: 'CN-41',
          cityCode: 'SCI105596',
          regionCode: '',
        },
        polCode: '',
        podCode: '',
        containers: [
          {
            containerSizeCode: 'CTT_42G1',
            containerQty: 10,
          },
        ],
      }} />
  );
};
```

| 参数       | 说明                                           | 类型                        | 默认    | 备注 |
| ---------- | ---------------------------------------------- | --------------------------- | ------- | ---- | --- |
| locale     | 国际化                                         | string                      | 
| localeKey | 国际化标识取值key     | string | 'umi_locale' |      |     |'en-US' |      |     |
| params | 接口请求参数 | any    | -       | -    |
| autoUpdateFollowVisible     |       Drawer每打开一次就会更新一次表格数据, 设置true,可开启此逻辑    | boolean     | undefined |      |     |
| valuateTableRef       | valuateTableRef 可获取到更新列表数据的方法 updateValuation | -                           | -       | -    |

支持其他Drawer参数
#### 更新记录

| 版本号 | 更新内容                                      |
| ------ | --------------------------------------------- |
| 0.0.1  | 组件初始化，提供列表和包含列表显示的抽屉组件 |
