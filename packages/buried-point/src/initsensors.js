/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// import sfInstantEvent from './sensorsPlugin/sf-instant-event/index.es6.js';
// import exposure from './sensorsPlugin/exposure/index.es6.js';
import { mpApiUrl } from '@jusda-tools/url-config';
import sensors from "./sensorsdata.es6.full.js";
import pageleave from './sensorsPlugin/pageleave/index.es6.js';
import pageload from './sensorsPlugin/pageload/index.es6.js';
import exposure from './sensorsPlugin/exposure/index.js';
import rp from './sensorsPlugin/register-properties/index.es6.js';
export default function initGlobalPoints(appCode, parms = {}) {
 const {jusdaBaseConfig:{cfgType}}=window
  const {
    url = `${mpApiUrl}/jusda-common-operation-log/logs/v2/buried-point-logs`,
    is_track_single_page = true,
    show_log = false,
    datasend_timeout = 8000,
    send_interval = 6000,
    storage_length = 200,
    sfInstantEventArr = [],
    open=false,
    collect_tags={}
  } = parms
  // 作为乾坤子应用
  if(window?.__POWERED_BY_QIANKUN__)return
  if(location.href.includes("127.0.0.1")&&!open) return
  // if(!open&&cfgType!=="prod") return
  if (appCode) {
    window.Jusda_Appname = appCode
  }
  if (Array.isArray(sfInstantEventArr) && sfInstantEventArr.length) {
    window.Jusda_sfInstantEventArr = sfInstantEventArr
  }
  sensors.use(exposure, {
    area_rate: 0,
    stay_duration: 2,
    repeated: true
  });
  var registerPlugin = sensors.use(rp);
  registerPlugin.hookRegister(function () {

    return {
      userAgent: navigator.userAgent,
      // 浏览器窗口高度
      outHeight: window.outerHeight,
      // 浏览器窗口宽度
      outWidth: window.outerWidth,
      // 浏览器窗口相对于屏幕的X坐标
      screenX: window.screenX,
      // 浏览器窗口相对于屏幕的Y坐标
      screenY: window.screenY,
      // 当前电脑屏幕可用宽度
      workWidth: window.screen.availWidth,
      // 当前电脑屏幕可用高度
      workHeight: window.screen.availHeight,

    }
  })


  // 元素曝光采集
  sensors.use(exposure, {
    area_rate: 0,
    stay_duration: 2,
    repeated: true
  });
  // 未开放功能,配置后事件触发直接上报，不会缓存
  //   sensors.use(sfInstantEvent,{
  //     instant_events:[...sfInstantEventArr] // 配置即时上报事件名称
  // });

  // 监控页面加载
  sensors.use(pageload, { max_duration: 120 });

  // 页面停留时间
  sensors.use(pageleave, {

    heartbeat_interval_time: 5,
    // 最大停留时间
    max_duration: 5 * 24 * 60 * 60,
    isCollectUrl: function () {
      // 本功能可指定页面采集，未开放
      // url 为要采集页面浏览时长的页面地址。
      return true; // 采集
      // return false; // 不采集
    }
  });
  sensors.init({
    server_url: url,
    is_track_single_page, // 单页面配置，默认开启，若页面中有锚点设计，需要将该配置删除，否则触发锚点会多触发 $pageview 事件
    use_client_time: true,// 是否使用客户端时间
    send_type: 'ajax',// 发送方式
    show_log,// log时间输出
    //   jsapp:{
    //     setData: function (data){
    //       console.log(data,"data");
    //         // 自行存储页面采集数据
    //     },
    //     getData: function (){
    //         // 返回存储的页面采集数据集合
    //         return new Array(200).fill(1)
    //     }
    // },

    preset_properties: {
      //是否采集 $latest_utm 最近一次广告系列相关参数，默认值 true。
      latest_utm: false,
      //是否采集 $latest_traffic_source_type 最近一次流量来源类型，默认值 true。
      latest_traffic_source_type: false,
      //是否采集 $latest_search_keyword 最近一次搜索引擎关键字，默认值 true。
      latest_search_keyword: false,
      //是否采集 $latest_referrer 最近一次前向地址，默认值 true。
      latest_referrer: false,
      //是否采集 $latest_referrer_host 最近一次前向地址，1.14.8 以下版本默认是true，1.14.8 及以上版本默认是 false，需要手动设置为 true 开启。
      latest_referrer_host: false,
      //是否采集 $latest_landing_page 最近一次落地页地址，默认值 false。
      latest_landing_page: false,
      //是否采集 $url 页面地址作为公共属性，1.16.5 以下版本默认是 false，1.16.5 及以上版本默认是 true。
      url: true,
      //是否采集 $title 页面标题作为公共属性，1.16.5 以下版本默认是 false，1.16.5 及以上版本默认是 true。
      title: true,
    },
    heatmap: {
      //是否开启点击图，default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭。
      clickmap: 'default',
      //是否开启触达图，not_collect 表示关闭，不会自动采集 $WebStay 事件，可以设置 'default' 表示开启。
      scroll_notice_map: 'not_collect',
      collect_tags
      // collect_tags: {
        // div: {
        //   max_level: 1 // 默认是 1，即只支持叶子 div。可配置范围是 [1, 2, 3],非该范围配置值，会被当作 1 处理。
        // },
        // li: true,
        // img: true,
        // svg: true,
        // span: true,
        // td: true,
        // i:true,
      // }
    },
    batch_send: {
      datasend_timeout, //一次请求超过多少毫秒的话自动取消，防止请求无响应。
      send_interval,//间隔多少毫秒发一次数据。
      storage_length// 存储 localStorage 条数最大值，默认：200 。如 localStorage 条数超过该值，则使用 image 方式立即发送数据。v1.24.8 以上支持。
    },

  });

  // 开启全埋点
 sensors.quick('autoTrack')

}
export { sensors, exposure };