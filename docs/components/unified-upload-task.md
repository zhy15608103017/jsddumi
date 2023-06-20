---
title: unified-upload-task 文件上传
nav: 组件
toc: content
group: 
  title: 业务组件
  order: 4
---
# unified-upload-task 统一上传组件UI(接入任务中心).

## API
### unified-upload-task
| 参数                   | 说明                             | 类型                                                  | 默认                | 备注                                                      |
| ---------------------- | -------------------------------- | ----------------------------------------------------- | ------------------- | --------------------------------------------------------- |
| visible                | 组件显示与隐藏                   | boolean                                               | false               |                                                           |
| onChange               | 文件进行改变时执行               | Function                                              | 执行内部逻辑        | -                                                         |
| title                  | 是否展示导航菜单                 | string                                                | 'Upload'            | -                                                         |
| templateDescribe       | 模板提示文案                     | string                                                | 下载模板并填写信息  | -                                                         |
| templateButtonClick    | 模板按钮点击事件                 | Function                                              | 执行内部逻辑        | 需要传入下载模板的参数downLoadTemplateApi                 |
| templateButtonLoading  | 模板按钮状态                     | boolean                                               | false               |                                                           |
| templateName           | 下载的模板名称                   | string                                                | Bulk import info    |                                                           |
| uploadDescribe         | 上传位置文案                     | string                                                | 默认文案            |                                                           |
| buttonDescribe         | 下载按钮文案                     | string                                                | 下载模板            |                                                           |
| maxSize                | 限制上传文件大小                 | number                                                | 1024 * 1024 * 2     |                                                           |
| onCancel               | 关闭时执行                       | Function                                              | -                   |                                                           |
| onSubmit               | 点击确认按钮执行                 | Function                                              | 执行内部逻辑        | 需要传入参数uploadApi                                     |
| rowKey                 | antd-Table参数rowKey             | string \|any[]                                        | -                   |                                                           |
| tableColumns           | antd-Table参数columns            |                                                       | 详见代码.           |                                                           |
| tableProps             | antd-Table组件参数增量、全量覆盖 | TableProps<any>                                       | -                   |                                                           |
| modalProps             | antd-Modal组件参数增量、全量覆盖 | ModalProps                                            | -                   |                                                           |
| locale                 | 默认国际化                       | 'zh-CN' \|'en-US'                                     | 'zh-CN'             |                                                           |
| ossParams              | OSS服务所需的桶名与系统名        | {  systemName?: string;  bucketName?: string;}        |                     |                                                           |
| isShowProgress         | 是否展示进度条                   | boolean                                               | false               |                                                           |
| progressProps          | antd-Progress组件参数增量        | ProgressProps                                         |                     |                                                           |
| accept                 | 允许上传的文件类型               | string                                                | '.xlsx,.docx,'      | 若要修改,必须按照默认值格式进行全量修改.                  |
| uploadCustomMethod     | 是否使用自定义上传事件           | boolean                                               | false               | 此参数为true时,将不进行组件封装的上传流程                 |
| addRules               | 增量添加校验规则                 | (file: any) => { rule: true; errorMessage: string }[] | -                   | rule                                                      |
| stopUploadVerification | 是否停止组件后续校验             | boolean                                               | false               | 为true时,addRules添加的校验也不会生效                     |
| submitButtonLoading    | 确认按钮的状态                   | boolean                                               | false               |                                                           |
| successFooterButton    | 自定义success状态footer显示      | reactNode                                             | 返回，提交          |                                                           |
| customErrorFailTitle   | 自定义错误标题参数               | (number)=>reactNode                                   |                     |                                                           |
| customerElement        | 自定义元素(在title下方)          | =>reactNode                                           |                     |                                                           |
| taskTitle              | 任务标题                         | string                                                | -                   | 对应任务中心任务标题筛选                                  |
| downLoadTemplateApi    | 下载模板的api接口                | Function                                              | -                   | 传入一个函数，该函数返回后端api接口函                     |
| uploadApi              | 上传文件api                      | Function                                              | -                   | 携带文件信息参数，传入一个函数，该函数返回后端api接口函数 |
| taskCenter             | 是否接入任务中心                 | boolean                                               | false               |                                                           |
| autoSubmit             | 是否自动提交                     | boolean                                               | false               |                                                           |
| downloadTip            | 开始下载的提示                   | string                                                | 正在下载，请稍后... |                                                           |






## 代码示例

```jsx | pure
const uploadTemplateApi = () => getDownloadUpdateTemplate()
const uploadApi = (fileInfo) => customApi(`/shipment-orders/import-lsp-trace?ossId=${fileInfo.fileId}`, 'POST', '/juslink-4pl-spm-app', {})
const closeUploadModal = () => setUploadVisible(false);
<div>
	 <UniFieldUploadTask
        title={formatMessage({ id: 'Batch Update' })}
                    templateDescribe={formatMessage({id:'Please fill in waybill information according to template'})}
                    uploadDescribe={`${formatMessage({id:'uploadDescribe'})}`}
                    buttonDescribe={formatMessage({id:'dowload'})}
                    isShowProgress={true}
                    taskTitle="Shipment Update"
                    templateName=""//模板名称
                    downloadTip=""//开始下载提示
                    accept='.xlsx,.xls'
                    ref={uploadRef}
                    downLoadTemplateApi={uploadTemplateApi}//下载模板api
                    uploadApi={uploadApi}//上传文件api
                    taskCenter={true}//是否接入任务中心
                    visible={uploadVisible}
                    onCancel={closeUploadModal}
                    autoSubmit={true}//是否自动提交
                    ossParams={{//oss
                        systemName: '4pl-spm',
                        bucketName:'waybill_order/excelParsing/Domestic/CargoInfoList',
                    }}
     />
</div>
```

## Example



#### 更新记录

| 版本号 | 更新内容    |
| ------ | ----------- |
| 0.0.1  | 第一版发布. |

