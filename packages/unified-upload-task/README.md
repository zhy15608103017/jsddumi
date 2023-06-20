# unified-upload 统一上传组件带UI(带有任务中心).

## API
### UniFieldUploadTask
| 参数                | 说明              | 类型     | 默认                      | 备注                                                         |
| ------------------- | ----------------- | -------- | ------------------------- | ------------------------------------------------------------ |
| uploadVisible       | 组件显示与隐藏    | boolean  | false                     |                                                              |
| title               | 是否展示导航菜单  | string   | 'Upload'                  | -                                                            |
| taskTitle           | 任务标题          | string   | -                         | 对应任务中心任务标题筛选项                                   |
| onCancel            | 关闭时执行        | Function | -                         |                                                              |
| templateName        | 下载的模板名称    | string   | Bulk import info template |                                                              |
| downLoadTemplateApi | 下载模板的api接口 | Function | -                         | 传入一个函数，该函数返回后端api接口函数                      |
| uploadApi           | 上传文件api       | Function | -                         | 携带文件信息参数，传入一个函数，该函数返回后端api接口函数，  |
| taskCenter          | 是否接入任务中心  | boolean  | true                      |                                                              |
| autoSubmit          | 是否自动提交      | boolean  | true                      |                                                              |
| onCancel            | 关闭弹框          | Function | -                         |                                                              |
| ossParams           | oss配置           | Object   | -                         | {system:'4pl-spm',bucketName:'waybill_order/excelParsing/Domestic/CargoInfoList'} |






## Example

```jsx

const uploadTemplateApi = () => getDownloadUpdateTemplate()
const uploadApi = (fileInfo) => customApi(`/shipment-orders/import-lsp-trace?ossId=${fileInfo.fileId}`, 'POST', '/juslink-4pl-spm-app', {})
const closeUploadModal = () => setUploadVisible(false);
<div>
	 <UniFieldUploadTask
        title={formatMessage({ id: 'Batch Update' })}
        taskTitle="Shipment Update"//上传任务类型，对应任务中心的筛选条件
        templateName="自定义下载模板名称.xlsx"//模板名称
        downLoadTemplateApi={uploadTemplateApi}//下载模板api
        uploadApi={uploadApi}//上传文件api
        taskCenter={true}//是否接入任务中心
        uploadVisible={uploadVisible}//是否显示
        autoSubmit={true}//是否自动提交
        onCancel={closeUploadModal}
        ossParams={{
            systemName: '4pl-spm',
            bucketName:'waybill_order/excelParsing/Domestic/CargoInfoList',
        }}
     />
</div>
```

#### 更新记录

| 版本号 | 更新内容                   |
| ------ | -------------------------- |
| 0.0.1  | 第一版发布.                |
