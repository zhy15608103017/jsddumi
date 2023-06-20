---
title: jusda-pro-table 表格组件
nav: 组件
toc: content
group:
    title: 业务组件
    order: 3
---

# jusda-pro-table
## pro-table的columnsState的值将会存储在localstorage中proTableConfig中(key的命名规则是 clientId - cfgType - pathname - customizeKey（一定要区分环境）)

## API
| 名称 | 描述 | 类型 | 可选值 | 默认值 | 示例 |
| :-----------: |:--------:|:-----:|:--:|:-----:|:-----:|
| resizable | 表格表头宽度是否可以拖动（列的宽度必须是number类型） | boolean | true/false | false | - |
| customizeKey | 自定义key（当一个页面中有两个及以上proTable时，需要手动传入） | string | - | - | - |
| propColumnsStateValue | 自定义ColumnsStateValue | string | - | - |   {title : {order: 2, disable: true}} |

## Example
```jsx
import React, {useEffect, useLayoutEffect} from 'react';
import { ProTable } from '@jusda-tools/jusda-pro-table-umi4';
import {Form, Button, Input} from 'antd';
// import "@ant-design/pro-table/dist/table.css";


const columns = [
  // {
  //   dataIndex: 'index',
  //   valueType: 'indexBorder',
  //   width: 48,
  // },
  {
    title: '标题',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
      width: 30,
    tip: '标题过长会自动收缩',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
    {
        title: '状态11',
        width: 80,
        dataIndex: 'status',
        sorter: true,
    },
    {
        title: 'sortesortersortersortersortersortersorterr',
        ellipsis: true,
        key: 'deliveryDate',
        render: (value, record) => {
            return (
                <div>
                   ddd
                </div>
            );
        },
        defaultSortOrder: 'ascend',
        sorter: true,
    },
    {
        title: '创建者',
        width: 80,
        dataIndex: 'creator',
        valueEnum: {
            all: { text: '全部' },
            付小小: { text: '付小小' },
            曲丽丽: { text: '曲丽丽' },
            林东东: { text: '林东东' },
            陈帅帅: { text: '陈帅帅' },
            兼某某: { text: '兼某某' },
        },
    },
  // {
  //   disable: true,
  //   title: '状态',
  //   dataIndex: 'state',
  //   filters: true,
  //   onFilter: true,
  //   ellipsis: true,
  //   valueType: 'select',
  //   valueEnum: {
  //     all: { text: '超长'.repeat(50) },
  //     open: {
  //       text: '未解决',
  //       status: 'Error',
  //     },
  //     closed: {
  //       text: '已解决',
  //       status: 'Success',
  //       disabled: true,
  //     },
  //     processing: {
  //       text: '解决中',
  //       status: 'Processing',
  //     },
  //   },
  // }
];

function Test() {
    return (<div>
            <ProTable
                columns={columns}
                columnEmptyText={false}
                search={false}
                // bordered
                options={{
                    reload: false,
                    density: false,
                }}
                className="user-table"
                dataSource={[]}
                pagination={false}
                size="small"
                resizable={true}
            />
    </div>)
}
export default Test;
```

### 注意事项
1. dataIndex和key同时存在，需保持一致，否则保存列会失效

例：场景：dataIndex是render使用的值，key为排序参数传给后端的。
  
修改前
 ```
  {
      title: '时间',
      dataIndex: ['poCreateDate','utcDate'],
      key: 'poCreateDate.utcDate',
      width: 120,
      render: data => <Placeholder value={data} />,
  },
 ```
 修改后：
 ```
   {
      title: '时间',
      key: 'poCreateDate.utcDate',
      width: 120,
      render: (_, record) => <Placeholder value={record?.poCreateDate?.utcDate} />,
  },
 ```
2. 使用ellipsis属性，render的第一参数返回为node，第二参数为当前行的数据，使用render自定义渲染的需注意

  例：场景：数量需要千位符

  修改前
  ```
  {
      title: '数量',
      dataIndex: 'totalShipmentQty',
      render: num => (
            <Statistic value={num} precision={0} />
      ),
  },
  ```

  修改后
   ```
  {
      title: '数量',
      dataIndex: 'totalShipmentQty',
      ellipsis: true,
      render: (__,record) => (
            <Statistic value={record?.totalShipmentQty} precision={0} />
      ),
  },
  ```

3. 使用sortOrder管控table的排序，如果没有用useState管控column，会造成点击排序后排序了但是排序按钮无变化
 
 例：场景：sorted为外部排序参数，sortOrder被管控
 ```
 const column = (sorted:any) => {
  return [
    {
      title: 'ASN号',
      dataIndex: 'asnNo',
      key: 'asnNo',
      sorter: true,
      sortOrder: sorted.columnKey === 'asnNo' && sorted.order,
    },
  ]
 }
 ```
 解决方案：
 1. 不写sortOrder。由table自行管控，则初进页面排序按钮不会点亮
 2. 使用useState管控column。setState后触发pro-table的重新渲染。

 注：以下代码只是demo
 ```
 const columnConfig = [
    {
      title: 'ASN号',
      dataIndex: 'asnNo',
      key: 'asnNo',
      sorter: true,
      sortOrder: sorted.columnKey === 'asnNo' && sorted.order,
    },
  ]
const [column, setColumn] = useState(columnConfig)
const tableChange = ()=>{
  setColumn(columnConfig)
}
    <ProTable
        columns={column}
        columnEmptyText={false}
        dataSource={[{ status: 'Default', title: '22'  }]}
        search={false}
        rowKey="userId"
        propColumnsStateValue={
            {title : {order: 2, disable: true}}
        }
        options={{
            reload: false,
            density: false,
        }}
        onChange={tableChange}
        size="small"
    />
 ```
## 更新日志
### V0.0.7 
新增size参数，行高默认为默认
## v0.0.9
proTableConfig的命名规则中，pathName的值从history获取变成了从useRouteMatch()上获取，兼容路由上存在动态参数的业务场景(/a/b/:id) 

## v0.0.10
打包排除umi依赖

## v0.0.11
打包排除umi依赖

## v0.0.13
处理国际化在项目中不执行的问题，(在dumi中是正常的)
