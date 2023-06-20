/* eslint-disable linebreak-style */
/* eslint-disable no-empty */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable indent */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/camelcase */
//类型判断函数

export const typeJudgment = (obj) => {
    return Object.prototype.toString.call(obj).replace(/\[object\s(.+)\]/, "$1").toLowerCase()
}
export  function getBrowserVersion(){
    var browser = getBrowserInfo() ;
    var verinfo = (browser+"")?.replace(/[^0-9.]/ig, "");  
    return verinfo
}
function getBrowserInfo() {
    　　var Sys = {};
    　　var ua = navigator?.userAgent?.toLowerCase();
    　　var s; (s = ua?.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
    　　(s = ua?.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
    　　(s = ua?.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
    　　(s = ua?.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
    　　(s = ua?.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
     
    　　if(Sys.ie) {
    　　　　return 'IE: ' + Sys.ie;
    　　}
    　　if(Sys.firefox) {
    　　　　return 'Firefox: ' + Sys.firefox;
    　　}
    　　if(Sys.chrome) {
    　　　　return 'Chrome: ' + Sys.chrome;
    　　}
    　　if(Sys.opera) {
    　　　　return 'Opera: ' + Sys.opera;
    　　}
    　　if(Sys.safari) {
    　　　　return 'Safari: ' + Sys.safari;
    　　}
         return " "
     
    } 


    export function getBrowser() {
        var u = navigator?.userAgent ?? "";
     
        var bws = [{
            name: 'sgssapp',
            it: /sogousearch/i.test(u)
        }, {
            name: 'wechat',
            it: /MicroMessenger/i.test(u)
        }, {
            name: 'weibo',
            it: !!u?.match(/Weibo/i)
        }, {
            name: 'uc',
            it: !!u?.match(/UCBrowser/i) || u.indexOf(' UBrowser') > -1
        }, {
            name: 'sogou',
            it: u?.indexOf('MetaSr') > -1 || u.indexOf('Sogou') > -1
        }, {
            name: 'xiaomi',
            it: u.indexOf('MiuiBrowser') > -1
        }, {
            name: 'baidu',
            it: u.indexOf('Baidu') > -1 || u.indexOf('BIDUBrowser') > -1
        }, {
            name: '360',
            it: u.indexOf('360EE') > -1 || u.indexOf('360SE') > -1
        }, {
            name: '2345',
            it: u.indexOf('2345Explorer') > -1
        }, {
            name: 'edge',
            it: u.indexOf('Edge') > -1
        }, {
            name: 'ie11',
            it: u.indexOf('Trident') > -1 && u.indexOf('rv:11.0') > -1
        }, {
            name: 'ie',
            it: u.indexOf('compatible') > -1 && u.indexOf('MSIE') > -1
        }, {
            name: 'firefox',
            it: u.indexOf('Firefox') > -1
        }, {
            name: 'safari',
            it: u.indexOf('Safari') > -1 && u.indexOf('Chrome') === -1
        }, {
            name: 'qqbrowser',
            it: u.indexOf('MQQBrowser') > -1 && u.indexOf(' QQ') === -1
        }, {
            name: 'qq',
            it: u.indexOf('QQ') > -1
        }, {
            name: 'chrome',
            it: u.indexOf('Chrome') > -1 || u.indexOf('CriOS') > -1
        }, {
            name: 'opera',
            it: u.indexOf('Opera') > -1 || u.indexOf('OPR') > -1
        }];
     
        for (var i = 0; i < bws.length; i++) {
            if (bws[i]?.it) {
                return bws[i]?.name;
            }
        }
     
        return 'other';
    }
// 数据处理函数
export function jusdaDataConversionFn(obj) {
    const dataprocessing = (parms) => {
        const { Jusda_Appname, jusdaBaseConfig: { appName, clientId ,productCode}, jusdaUserInfo } = window
        const returnobj = {
            userInfo: {},
            clientInfo: {},
            properties: {},
            extraProperties: {},
        }
        // 通用
        returnobj.time = parms?.time
        returnobj.type = parms?.type
        returnobj.event = parms?.event?.replace("$", "")
        returnobj.appCode = Jusda_Appname||productCode || appName || clientId
        returnobj.userInfo.userId = jusdaUserInfo?.data?.user?.userId ?? null
        returnobj.userInfo.nickName = jusdaUserInfo?.data?.user?.nickName   ?? null
        returnobj.userInfo.tenantId = jusdaUserInfo?.data?.userIdentity?.tenant?.tenantId ?? null
        returnobj.userInfo.tenantName = jusdaUserInfo?.data?.userIdentity?.tenant?.tenantName ?? null
        returnobj.userInfo.proxyUserId = jusdaUserInfo?.data?.proxyUser?.userId ?? null
        returnobj.userInfo.proxyUserName = jusdaUserInfo?.data?.proxyUser?.username ?? null
        returnobj.userInfo.token = jusdaUserInfo?.data?.user?.token ?? null
        //客户端信息
        returnobj.clientInfo.screenHeight = parms?.properties?.$screen_height ?? null
        returnobj.clientInfo.screenWidth = parms?.properties?.$screen_width ?? null
        returnobj.clientInfo.viewportHeight = parms?.properties?.$viewport_height ??null
        returnobj.clientInfo.viewportWidth = parms?.properties?.$viewport_width ?? null
        returnobj.clientInfo.outWidth = parms?.properties?.outWidth ??null
        returnobj.clientInfo.outHeight = parms?.properties?.outHeight ?? null
        returnobj.clientInfo.pageHeight = parms?.properties?.$page_height ?? null
        returnobj.clientInfo.pageWidth = parms?.properties?.$page_wight ?? null
        returnobj.clientInfo.lib = parms?.properties?.$lib ?? "js"
        returnobj.clientInfo.libVersion = parms?.properties?.$lib_version
        returnobj.clientInfo.screenX = parms?.properties?.screenX ?? null
        returnobj.clientInfo.screenY = parms?.properties?.screenY ?? null
        returnobj.clientInfo.url = parms?.properties?.$url ?? null
        returnobj.clientInfo.urlPath = parms?.properties?.$url_path ?? null
        returnobj.clientInfo.title = parms?.properties?.title ?? document.title
        try{
            returnobj.clientInfo.referrerHost = parms?.properties?.$referrer_host ?? new URL(document.referrer)?.host ?? null
        } catch (error){
            returnobj.clientInfo.referrerHost=null
        }
        returnobj.clientInfo.referrer = parms?.properties?.$referrer ?? document.referrer??null
        returnobj.clientInfo.viewportPosition = parms?.properties?.$viewport_position ?? (Math.round((document.documentElement && document.documentElement.scrollTop) || window.pageYOffset || document.body.scrollTop || 0)||0)
        returnobj.clientInfo.userAgent = parms?.properties?.userAgent ?? null
        returnobj.clientInfo.browserVersion =getBrowserVersion() ??null
        returnobj.clientInfo.browser = getBrowser() ??null   
        //event信息
        returnobj.properties.eventDuration = parms?.properties?.event_duration ?? null
        returnobj.properties.pageResourceSize = parms?.properties?.$page_resource_size ?? null
        returnobj.properties.elementType = parms?.properties?.$element_type ?? null
        returnobj.properties.elementClassName = parms?.properties?.$element_class_name ?? null
        returnobj.properties.elementContent = parms?.properties?.$element_content ??null
        returnobj.properties.elementSelector = parms?.properties?.$element_selector ?? null
        returnobj.properties.elementPath = parms?.properties?.$element_path ?? null
        returnobj.properties.elementXPath = parms?.properties?.elementXPath ?? null
        returnobj.properties.pageX = parms?.properties?.$page_x ?? null
        returnobj.properties.pageY = parms?.properties?.$page_y ?? null
        returnobj.extraProperties = parms?.properties?.extraProperties ?? {}


        return returnobj
    }

    if (typeJudgment(obj) === 'object') {
        return JSON.stringify([dataprocessing(obj)])
    }
    if (typeJudgment(obj) === 'array') {
        return JSON.stringify(obj.map((item) => dataprocessing(item)))
    }

}

export const jusdaremoveEvents = (obj) => {
    //   那些事件需要被发送的
    const eventlist = Array.isArray(window?.Jusda_sfInstantEventArr) ? ["$WebPageLoad", "$pageview", "$WebClick", "$WebPageLeave", "custom", "elementExposure", ...window?.Jusda_sfInstantEventArr] : ["$WebPageLoad", "$pageview", "$WebClick", "$WebPageLeave", "custom", "elementExposure"];
    obj = JSON.parse(obj)
    if (typeJudgment(obj) === 'object') {
        if (eventlist.includes(obj?.event)) {
            return obj
        }

        return false
    }
    if (typeJudgment(obj) === 'array') {
        const arr = obj.filter(item => eventlist?.includes(item?.event))
        if (arr?.length) {
            return arr
        }
        return false
    }
    return false
}


