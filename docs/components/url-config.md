---
title: url-config 各种地址信息
nav: 组件
toc: content
group: 
  title: JS-SDK
  order: 1
---

# 这是一个地址管理的组件
 该文件使用window.jusdaBaseConfig中的配置统一了各环境下各项目访问地址、统一登陆访问地址及原baseUrl访问地址，处理逻辑。

```jsx | pure
// 内网环境编排文件修改示例
window.jusdaBaseConfig = {
    cfgType: '...',
    // ...otherParams,
    isExtranet?: boolean, // 标志项目是否是内网环境，true为内网
    loginUrl?: string, // 用于复写项目部署后访问统一登陆的网址。
    mpApiUrl?: string, // 用于复写项目部署后api请求地址，默认值为https://mp${cfgType}.juslink.com/api。
}
```

<code transform="true" src="../../demo/url-config/index.tsx"></code>

## 包使用示例

```jsx | pure
import { extend } from '@jusda-tools/web-api-client';
import { mpApiUrl } from '@jusda-tools/url-config'

export const request =()=>{
    const request = extend({
        prefix: `${mpApiUrl}`,
        timeout: 100000,
        headers: {
            clientId: 'feedback',
        },
    });
    return request;
}
```


### 导出变量列举

##### 基础类型:
| 变量名       | 说明                     |   example(外网dev环境) |
| ---------- | ------------------------ | ------ | 
| domain_prefix     | -                 | https://dev.jus-link.com | 
| mp_domain_prefix | - | https://mpdev.jus-link.com | 
| visual_domain_prefix | - | https://visualdev.jus-link.com | 
| sccp_domain_prefix | - | https://sccpdev.jus-link.com | 
| bpo_domain_prefix | - | https://bpodev.jus-link.com | 
| dpm_domain_prefix | - | https://dpmdev.jus-link.com | 
| vmi_prefix | - | https://vmihubdev.jus-link.com | 

##### 可视化类产品:
| 变量名       | 说明                     |   example(外网dev环境) |
| ---------- | ------------------------------ | ------------ | 
| visual_ts1_url     | 运输查单-文字版     | https://visualdev.jus-link.com/ts1 | 
| visual_ts2_url | 运输查单-图形版 | https://visualdev.jus-link.com/ts2 | 
| visual_ts_mobile_url | 运输查询-移动版 | https://visualdev.jus-link.com/mobile/ts | 
| visual_inO_url | 静态库存-货主版 | https://visualdev.jus-link.com/in-o | 
| visual_eVMI_portal_url | eVMI Portal | https://visualdev.jus-link.com/evmi | 
| visual_eVMI_admin_url | eVMI Admin | https://visualdev.jus-link.com/evmi-config | 
| visual_dIn_url | 动态库存可视化 | https://visualdev.jus-link.com/d-in | 
| visual_materials_url | 物料可视化 | https://visualdev.jus-link.com/materials | 
| visual_rp_url | 可视化报表 | https://visualdev.jus-link.com/rp | 

##### 协同类产品:
| 变量名       | 说明                     |   example(外网dev环境) |
| ---------- | ------------------------------ | ------------ | 
| sccp_ob_url | 自营下单 | https://sccpdev.jus-link.com/ob |
| sccp_ob_ar_widget | 自营下单-估价审核 | https://sccpdev.jus-link.com/ob/ar/widget |
| sccp_inc_url | 仓储协同 | https://sccpdev.jus-link.com/inc  |
| sccp_pom_url | POM | https://sccpdev.jus-link.com/pom  |
| sccp_trade_order_process_url | 商贸Trade （trade）order-process | https://sccpdev.jus-link.com/trade/in-p |
| sccp_trade_customer_order_url | 商贸Trade （trade）customer-order | https://sccpdev.jus-link.com/trade/ex-p |
| sccp_4pl_url | 4pl | https://sccpdev.jus-link.com/4pl  |
| sccp_ptms_url | PTMS | https://sccpdev.jus-link.com/ptms |
| sccp_caa_url | CAA | https://sccpdev.jus-link.com/ts-cus/v01 |
| sccp_caa_admin_url | CAA-管理平台 | https://sccpdev.jus-link.com/ts-cus/admin |
| sccp_mlb2_url | MLB2 暂无dev  ？| https://sccpdev.jus-link.com/purchase/v01 |
| sccp_sharp_url | SHARP | https://sccpdev.jus-link.com/purchase/B0102 |
| sccp_fb_url | 意见反馈 | https://sccpdev.jus-link.com/fb  |
| sccp_cb_url | 跨境中转仓 | https://sccpdev.jus-link.com/cb  |
| sccp_wo_ckd_url | 仓储下单-CKD | https://sccpdev.jus-link.com/wo/ckd  |
| sccp_4pl_td_url | 4pl-运输需求 | https://sccpdev.jus-link.com/4pl/td  |
| sccp_4pl_fa_url | 4pl-费用估算 | https://sccpdev.jus-link.com/fa  |
| sccp_4pl_oms_url | 4pl-oms | https://sccpdev.jus-link.com/4pl  |

##### 业务中台相关:
| 变量名       | 说明                     |   example(外网dev环境) |
| ---------- | ------------------------------ | ------------ | 
| mp_login_entrance_url | 中台-统一登录/认证 | https://mpdev.jus-link.com/login-entrance |
| mp_user_portal_url | JusLink管理后台 | https://mpdev.jus-link.com/uc  |
| mp_ac_url | 公告中心 | https://mpdev.jus-link.com/ac/ |
| mp_ch_url | 帮助中心 | https://mpdev.jus-link.com/ch/ |
| mp_im_url | IM | https://mpdev.jus-link.com/im |
| mp_tenant_manage_url | 租户管理后台 | https://mpdev.jus-link.com/tenant/ms |
| mp_open_api_admin_url | Open Api-前端 | https://mpdev.jus-link.com/open-api-admin  |
| mp_system_callback_url | 系统回调 | https://mpdev.jus-link.com/system_callback  |
| mp_biz_event_url | 业务事件平台 | https://mpdev.jus-link.com/biz_event  |
| mp_workbench_url | 工作台 | https://dev.jus-link.com/wb  |
| mp_personalcenter_url | 个人中心 | https://mpdev.jus-link.com/personalcenter |
| mp_internalmsg_url | 站内信 | https://mpdev.jus-link.com/internalmsg  |
| mp_implementation_url | 配置中心 | https://mpdev.jus-link.com/Implementation |
| mp_task_center_url | 任务中心 | https://mpdev.jus-link.com/taskcenter |


##### 其他类:
| 变量名       | 说明                     |   example(外网dev环境) |
| ---------- | ------------------------------ | ------------ | 
| bpo_control_tower_url | 租户管理后台 | https://bpodev.jus-link.com/ct |
| pom_vmi_url | POM-VMI | https://vmihubdev.jus-link.com |
| dpm_mdm_url | 基础主数据管理 | https://dpmdev.jus-link.com/mdm |
| mp_403_url | 403地址 | https://dev.jus-link.com/wb/#/App/403 |
| loginSiteUrl | 统一登录 | window.jusdaBaseConfig.configLoginUrl 或 https://mpdev.jus-link.com/login-entrance |
| mpApiUrl | 网关 | https://mpdev.jus-link.com/api |


## v0.0.11
1、增加 配置中心地址