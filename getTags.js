//@ts-nocheck
/* eslint-disable */
const { exec } = require('child_process');

// 配置时间范围
const startDate = '2024-07-01';
const endDate = '2024-07-31';
const mapData={
    '@jusda-tools/auth-switch':'功能开关组件',
    '@jusda-tools/buried-point':'新版埋点组件(中台)',
    '@jusda-tools/action-decorator':'老版埋点组件(大数据)',
    '@jusda-tools/foxconn-header':'foxconn网页头部',
    '@jusda-tools/im-component':'IM通信',
    '@jusda-tools/jusda-base-style':'基础样式',
    '@jusda-tools/jusda-basic-entry-template':'基础数据下拉框选择',
    '@jusda-tools/jusda-contact-us':' 联系我们',
    '@jusda-tools/jusda-footer':'网页底部展示',
    '@jusda-tools/jusda-header':'jusda网页头部',
    '@jusda-tools/jusda-pro-table-umi4':'pro-table umi4版本',
    '@jusda-tools/jusda-publicmethod':' 公共方法库',
    '@jusda-tools/juslink-bootstrap':'  项目初始化公共方法',
    '@jusda-tools/juslink-common-search-component':' Form表单筛选条件组件',
    '@jusda-tools/juslink-header':'juslink网页头部',
    '@jusda-tools/metadata-ui-render':'获取租户模型对应的UI元数据配置方法',
    '@jusda-tools/report-permission':' 报表权限组件',
    '@jusda-tools/unified-upload-task':'  上传带任务中心',
    '@jusda-tools/unified-upload':'统一上传组件UI(单个)',
    '@jusda-tools/user-control-panel':'个人中心面板',
    '@jusda-tools/auth-tools':'认证组件',
    '@jusda-tools/jusda-file-upload':'文件上传下载服务sdk',
    '@jusda-tools/onlyContent':'根据URL参数隐藏dome内容',
    '@jusda-tools/pre-commit-hook':'包检查',
    '@jusda-tools/fore-end-export':'前端导出',
    '@jusda-tools/caa-user-control-panel':'caa版本个人中心',
    '@jusda-tools/jusda-feedback':'意见反馈',
    '@jusda-tools/jusda-compiler':'公共插件库',
};

// 执行 Git 命令获取所有标签及其创建日期
exec('git for-each-ref --sort=creatordate --format "%(refname:short) %(creatordate:iso8601)" refs/tags/', (err, stdout, stderr) => {
  if (err) {
    console.error(`执行出错: ${err}`);
    return;
  }

  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }

  // 解析输出并过滤日期范围内的标签
  const lines = stdout.trim().split('\n');
  const tagsInRange = [];
  lines.map(line => {
      const [tag, date] = line.split(' ');
      return { tag, date: new Date(date) };
    })
    .filter(({ date }) => date >= new Date(startDate) && date <= new Date(endDate))
    .map(({ tag }) => {
		const name = `@${tag.split('@')[1]}`;
		if(!tagsInRange.includes(name)){
			tagsInRange.push(name);
		}
	});
	tagsInRange.map((item)=>{
		const desc = mapData[item] || '';
		console.log(`${item}: ${desc}`);
	})
});