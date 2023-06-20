/* eslint-disable @typescript-eslint/camelcase */
import { getEnvType, getRootDomain } from './utils';

const {
    mpApiUrl: configMpApiUrl,
    loginUrl: configLoginUrl,
    isIntranet,
} = window.jusdaBaseConfig || {};

export const domain_prefix = isIntranet
    ? `https://juslink${getEnvType()}${getRootDomain()}`
    : `https://${getEnvType() ? getEnvType() : 'www'}${getRootDomain()}`;
export const mp_domain_prefix = `https://mp${getEnvType()}${getRootDomain()}`;
export const visual_domain_prefix = `https://visual${getEnvType()}${getRootDomain()}`;
export const sccp_domain_prefix = `https://sccp${getEnvType()}${getRootDomain()}`;
export const bpo_domain_prefix = `https://bpo${getEnvType()}${getRootDomain()}`;
export const dpm_domain_prefix = `https://dpm${getEnvType()}${getRootDomain()}`;
export const vmi_prefix = `https://vmihub${getEnvType()}${getRootDomain()}`;

// 可视化类产品
export const visual_ts1_url = `${visual_domain_prefix}/ts1`; // 运输查单-文字版
export const visual_ts2_url = `${visual_domain_prefix}/ts2`; // 运输查单-图形版
export const visual_ts_mobile_url = `${visual_domain_prefix}/mobile/ts`; // 运输查询-移动版
export const visual_inO_url = `${visual_domain_prefix}/in-o`; // 静态库存-货主版
export const visual_eVMI_portal_url = `${visual_domain_prefix}/evmi`; // eVMI Portal
export const visual_eVMI_admin_url = `${visual_domain_prefix}/evmi-config`; // eVMI Admin
export const visual_dIn_url = `${visual_domain_prefix}/d-in`; // 动态库存可视化
export const visual_materials_url = `${visual_domain_prefix}/materials`; // 物料可视化
export const visual_rp_url = `${visual_domain_prefix}/rp`; // 可视化报表

// 协同类产品
export const sccp_ob_url = `${sccp_domain_prefix}/ob`; // 自营下单
export const sccp_ob_ar_widget = `${sccp_domain_prefix}/ob/ar/widget`; // 自营下单-估价审核
export const sccp_ob_sc_widget = `${sccp_domain_prefix}/ob/sc/widget`; // 自营下单-船期可视化
export const sccp_inc_url = `${sccp_domain_prefix}/inc`; // 仓储协同
export const sccp_pom_url = `${sccp_domain_prefix}/pom`; // POM
export const sccp_trade_order_process_url = `${sccp_domain_prefix}/trade/in-p`; // 商贸Trade （trade）order-process
export const sccp_trade_customer_order_url = `${sccp_domain_prefix}/trade/ex-p`; // 商贸Trade （trade）customer-order
export const sccp_4pl_url = `${sccp_domain_prefix}/4pl`; // 4pl
export const sccp_ptms_url = `${sccp_domain_prefix}/ptms`; // PTMS
export const sccp_caa_url = `${sccp_domain_prefix}/ts-cus/v01`; // CAA
export const sccp_caa_admin_url = `${sccp_domain_prefix}/ts-cus/admin`; // CAA-管理平台
export const sccp_mlb2_url = `${sccp_domain_prefix}/purchase/v01`; // MLB2 暂无dev  ？
export const sccp_sharp_url = `${sccp_domain_prefix}/purchase/B0102`; // SHARP
export const sccp_fb_url = `${sccp_domain_prefix}/fb`; // 意见反馈
export const sccp_cb_url = `${sccp_domain_prefix}/cb`; // 跨境中转仓
export const sccp_wo_ckd_url = `${sccp_domain_prefix}/wo/ckd`; // 仓储下单-CKD
export const sccp_4pl_td_url = `${sccp_domain_prefix}/4pl/td`; //4pl-运输需求
export const sccp_4pl_fa_url = `${sccp_domain_prefix}/fa`; //4pl-费用估算
export const sccp_4pl_cw_url = `${sccp_domain_prefix}/4pl/cw`; //4pl-康宁站点
export const sccp_4pl_oms_url = `${sccp_domain_prefix}/4pl`; //4pl-oms

// 业务中台相关
export const mp_login_entrance_url = `${mp_domain_prefix}/login-entrance`; // 中台-统一登录/认证
export const mp_user_portal_url = `${mp_domain_prefix}/uc`; // JusLink管理后台
export const mp_ac_url = `${mp_domain_prefix}/ac/`; // 公告中心
export const mp_ch_url = `${mp_domain_prefix}/ch/`; // 帮助中心
export const mp_im_url = `${mp_domain_prefix}/im`; // IM
export const mp_tenant_manage_url = `${mp_domain_prefix}/tenant/ms`; // 租户管理后台
export const mp_open_api_admin_url = `${mp_domain_prefix}/open-api-admin`; // Open Api-前端
export const mp_system_callback_url = `${mp_domain_prefix}/system_callback`; // 系统回调
export const mp_biz_event_url = `${mp_domain_prefix}/biz_event`; // 业务事件平台
export const mp_workbench_url = `${domain_prefix}/wb`; // 工作台
export const mp_personalcenter_url = `${mp_domain_prefix}/personalcenter`; // 个人中心
export const mp_internalmsg_url = `${mp_domain_prefix}/internalmsg`; // 站内信
export const mp_implementation_url = `${mp_domain_prefix}/Implementation`; // 配置中心
export const mp_task_center_url = `${mp_domain_prefix}/taskcenter`; // 任务中心
// 业务中台相关 juslink门户
export const home_url = `${domain_prefix}/home`; // 门户首页

// 其他类
export const bpo_control_tower_url = `${bpo_domain_prefix}/ct`; // 租户管理后台
export const pom_vmi_url = `${vmi_prefix}`; // POM-VMI
export const dpm_mdm_url = `${dpm_domain_prefix}/mdm`; // 基础主数据管理
export const mp_403_url = `${domain_prefix}/wb/#/App/403`; // 403地址

export const loginSiteUrl =
  configLoginUrl || `${mp_domain_prefix}/login-entrance`;
export const mpApiUrl = configMpApiUrl || `${mp_domain_prefix}/api`;
