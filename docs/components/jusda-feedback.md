---
title: jusda-feedback 意见反馈
nav: 组件
toc: content
group: 
  title: 业务组件
  order: 3
---
# jusda-feedback

## 注册
主入口文件

初始化  window.Sdp = new Sdp();  必须放在认证之前

```jsx | pure
import { Sdp } from '@jusda-tools/jusda-feedback'; // 组件内部


async function bootstrap() {
    // 初始化sdp
    window.Sdp = new Sdp(); // 业务系统
    // 统一认证鉴权
    await AuthLogin();
    // 跨应用鉴权
    await AuthApplication();
    // end
    await initLocale();
    app.start('#root');
    recordUserActions(appName, { // 用户埋点
        action: 'initialization',
        properties: [{ partNo: '', shipmentId: '' }],
    });
}
```

## 引用参数
theme = 'light', //or  dark
showQrcode, // 默认为false，显示
bottom = '100px',
locale = 'zh-CN',//or  en-US 不传默认umi_locale 从localstorage取,传了以他为准
localeKey ,  //如果自定义key，也就是当localstorage里面的key不是umi_locale的话，传递自定义下去。也可以默认从localstorage根据自定义的key取国际化参数。
提供参数传递改变主题，位置，语言。目前支持的语言为中文，。英文。
isModalVisible， // 表示弹框是否显示， true == 显示，默认false
isBtnHidden， // 表示隐藏原来的按钮和交互逻辑， 默认值是true，当isBtnHidden === false时，不建议在使用isModalVisible属性
## Example
最顶级容器，如 appContainer

<code iframe="true" src="../../demo/jusda-feedback/index.tsx"></code>


## 配置文件
src/目录下新建文件夹取名随意，但是需要和之后webpack配置相同。
``` jsx | pure
const value = [
    {
        path: 'shipment/list',
        defaultTemplate: function() {
            return `单号${window.Sdp.ordernumber}222222222`; //or dva value
        },
        // variable: `window.Sdp.ordernumber`,
    },
];

window.Sdp.regist(value);
```

## webpackdev配置和prod配置
```jsx | pure
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

 entry: {
    index: [require.resolve('./polyfills'), paths.appIndexJs],
    sdp: glob.sync(resolveApp('src/自己取的文件夹名字')+'/*') // 
  },
```

