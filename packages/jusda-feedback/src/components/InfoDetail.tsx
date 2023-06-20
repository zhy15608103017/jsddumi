// @ts-nocheck
import React, { ReactNode, useState, useEffect, Fragment } from 'react';
import { Form, Input, Button, Upload, message, Radio } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { request } from './request';
import moment from 'moment';
import {
  prefix,
  UrlModal,
  Allbtnstyle,
  WarmInfo,
  Title,
  TitleUpload,
  Span,
  NewModal,
} from './detailStyle';
import authTools from '@jusda-tools/auth-tools';
import { InitUpload } from '@jusda-tools/jusda-file-upload';
import {fileNameType } from './fileType';
const { JusdaUserInfo } = authTools;

interface controlShowProps {
  onCancel: () => void;
  visible: boolean;
  children?: ReactNode;
  currenTheme?: any;
  currentLocale?: any;
  defaultLocale?: any;
}

export const InfoDetail: React.SFC<controlShowProps> = (
  props: controlShowProps,
) => {
  const [form] = Form.useForm();
  const [previewImage, setpreviewImage] = useState('');
  const [previewVisible, setpreviewVisible] = useState(false);
  const [previewTitle, setpreviewTitle] = useState('');
  const [list, setList] = useState([]);
  const [recordCount, setRecordCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [disState, setDisstate] = useState('done');
  const { visible, onCancel } = props;

  const { currentLocale, defaultLocale, submit } = props;

  const ByPathGetTemplate: any = () => {
    const templateData = window.Sdp?.templateData || [];
    return templateData.find((item: { path?: string | RegExp }) => {
      const { path = '' } = item;
      const reg = new RegExp(path);
      return reg.test(location.href);
    });
  };

  const setDefaultTemplate = () => {
    const template = ByPathGetTemplate()?.defaultTemplate
      ? ByPathGetTemplate()?.defaultTemplate[defaultLocale]()
      : '';
    if (!form.getFieldsValue().content) {
      if (visible) {
        form.setFieldsValue({
          content: template,
        });
        setRecordCount(template.length);
      }
    }
  };
  useEffect(() => {
    setDefaultTemplate();
  }, [visible]);

  // 覆盖上传
  const customRequest = async (option: any) => {
    const Init = new InitUpload();
    const file = option.file as File;
    try {
      const result = await Init.initFileUploadFn(
        file,
        'feedback',
        `feedbackUpload/${file?.name}`,
      );
      option.onSuccess(result);
    } catch (error) {    
      option.onError(error);
    }
  };

  // 控制上传组件超出4个时候的显示和影藏
  const controlUpload = (val: string) => {
    document.getElementsByClassName(
      `${prefix}-upload-select-picture-card`,
    )[0].style.display = val;
  };

  const submitAxios = async (val: any) => {
    const AllUserInfo = new JusdaUserInfo().getFullInfo();
    const { user, userIdentity } = AllUserInfo.data;
    const userCompany = user?.company?.companyName;
    const userName = userIdentity?.user?.realName;
    const CurrentTime = moment().format('YYYY-MM-DD HH:mm');
    const filterUploadList = val?.update
      ? val.update.map((each: any) => {
          const date = each?.response?.data;
          return {
            name: each?.name,
            fileId: date?.fileId,
          };
        })
      : [];
    const params = {
      businessNo: window?.Sdp?.params?.businessNo,
      carrier: window?.Sdp?.params?.carrier,
      oaNo: window?.Sdp?.params?.oaNo,
      pn: window?.Sdp?.params?.pn,
      supplier: window?.Sdp?.params?.supplier,
      attachments: filterUploadList,
      content: val.content,
      type: val?.type,
      sourceSystem: window.jusdaBaseConfig.clientId,
      sourceWebsite: window.location.href,
      title: `${currentLocale?.notice.imgTitle}_${userCompany}_${userName}_${CurrentTime}`,
    };
    setLoading(true);

    const res = await request().post(`/juslink-common-feedback/feedbacks`, {
      data: params,
    });
    if (res.success) {
      message.success(currentLocale?.notice?.success);
      submit(res);
      onCancel();
      form.resetFields();
      setList([]);
    } else {
      message.error(currentLocale?.notice?.fail);
    }
    setLoading(false);
  };

  const submitInfo = () => {
    // 总文件大小不能超过25MB
    if (!checkSizeAll(25)) {
      return;
    }
    form
      .validateFields()
      .then((val: any) => {
        const textValue = val.content.split('');
        const textValueCode = textValue
          .map((each: any) => each.charCodeAt())
          .filter((item: any) => ![10, 32].includes(item));
        if (textValueCode.length >= 10) {
          submitAxios(val);
        } else {
          message.warn(currentLocale?.notice?.fileLeast);
        }
      })
      .catch((err: any) => {
        console.log(err, 'err');
      });
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    setList(e.fileList);
    return e && e.fileList;
  };

  const lastStr = (str) => {
    let index = str.lastIndexOf('.');
    str = str.substring(index + 1, str.length);
    return str;
  };

  // 检测文件类型
  const checkFileType = (file: any) => {
    if (!fileNameType.includes(lastStr(file.name))) {
      message.error(currentLocale?.notice.fileError);
      return false;
    }
    return true;
  };

  // 单个文件大小限制
  const checkSize = (file?: any, size: any) => {
    if (file.size / 1024 / 1024 > size) {
      message.error(currentLocale?.notice.fileLimit);
      return false;
    }
    return true;
  };

  // 总文件大小限制
  const checkSizeAll = (size: number) => {
    let allSize = 0;
    list.forEach((i) => {
      allSize += i.size;
    });
    if (allSize / 1024 / 1024 > size) {
      message.error(currentLocale?.notice.fileLimit);
      return false;
    }
    return true;
  };

  // 上传之前检测文件类型和数量
  const beforeUpload = (file: any): PromiseLike<any> => {
    const currentTime = moment().format('x');
    let currentFile: any = new File([file], currentTime + `-${file.name}`, {
      type: file.type,
    });
    currentFile['uid'] = file.uid;
    return new Promise((resolve, reject) => {
      if (checkFileType(currentFile) && checkSize(currentFile, 8)) {
        if (list.length >= 4) {
          message.error(currentLocale?.notice.fileNumberError);
          controlUpload('none');
        }
        resolve(currentFile);
      }
    });
  };

  const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setpreviewImage(file.url || file.preview);
    setpreviewVisible(true);
    setpreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    );
  };

  const handleOnRemove = (file: any) => {
    const deleteList = list.filter((each: any) => each.name !== file.name);
    setList(deleteList);
    const listLen = list.length;
    if (listLen > 4 && listLen <= 5) {
      controlUpload('table');
    }
  };

  return (
    <Fragment>
      <NewModal
        visible={visible}
        onCancel={onCancel}
        footer={null}
        title={currentLocale?.NewModal.headText}
        width="420px"
        themes={props?.currenTheme?.NewModal}
      >
        <Form form={form} hideRequiredMark colon={false}>
          <Title themes={props?.currenTheme?.Title}>
            {currentLocale?.NewModal.question}
          </Title>
          <Form.Item
            name="type"
            rules={[
              {
                required: true,
                message: currentLocale?.NewModal.requireText,
              },
            ]}
          >
            <Radio.Group>
              <Radio value="SYSTEM" style={{ fontSize: '12px' }}>
                {' '}
                {currentLocale?.NewModal?.typeRadio?.system}
              </Radio>
              <Radio value="BUSINESS" style={{ fontSize: '12px' }}>
                {' '}
                {currentLocale?.NewModal?.typeRadio?.business}
              </Radio>
              <Radio value="OTHER" style={{ fontSize: '12px' }}>
                {' '}
                {currentLocale?.NewModal?.typeRadio?.other}
              </Radio>
            </Radio.Group>
          </Form.Item>
          <div style={{ position: 'relative' }}>
            <Form.Item
              name="content"
              rules={[
                {
                  required: true,
                  message: currentLocale?.NewModal.requireText,
                },
              ]}
            >
              <Input.TextArea
                placeholder={currentLocale?.NewModal.placeholder}
                maxLength={250}
                style={{
                  minHeight: '110px',
                  resize: 'none',
                }}
                onBlur={(e) => {
                  const valueLimit = e?.currentTarget?.value?.slice(0, 250);
                  if (e.currentTarget.value.length > 250) {
                    form.setFieldsValue({
                      content: valueLimit,
                    });
                    setRecordCount(valueLimit.length);
                  }
                }}
                onChange={(e) => {
                  setRecordCount(e.target.value.length);
                }}
              />
            </Form.Item>
            <Span
              style={recordCount >= 250 ? { color: 'red' } : { color: '#ccc' }}
            >{`${recordCount}/250`}</Span>
          </div>
          <TitleUpload themes={props?.currenTheme?.TitleUpload}>
            {currentLocale?.NewModal.uploadText}
          </TitleUpload>
          <Form.Item
            name="update"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              listType="picture-card"
              customRequest={customRequest}
              beforeUpload={beforeUpload}
              onPreview={handlePreview}
              onRemove={handleOnRemove}
              onChange={(file: any) => setDisstate(file.file.status)}
            >
              {list.length >= 4 ? null : <PlusOutlined />}
              {/* <PlusOutlined /> */}
            </Upload>
          </Form.Item>
          <WarmInfo themes={props?.currenTheme?.WarmInfo}>
            {currentLocale?.NewModal.prompt}
          </WarmInfo>
        </Form>
        <Allbtnstyle themes={props?.currenTheme?.Allbtnstyle}>
          <Button className="cancel" onClick={onCancel}>
            {currentLocale?.NewModal.cancenText}
          </Button>
          <Button
            className="comfirm"
            type="primary"
            onClick={submitInfo}
            loading={loading}
            disabled={!['done', 'removed'].includes(disState)}
          >
            {currentLocale?.NewModal.submitText}
          </Button>
        </Allbtnstyle>
      </NewModal>

      <UrlModal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        width="1200px"
        onCancel={() => setpreviewVisible(false)}
        themes={props?.currenTheme?.NewModal}
      >
        <img style={{ width: '100%' }} alt="example" src={previewImage} />
      </UrlModal>
    </Fragment>
  );
};

export default InfoDetail;
