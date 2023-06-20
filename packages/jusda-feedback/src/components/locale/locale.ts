const style: any = {
  'zh-CN': {
    ClickBtn: {
      headText: '反馈信息',
      myFeedback: '历史反馈',
      des: '准时达客户助手',
    },
    NewModal: {
      headText: '反馈信息',
      question: '在服务过程中您遇到了什么问题?',
      requireText: '当前内容必填',
      uploadText: '上传附件',
      cancenText: '取消',
      submitText: '提交',
      prompt: '支持附件：单个文件不大于8MB，总文件大小不大于25MB',
      placeholder: '请您留下对问题的描述，可包括(IT服务，供应链服务)(必填)',
      typeRadio: {
        system: 'IT系统反馈',
        business: '客诉与建议',
        other: '其他',
      },
    },
    notice: {
      fileError: '文件类型错误，请重新上传',
      fileNumberError:'文件数量不能大于4个',
      imgTitle: '意见反馈',
      fileLimit: '文件大小超出限制，请重新上传',
      fileLeast: '请至少输入10个字哦',
      success: '提交成功',
      fail: '提交失败',
    },
    InfosBtn: {
      text: '意见反馈',
    },
  },
  'en-US': {
    ClickBtn: {
      headText: 'Complaint Feedback',
      myFeedback: 'Historical Feedback',
      des: 'jusLink customer assistant',
    },
    NewModal: {
      headText: 'Feedback',
      question: 'What problems did you encounter during the service?',
      requireText: 'Current content is required',
      uploadText: 'upload attachments',
      cancenText: 'cancel',
      submitText: 'submit',
      prompt:
        'Support file: file not larger than 8M，and the total file size is no more than 25MB',
      placeholder:
        'Please leave a description of the problem, which can include (IT service, supply chain service) (required)',
      typeRadio: {
        system: 'IT system',
        business: 'Business Issues',
        other: 'other',
      },
    },
    notice: {
      fileError: 'The file type is wrong, please upload again',
      imgTitle: 'Feedback',
      fileNumberError:'The number of files cannot be greater than 3',
      fileLimit: 'The file size exceeds the limit, please upload again',
      fileLeast: 'Please enter at least 10 characters',
      success: 'Submitted successfully',
      fail: 'Submission Failed',
    },
    InfosBtn: {
      text: 'Feedback',
    },
  },
};

export default style;
