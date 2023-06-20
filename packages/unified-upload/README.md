# unified-upload 统一上传组件UI(单个).

## API
### unified-upload
| 参数                   | 说明                                | 类型                                                  | 默认            | 备注                                      |
| ---------------------- | ----------------------------------- | ----------------------------------------------------- | --------------- | ----------------------------------------- |
| visible                | 组件显示与隐藏                      | boolean                                               | false           |                                           |
| onChange               | 文件进行改变时执行                  | Function                                              | -               | -                                         |
| title                  | 是否展示导航菜单                    | string                                                | 'Upload'        | -                                         |
| templateDescribe       | 模板按钮文案                        | string                                                | 默认文案        | -                                         |
| templateButtonClick    | 模板按钮点击事件                    | Function                                              | -               |                                           |
| templateButtonLoading  | 模板按钮状态                        | boolean                                               | false           |                                           |
| uploadDescribe         | 上传位置文案                        | string                                                | 默认文案        |                                           |
| buttonDescribe         | 确认按钮文案                        | string                                                | 'sure'          |                                           |
| maxSize                | 限制上传文件大小                    | number                                                | 1024 * 1024 * 2 |                                           |
| onCancel               | 关闭时执行                          | Function                                              | -               |                                           |
| onSubmit               | 点击确认按钮执行                    | Function                                              | -               |                                           |
| rowKey                 | antd-Table参数rowKey                | string \|any[]                                        | -               |                                           |
| tableColumns           | antd-Table参数columns               |                                                       | 详见代码.       |                                           |
| tableProps             | antd-Table组件参数增量、全量覆盖    | TableProps<any>                                       | -               |                                           |
| modalProps             | antd-Modal组件参数增量、全量覆盖    | ModalProps                                            | -               |                                           |
| locale                 | 默认国际化                          | 'zh-CN' \|'en-US'                                     | 'zh-CN'         |                                           |
| ossParams              | OSS服务所需的桶名与系统名           | {  systemName?: string;  bucketName?: string;}        |                 |                                           |
| isShowProgress         | 是否展示进度条                      | boolean                                               | false           |                                           |
| progressProps          | antd-Progress组件参数增量、全量覆盖 | ProgressProps                                         |                 |                                           |
| accept                 | 允许上传的文件类型                  | string                                                | '.xlsx,.docx,'  | 若要修改,必须按照默认值格式进行全量修改.  |
| uploadCustomMethod     | 是否使用自定义上传事件              | boolean                                               | false           | 此参数为true时,将不进行组件封装的上传流程 |
| addRules               | 增量添加校验规则                    | (file: any) => { rule: true; errorMessage: string }[] | -               | rule                                      |
| stopUploadVerification | 是否停止组件后续校验                | boolean                                               | false           | 为true时,addRules添加的校验也不会生效     |
| submitButtonLoading    | 确认按钮的状态                      | boolean                                               | false           |                                           |
|                        |                                     |                                                       |                 |                                           |






## Example

```jsx
import React, { useRef, useState } from 'react';
import UniFileUpload from '@jusda-tools/uni-field-upload';
import type {
    UniFiledUploadRef,
} from '@jusda-tools/uni-field-upload';

const App: React.FC = () => {
    const uploadRef = useRef<UniFiledUploadRef>({
        fileData: {
            state: 'default',
            name: '',
        },
        setFileData: () => {},
    });
    
   const onSubmitUpload = () => {
        uploadParsingExcel({ id: uploadData.url }).then((res: any) => {
            const timer = setInterval(() => {
                getParsingExcelResult({ id: res.data })
                    .then((result) => {
                        let i = 0;
                        i++;
                        const { data = {} } = result;
                        const {
                            parsingResult,
                            inboundOrderLines,
                            errorMsgList,
                        } = data;
                     // 自定义错误
                        if (parsingResult === 'INVALID_TEMPLATE') {
                            clearTimerInterval(timer);
                            uploadRef.current.setFileData({
                                ...uploadRef.current.fileData,
                                state: 'customError',
                                errorText: formatMessage({
                                    id: 'The uploaded template is incorrect',
                                }),
                            });
                        }
                     // 组件默认错误(表格形式)
                        if (parsingResult === 'PARSING_FAIL') {
                            clearTimerInterval(timer);
                            uploadRef.current.setFileData({
                                ...uploadRef.current.fileData,
                                state: 'parsingFail',
                                errorMsgList,
                            });
                        }
                     // 成功关闭
                        if (parsingResult === 'PARSING_SUCCESS') {
                            clearTimerInterval(timer);
                            form.setFieldsValue({
                                inboundOrderLines,
                            });
                            onCancel();
                        }
                        if (i > 45) {
                            clearTimerInterval(timer);
                        }
                    })
                    .catch(() => {
                        uploadRef.current.setFileData({
                            ...uploadRef.current.fileData,
                            state: 'invalidTemplate',
                        });
                    });
            }, 1000);
        });
    };
 
  return (
            <UniFileUpload
                isShowProgress={upLoadShow} // 进度条
                locale={getLocale()} // 国际化
                ref={uploadRef} // 获取设置组件状态的方法.
                onChange={uploadChange}
                visible={true}
                onCancel={onCancel}
                onSubmit={onSubmitUpload}
                ossParams={{
                    systemName: 'juslink-sccp-ow',
                    bucketName: 'overseas_warehouse/excelParsing',
                }}
            />
  );
};

export default App;
```

#### 更新记录

| 版本号 | 更新内容                   |
| ------ | -------------------------- |
| 0.0.1  | 第一版发布.                |
| 0.0.2  | 调整了addRules传参形式.    |
| 0.0.16 | 添加了customErrorFailTitle |