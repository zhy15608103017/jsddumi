import { defineConfig } from 'dumi';

export default defineConfig({
  // title: 'Juslink',
  // mode: 'site',
  mfsu: false,
  themeConfig: { 
    // name: 'Juslink',
    footer: '准时达国际供应链管理有限公司版权所有 粤ICP备 19018545号',
    logo: `/logo.png`,
  },
  hash: true,
  favicons: [`/favicon.ico`],
  base: '/',
  outputPath: 'build',
  publicPath: '/',
  resolve: {
    atomDirs:[
      // { type: 'component', dir: 'doc' },
    ]
  },
  plugins: ['./plugin/symlink'],
  // 覆盖dumi默认样式
  styles: [
    `.__dumi-default-navbar-logo:not([data-plaintext]) {padding-left: 114px !important; font-size: 0 !important;}`,
    `.__dumi-default-layout-hero {background-color:#fff !important; background: url('/work.gif') no-repeat center;}`,
    '*::-webkit-scrollbar { width: 10px; height: 10px }',
    '*::-webkit-scrollbar-track { box-shadow: inset 0 0 6px #fff; background-color: #fff; -webkit-border-radius: 6px;}',
    '*::-webkit-scrollbar-thumb { -webkit-border-radius: 6px; background: #d6d6d6;}',
    `.dumi-default-sidebar { width: 270px !important}`,
    `.dumi-default-doc-layout > main { max-width: 100% !important; padding: 0 124px !important}`,
  ],
  // 挂在口上window全局变量
  headScripts: [
    { content: `window.jusdaBaseConfig = {
      clientId: "CP_PLATFORM",
      apiUrl: "https://mpdev.jus-link.com/api",
      cfgType: "dev"
    },window.jusdaUserInfo = {"data":{"proxyUser":null,"user":{"userId":"4475653744058351616","username":"IMKF001","nickName":"客服一","realName":"客服一","email":"IMKF001@qq.com","phone":"+86-19115921649","company":{"companyId":"ORG_10528","companyCode":"szskgkjgfyxgs80332162","crmCode":"KGKCNJSZ","srmCode":null,"companyName":"深圳市康冠科技股份有限公司"},"token":"eyJraWQiOiJqd3QiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJBdXRoZW50aWNhdGlvbiIsInVzZXJfbmFtZSI6IklNS0YwMDEiLCJleHAiOjE2MzUyNDUzMjMsInVzZXJhY2NvdW50X2lkIjoiNDQ3NTY1Mzc0NDA1ODM1MTYxNiIsImlhdCI6MTYzNTIwOTMyMywiY2xpZW50X2lkIjoiQ1BfUExBVEZPUk0iLCJqdGkiOiJkMGFmMGI4MzM2Y2M0MGVhYThiZTEyNjI0NGE1Mjc0MCJ9.czwoTsaDLiXsNsYIX_lwVAI6-FgGPsdbMGwhaX1krPTZ1GYk9J46f7ZM8bRCZGgXfu5Pj2gtyvK4Y2yfeWcnXEihJVTuRzlWqvDiZQc_64SkDEr30tQM9t07JX-QZ9rqW1xS5TsVxw-8bqOgy8btgvEMBnOBH0U1xA9lfcNEemr_lKkGhVt_Nl5idOtMCscR1lrtx-UOMzZ-EOT3A7y7x1QTxSF_QdtBsnf-hN8GYQED006Vt31RldDeHJv9bDR-0t2i0ThT1661vyuzV4v0ReC0_NnzB2g-3mYQGpRoMIAnsUat1XEheSQLXO18SoXnQsW4kAXIeRo-F8bo8D0Nqw","isBusinessOperations":true,"language":"zh_CN"},"userIdentity":{"crmCode":"KGKCNJSZ","srmCode":null,"companyCode":"szskgkjgfyxgs80332162","companyId":"ORG_10528","dacCode":null,"userIdentityId":"4475654680361545728","user":{"userId":"4475653744058351616","username":"IMKF001","nickName":"客服一","realName":"客服一","email":"IMKF001@qq.com","phone":"+86-19115921649","company":{"companyId":"ORG_10528","companyCode":"szskgkjgfyxgs80332162","crmCode":"KGKCNJSZ","srmCode":null,"companyName":"深圳市康冠科技股份有限公司"},"token":null,"isBusinessOperations":true,"language":"zh_CN"},"organization":{"organizationId":"4475645660930224128","organizationName":"IM","orgType":"CHILD_COMPANY","company":{"companyId":"ORG_10528","companyCode":"szskgkjgfyxgs80332162","crmCode":"KGKCNJSZ","srmCode":null,"companyName":"深圳市康冠科技股份有限公司"}},"roles":[],"manageTenants":[{"tenantId":"4600585873029763073","tenantCode":null,"tenantName":null,"tenantEnName":null,"tenantType":null},{"tenantId":"TEN_10038","tenantCode":null,"tenantName":null,"tenantEnName":null,"tenantType":null},{"tenantId":"4412604972769386497","tenantCode":null,"tenantName":null,"tenantEnName":null,"tenantType":null},{"tenantId":"4687223068567379969","tenantCode":null,"tenantName":null,"tenantEnName":null,"tenantType":null},{"tenantId":"4687386861440237569","tenantCode":null,"tenantName":null,"tenantEnName":null,"tenantType":null},{"tenantId":"TEN_10041","tenantCode":null,"tenantName":null,"tenantEnName":null,"tenantType":null}],"tenant":{"tenantId":"CP_MANAGER","tenantCode":"CP_MANAGER","tenantName":"平台虚拟租户","tenantEnName":"平台虚拟租户","tenantType":"platformTenant"}},"terminalInfo":{"clientIp":"172.18.68.0","referer":"https://mpdev.jus-link.com/login-entrance/pc/login?clientId=CP_PLATFORM&redirectUrl=http%3A%2F%2F127.0.0.1%3A8000%2F&state=placeholder&responseType=code&scopeCodes=&t=1635209315400","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36","acceptLanguage":"zh-CN,zh;q=0.9"}},"success":true,"errorCode":null,"errorData":null,"message":null}`, charset: 'utf-8' },
  ],
  theme: {
    'primary-color': '#ffc500',
    'primary-color-hover': '#ffc500',
    'font-size-base': '14px',
    'ant-prefix': 'juslink',
  }
});
