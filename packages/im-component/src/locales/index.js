const EN = {
    dragTooltip: 'Click me to drag!',
    header: 'Welcome to JusLink',
    user: 'Jusda Customer',
    content: 'Hello~ Welcome to JusLink, Zhun Xiaoda is happy to serve you! Please select the business you need to consult.',
    sessionError: 'Description Failed to create the current session!',
    NoUserError: 'Unable to start, please contact the administrator to improve the function configuration！',
    configError: 'The initialization user information is abnormal, please contact the administrator to deal with it!'
};

const ZH = {
    dragTooltip: '点击可拖动！',
    header: '欢迎使用JusLink',
    user: 'Jusda 客服',
    content: '您好，欢迎使用JusLink，准小达很高兴为您服务！请选择您需要咨询的业务Site。',
    sessionError: '当前会话创建失败!',
    NoUserError: '无法启动，请联系管理员完善功能配置！',
    configError: '初始化用户信息异常，请联系管理员处理！'
};

const config = new Map()
    .set('en-US', EN)
    .set('zh-CN', ZH);


export default config;