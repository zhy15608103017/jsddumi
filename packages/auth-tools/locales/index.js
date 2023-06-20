const EN = {
    reload: 'Reload',
    userIdentityError: 'The current user information has changed, please refresh the page!',
};

const ZH = {
    reload: '重新加载',
    userIdentityError: '当前用户信息已发生变更，请刷新页面！',
};

const localesConfig = new Map()
    .set('en-US', EN)
    .set('zh-CN', ZH);


export default localesConfig
