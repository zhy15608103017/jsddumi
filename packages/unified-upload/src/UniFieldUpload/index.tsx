import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import type { UploadProps, FileProps } from './types';
import './index.less';
import { Modal, Button, Progress, ConfigProvider } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import DefaultState from './DefaultState';
import SuccessState from './SuccessState';
import ParsingFail from './ParsingFail';
import CustomError from './CustomError';
import getLocale from '../locale';

const FILE_ACCEPT =
  '.xlsx,.docx,.3gpp,.ac3,.asf,.au,.css,.csv,.doc,.dot,.dtd,.dwg,.dxf,.gif,.htm,.html,.jp2,.jpe,.jpeg,.jpg,.js,.json,.mp2,.mp3,.mp4,.mpeg,.mpg,.mpp,.ogg,.pdf,.png,.pot,.pps,.ppt,.rtf,.svf,.tif,.tiff,.txt,.wdb,.wps,.xhtml,.xlc,.xlm,.xls,.xlt,.xlw,.xml,';

const UploadComponent = (
  {
    visible,
    onChange = () => {},
    onCancel = () => {},
    onSubmit = () => {},
    rowKey = 'lineNo',
    tableColumns = [],
    tableProps = {},
    locale = 'zh-CN',
    ossParams = {
      systemName: '',
      bucketName: '',
    },
    progressProps = {},
    isShowProgress = false,
    modalProps = {},
    maxSize = 1024 * 1024 * 2,
    title = '',
    templateDescribe = '',
    templateButtonClick = () => {},
    templateButtonLoading = false,
    buttonDescribe = '',
    uploadDescribe = '',
    accept = FILE_ACCEPT,
    uploadCustomMethod = false,
    addRules = () => {
      return [{ rule: false, errorMessage: '' }];
    },
    stopUploadVerification = false,
    submitButtonLoading = false,
    successFooterButton = null,
    customErrorFailTitle = () => {},
    customerElement = <div></div>,
  }: UploadProps,
  ref: React.Ref<unknown>,
) => {
  const currentLocale: any = getLocale(locale);
  const [fileData, setFileData]: [FileProps, Function] = useState({
    state: 'default',
    file: undefined,
    url: '',
    name: '',
    errorMsgList: [],
    errorText: '',
  });

  // @ts-ignore
  const stateMuster: any = {
    default: {
      assembly: () => (
        <DefaultState
          uploadCustomMethod={uploadCustomMethod}
          ossParams={ossParams}
          locale={locale}
          setFileData={setFileData}
          uploadDescribe={uploadDescribe}
          maxSize={maxSize}
          accept={accept}
          addRules={addRules}
          stopUploadVerification={stopUploadVerification}
        />
      ),
    },
    success: {
      assembly: () => (
        <SuccessState fileData={fileData} setFileData={setFileData} />
      ),
    },
    parsingFail: {
      assembly: () => (
        <ParsingFail
          locale={locale}
          rowKey={rowKey}
          fileData={fileData}
          setFileData={setFileData}
          tableColumns={tableColumns}
          tableProps={tableProps}
          customErrorFailTitle={customErrorFailTitle}
        />
      ),
    },
    customError: {
      assembly: () => (
        <CustomError
          locale={locale}
          fileData={fileData}
          setFileData={setFileData}
        />
      ),
    },
  };

  useImperativeHandle(ref, () => {
    return { setFileData, fileData };
  });

  useEffect(() => {
    onChange(fileData);
  }, [fileData]);

  return (
    <ConfigProvider prefixCls="uni-filed">
      <div>
        <Modal
          centered={true}
          title={title || 'Upload'}
          footer={false}
          visible={visible}
          width={640}
          className={'uni-field-upload-container'}
          onCancel={onCancel}
          destroyOnClose
          maskClosable={false}
          {...modalProps}
        >
          {customerElement}
          <div className={'download-template'}>
            <div className={'leftContainer'}>
              {templateDescribe ||
                currentLocale[
                  'Download the template and fill in the information'
                ]}
            </div>
            <div className={'rightContainer'}>
              <Button
                onClick={(e) => {
                  templateButtonClick(e);
                }}
                loading={templateButtonLoading}
                className={'download-button'}
                icon={<DownloadOutlined />}
              >
                {buttonDescribe || currentLocale['Download']}
              </Button>
            </div>
          </div>
          <div className="contentContainer">
            <div className={'normal-container'}>
              {stateMuster[fileData.state]?.assembly()}
            </div>
          </div>
          <div
            style={{ height: '6px' }}
            className={'uni-field-progress-container'}
          >
            <div style={{ display: isShowProgress ? 'block' : 'none' }}>
              <Progress
                percent={100}
                size="small"
                showInfo={false}
                {...progressProps}
              />
            </div>
          </div>
          {['success'].includes(fileData.state) ? (
            <div className={'footer-container'}>
              {successFooterButton ? (
                successFooterButton
              ) : (
                <>
                  <Button onClick={onCancel} style={{ marginRight: '16px' }}>
                    {currentLocale['Cancel']}
                  </Button>
                  <Button
                    type="primary"
                    loading={submitButtonLoading}
                    disabled={submitButtonLoading}
                    onClick={onSubmit}
                  >
                    {currentLocale['Submit']}
                  </Button>
                </>
              )}
            </div>
          ) : (
            ''
          )}
        </Modal>
      </div>
    </ConfigProvider>
  );
};

export default forwardRef(UploadComponent);
