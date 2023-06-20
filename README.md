# packages目录下的工具列表
|  \   |                包名                 |                             说明                             | ts 支持 | 最新版本      | 备注 |
| :--: | :---------------------------------: | :----------------------------------------------------------: | :------ | ------------- | ---- |
|  1   |    @jusda-tools/action-decorator    |      [埋点记录](./packages/action-decorator/README.md)       | N       | 0.1.17        | -    |
|  2   |     @jusda-tools/auth-component     |       [权限组件](./packages/auth-component/README.md)        | Y       | 0.0.62        | -    |
|  3   |       @jusda-tools/auth-tools       |       [用户鉴权函数](./packages/auth-tools/README.md)        | N       | 0.0.70        | -    |
|  4   |      @jusda-tools/http-client       |        [http 请求](./packages/http-client/README.md)         | Y       | -             | 废弃 |
|  5   | @jusda-tools/language-control-panel | [语言切换UI组件](./packages/language-control-panel/README.md) | Y       | 0.2.2         | -    |
|  6   |   @jusda-tools/user-control-panel   |   [用户信息面板](./packages/user-control-panel/README.md)    | N       | 0.1.42        | -    |
|  7   |     @jusda-tools/mapbox-config      |      [mapbox 配置](./packages/mapbox-config/README.md)       | N       | 0.1.8-alpha.0 | -    |
|  8   |        @jusda-tools/address         |                         收发货人组件                         | Y       | 1.0.58        | -    |
|  9   |     @jusda-tools/im-component     |        [IM弹窗组件(new)](./packages/im-component/README.md)         | N       | 0.0.6        | -    |
|  10   |     @jusda-tools/im-integration     |        [IM组件(old)](./packages/im-integration/README.md)         | N       | 0.2.5         | -    |
|  11  |     @jusda-tools/jusda-feedback     | [在线意见反馈(SDP)组件](./packages/jusda-feedback/README.md) | Y       | 0.0.22        | -    |
|  12  |      @jusda-tools/jusda-upload      |      [文件上传组件](./packages/jusda-upload/README.md)       | Y       | 0.0.1         | -    |
|  13  |    @jusda-tools/local-permission    |  [国内/外 权限组件](./packages/local-permission/README.md)   | Y       | 0.0.1         | -    |
|  14  |     @jusda-tools/sider-nav-bar      |      [侧边导航组件](./packages/sider-nav-bar/README.md)      | Y       | 0.0.4         | -    |
|  15  |     @jusda-tools/sider-nav-menu      |      [侧边导航菜单组件](./packages/sider-nav-menu/README.md)      | Y       | 0.0.3         | -    |
|  16  |     @jusda-tools/jusda-header       |      [前端页面头部组件](./packages/jusda-header/README.md)   | Y       | 0.0.6         | -    |
|  17  |     @jusda-tools/pollingdownload    |  [轮询下载函数](./packages/jusda-pollingDownload/README.md)  | N       | 0.0.4         | -    |
|  18  |     @jusda-tools/jusda-userguide    |        [用户引导函数](./packages/jusda-userGuide/README.md)  | Y       | 0.0.5         | -    |
|  19  |  @jusda-tools/component-base-config-tools |  [组件基础配置](./packages/component-base-config-tools/README.md)  | N       | 0.1.2         | -    |
|  20  |     @jusda-tools/jusda-footer    |        [footer组件](https://gitlab.jusdaglobal.com/jusda-ui/jusda-footer/blob/master/README.md)  | N       | 0.1.6         | -    |
|  21  |     @jusda-tools/web-api-client    |        [http请求库](./packages/web-api-client/README.md)  | Y       | 0.0.4         | -    |
|  22   |   @jusda-tools/caa-user-control-panel   |   [用户信息面板](./packages/caa-user-control-panel/README.md)    | Y       | 0.1.10        | -    |
|  23   |   @jusda-tools/time-convert   |   [时间转换组件](./packages/time-convert/README.md)    | Y       | 0.0.1        | -    |
|  24   |   @jusda-tools/cascader   |   [级联组件](./packages/cascader/README.md)    | Y       | 0.0.1        | -    |

## dumi启动方式
npm run start


## lerna 发包简易流程
1. lerna bootstrap
2. npm login
3. lerna publish

> 详见: [gitlab 教程](https://gitlab.jusdaglobal.com/jusda-ui/jusda-tools/issues/1) 或见 [github/lerna](https://github.com/lerna/lerna).

