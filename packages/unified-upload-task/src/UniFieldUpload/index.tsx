import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import type { UploadProps, FileProps } from './types';
import './index.less';
import { Modal, Button, Progress, Divider, Drawer } from 'antd';
import Tabs from './Tabs';
import { DownloadOutlined } from '@ant-design/icons';
import DefaultState from './DefaultState';
import SuccessState from './SuccessState';
import ParsingFail from './ParsingFail';
import CustomError from './CustomError';
import getLocale from '../locale';
import { colums, tableSearchcfg } from "./colums"
import TableSearch from './TableSearch';
import { Trim } from '../utils';
import moment from 'moment';
import { CloseOutlined } from '@ant-design/icons';
import { getTask, getTaskHistoriesPage } from '../service/task';
import ProTable from './Table';
import TaskDetails from './TaskDetails';
import { currentLanguage } from '@jusda-tools/language-control-panel';

const FILE_ACCEPT =
  '.xlsx,.docx,.3gpp,.ac3,.asf,.au,.css,.csv,.doc,.dot,.dtd,.dwg,.dxf,.gif,.htm,.html,.jp2,.jpe,.jpeg,.jpg,.js,.json,.mp2,.mp3,.mp4,.mpeg,.mpg,.mpp,.ogg,.pdf,.png,.pot,.pps,.ppt,.rtf,.svf,.tif,.tiff,.txt,.wdb,.wps,.xhtml,.xlc,.xlm,.xls,.xlt,.xlw,.xml,';

const UploadComponent = (
  {
    visible,
    autoSubmit,
    onChange = () => { },
    onCancel = () => { },
    onSubmit = () => { },
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
    templateButtonClick = () => { },
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
    customErrorFailTitle = () => { },
    customerElement = <div></div>,
    taskTitle = '',
    taskStatus = '',
    taskCenter = true,
  }: UploadProps,
  ref: React.Ref<unknown>,
) => {
  const currentLocale: any = getLocale(currentLanguage());
  const [fileData, setFileData]: [FileProps, Function] = useState({
    state: 'default',
    file: undefined,
    url: '',
    name: '',
    errorMsgList: [],
    errorText: '',
  });
  const TableSelectRef = React.useRef(null);
  const [params, setParams] = React.useReducer((params: any, action: any) => {
    return { ...params, ...action };
  }, {});
  const [taskId, setTaskId] = React.useReducer((_: any, action: any) => {
    return action;
  }, '');
  const [tabStatus, setTabStatus] = useState('Upload Management')
  const [visibleDrawer, setVisible] = React.useState(false);
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
        <SuccessState fileData={fileData} setFileData={setFileData} taskStatus={taskStatus} autoSubmit={autoSubmit}/>
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
  const onSearch = (value: any) => {
    const { time, taskNameContains } = value;
    const searchParams = {
      taskNameContains: Trim(taskTitle),
      taskStatusEq: value?.taskStatus?.value,
      ...initTime(time),
    };
    setParams(searchParams);
  };
  const getTaskDetails = async (value: React.Key) => {
    return await getTask(value);
  };
  const initTime = (time: any) => {
    return {
      startTimeGte: time ? Date.parse(moment(time[0]).format()) : null,
      startTimeLte: time
        ? // 后端数据要求结束时间必须为毫秒的最大值
        Date.parse(moment(time[1]).format()) + 999
        : null,
    };
  };
  const view = (value: React.Key) => {
    setVisible(true);
    setTaskId(value);
  };
  const Close = () => {
    return (
      <span
        onClick={() => setVisible(false)}
        style={{
          cursor: 'pointer',
        }}
      >
        <CloseOutlined />
      </span>
    );
  };
  useImperativeHandle(ref, () => {
    return { setFileData, fileData };
  });
  useEffect(() => {
    onChange(fileData);
    if (['success'].includes(fileData.state) && autoSubmit) {
      onSubmit(fileData as any)
    }
  }, [fileData]);
  useEffect(() => {
    visible ? setTabStatus('Upload Management'):''
  }, [visible])
  const menu = [
    {
      key: 'Upload Management',
      status: currentLocale['Upload Management'],
    },
    {
      key: 'Upload Record',
      status: currentLocale['Upload Record'],
    },
  ]
  const menuChange = (e: any) => {
    setVisible(false);
    setTabStatus(e?.key)
  }
  const getTaskHistories = async (value: any) => {
    const {
      params: { current, pageSize },
      sorts,
    } = value;
    const data = { ...params, taskNameContains: taskTitle ? Trim(taskTitle || params.taskNameContains) : undefined, page: current - 1, size: pageSize, sorts };
    return await getTaskHistoriesPage(data);
  };
  return (
    <div>
      <Modal
        centered={true}
        title={title || 'Upload'}
        footer={false}
        visible={visible}
        width={740}
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
        <Divider dashed />

        {taskCenter && <div className='tabs-container'>
          <Tabs
            list={menu}
            defaultTab={tabStatus}
            handleClick={menuChange}
          />

        </div>}
        {tabStatus == 'Upload Management' &&
          <>
            <div className="contentContainer">
              <div className={'normal-container'}>
                {stateMuster[fileData.state]?.assembly()}
              </div>
            </div>
            <div
              style={{ height: '30px',display: isShowProgress ? 'block' : 'none' }}
              className={'uni-field-progress-container'}
            >
              <div >
                <Progress
                  percent={100}
                  size="small"

                  {...progressProps}

                />
                {taskStatus != 'SUCCESS' && taskStatus != 'CREATED' && <div style={{ color: '#E0311B' }}>{currentLocale['Exception in importing information. To view details, click Upload Record']}</div>}
                {taskStatus == 'SUCCESS' && <div >{currentLocale['Upload completed. For more information, please click Upload Record']}</div>}
                {taskStatus == 'CREATED' && <div >{currentLocale['Uploading']}</div>}
              </div>
            </div>
            {(['success'].includes(fileData.state) && !autoSubmit) ? (
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
          </>}
        {
          tabStatus == 'Upload Record' &&
          <>
            <TableSearch
              key={'name'}
              ref={TableSelectRef}
              config={tableSearchcfg(currentLocale)}
              handleOk={onSearch}
              // layout="vertical"
              onReset={() => {
                onSearch({});
              }}
            />

            <ProTable
              rowKey="taskId"
              resizable
              request={getTaskHistories}
              params={params}
              columns={colums(view, currentLocale)}
              customizeKey='taskCenter'
              options={{
                reload: false,
                density: false,
                setting: false
              }}
            />
            <Drawer
              placement="right"
              // @ts-ignore
              extra={<Close />}
              title={currentLocale['TaskDetails']}
              visible={visibleDrawer}
              closable={false}
              onClose={() => setVisible(false)}
              destroyOnClose={true}
              width={600}
            >
              <TaskDetails
                getTaskDetails={getTaskDetails}
                taskId={taskId}
                visible={visible}
              />
            </Drawer>
          </>
        }
      </Modal>
    </div>

  );
};

export default forwardRef(UploadComponent);
