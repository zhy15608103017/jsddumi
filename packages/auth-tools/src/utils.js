import {currentLanguage} from '@jusda-tools/language-control-panel'
import { CookieTools, UserIdentityId_Tab, UserIdentityId_Newest } from '@jusda-tools/jusda-publicmethod';
import localesConfig from '../locales/index.js'

const cookieTools = new CookieTools();


Array.prototype.flat=function value() {
    var depth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    if(typeof this.reduce === 'function'){
        return this.reduce(function (flat, toFlatten) {
            return flat.concat(Array.isArray(toFlatten) && depth > 1 ? toFlatten.flat(depth - 1) : toFlatten);
          }, []);
    }
    return Array.prototype.reduce.call(this,function (flat, toFlatten) {
        return flat.concat(Array.isArray(toFlatten) && depth > 1 ? toFlatten.flat(depth - 1) : toFlatten);
      }, []);

  }

export function getUrlParam(href, name) {
    const decodeHref = decodeURIComponent(href);
    let value = "";
    decodeHref
        .split("?")
        .map(item => item.split("&"))
        .flat()
        .filter(item => item.includes("="))
        .reverse()
        .forEach(item => {
            const [k, v] = item.split("=");
            if (k === name) {
                value = v;
            }
        });
    return value;
}

// 原生浏览器窗户是否被激活方法
export function monitorWindowStatus() {
    const locales = localesConfig.get(currentLanguage()==="zh-CN"?"zh-CN":"en-US")
    // 不同浏览器 hidden 名称
    let hiddenProperty = 'hidden' in document ? 'hidden' :
        'webkitHidden' in document ? 'webkitHidden' :
            'mozHidden' in document ? 'mozHidden' :
                null;
    // 不同浏览器的事件名
    let visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
    let onVisibilityChange = function() {
        if(!document[hiddenProperty]) {
            const userIdentityId_Tab = sessionStorage.getItem(UserIdentityId_Tab);
            const userIdentityId_Newest = cookieTools.get(UserIdentityId_Newest);
            // 当前页面的身份ID和全局存储的身份ID不相同
            if( userIdentityId_Tab && userIdentityId_Newest &&  userIdentityId_Tab !== userIdentityId_Newest){
                const html = document.getElementById('userIdentityerror');
                if(!html) {
                    const dom = document.createElement("div");
                    dom.id = 'userIdentityerror';
                    dom.className = 'userIdentityerror';
                    dom.innerHTML = "<div style=\"position:fixed;inset:0;z-index:1001;height:100%;background-color: #00000073\"></div>"+
                                        "<div tabindex=\"-1\" style=\"z-index: 1001;position: fixed;inset: 0;overflow:auto;outline: 0;\">"+
                                            "<div style=\"max-width: 500px; height:135px; top:100px;position: relative;margin: 0 auto;background-color:#fff\">"+
                                                `<div style=\"padding: 20px\">${locales.userIdentityError}</div>`+
                                                "<div style=\"position:absolute; bottom: 0; right: 0\">"+
                                                    "<button class=\"btn_reload\""+
                                                    `type=\"button\" onclick=\"document.getElementById('userIdentityerror').remove(); window.location.reload();\">${locales.reload}</button>`+
                                                "</div>"+
                                            "</div>"+
                                        "</div>";
                    document.getElementsByTagName('body')[0].appendChild(dom);

                    const style = document.createElement('style');
                    style.type = 'text/css';
                    style.innerHTML=
                    ".userIdentityerror .btn_reload{"+
                        "margin:12px;"+
                        "cursor:pointer;"+
                        "border-radius:3px;"+
                        "padding:4px 15px;"+
                        "border: 1px solid #d9d9d9;"+
                        "border-color: #ffc500;"+
                        "background: #ffc500;"+
                    "}"+
                    ".userIdentityerror .btn_reload:hover{"+
                        "border-color: #ffd429;"+
                        "background: #ffd429;"+
                    "}";

                    document.getElementsByTagName('head').item(0).appendChild(style);
                }
            }
        }
    }
    document.addEventListener(visibilityChangeEvent, onVisibilityChange);   // 添加元素事件句柄
}
