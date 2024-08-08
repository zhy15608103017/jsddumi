/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useRef, useState } from 'react';
import UniFieldUpload, { UniFiledUploadRef } from '@jusda-tools/unified-upload';

const App = () => {
    const uploadRef = useRef<UniFiledUploadRef>({
        fileData: {
            state: 'default',
            name: '',
        },
        setFileData: () => { },
    });

    const onSubmitUpload = () => {
        uploadParsingExcel({ id: uploadData.url }).then((res: any) => {
            const timer = setInterval(() => {
                getParsingExcelResult({ id: res.data })
                    .then((result) => {
                        let i = 0;
                        i++;
                        const { data = {} } = result;
                        const { parsingResult, inboundOrderLines, errorMsgList } = data;
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
        <UniFieldUpload
            //   isShowProgress={upLoadShow} // 进度条
            //   locale={getLocale()} // 国际化
            ref={uploadRef} // 获取设置组件状态的方法.

            //   onChange={uploadChange}
            visible={true}
            // templateButtonLoading={true}
            buttonHoverProperties={{
                items: [{ label: '123', key: '123' }],
            }}
            //   onCancel={onCancel}
            onSubmit={onSubmitUpload}
            ossParams={{
                systemName: 'juslink-sccp-ow',
                bucketName: 'overseas_warehouse/excelParsing',
            }}
            customerTipBottom={<div>注意事项看看呢</div>}
        />
    );
};

export default App;
