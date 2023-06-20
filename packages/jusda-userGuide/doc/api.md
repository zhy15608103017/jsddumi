# 文档
通过Joyride组件实现用户引导功能，通过配置文件初始化引导显示内容，通过api控制引导展示时机。

![tour diagrams](.\tourDiagrams.png)

#### **APIs：**

**1. inItData**

项目入口引入文件，使用inItData方法，传入本地config文件进行初始化。

params：

​	config：Array<object> ，引导配置文件，

​	callback：Function，回调方法，将在引导配置文件数据处理完毕后调用。

```
//... 引入引导config文件tourData
JusdaUserGuide.inItData(tourData, ()=>{
	JusdaUserGuide.show([{tourId:'A',version:'1'}])
});
```

config文件示例：

```
[
	{
	tourId:'A',
	version:1,
	steps:[
		{
		content: <h2>{formatMessage({ id: 'step.Reference No.' })}</h2>,
        floaterProps: {
                    disableAnimation: true,
                },
        spotlightPadding: 20,
        target: '.guide-test1', //传入css选择器
        disableBeacon: true, //请默认设置为true，否则会影响定位
        }
		...
	]},
	{tourId:'B',
	version:2,
	steps:[
		{
        content: <h2>内容2</h2>,
        floaterProps: {
        disableAnimation: true,
        },
        spotlightPadding: 20,
        target: '.guide-test2',
        disableBeacon: true, //请默认设置为true，否则会影响定位
        },
		...
	]}
]
```

其他配置项可参考https://docs.react-joyride.com/step



**2. show**

在页面渲染完成后调用show方法，传入要展示的tourId集合。

params:

​	toursForShow: Array<string>，要展示的引导集。

注意，若高亮部分Dom节点与数据相关，请确保在页面渲染完成之后调用此方法，否则该步骤会被跳过；若该引导提示第一步未找到相应Dom节点，则可能会导致该系列引导无法开始。

```
//... 引入引导config文件tourData
JusdaUserGuide.show(
	['A', 'B']
);
```



**3. replay**

调用replay方法，发送请求重置相关引导的数据。

params:

​	tourIds: Array<object>，要重置的引导集（可不传，目前后端暂未对参数进行处理，直接重置的全部引导查看记录）。

​	callback: Function，回调函数，在请求成功并返回后调用该方法。

```
//... 引入引导config文件tourData
JusdaUserGuide.replay(
	tourIds, callback
);
```



**4. overrideApi**

使用该方法覆盖Joyride组件props，由于callback中会处理引导记录接口的调用，所以不可覆盖callback。

params： 

​	apiProps: object

```
//... 引入引导config文件tourData
JusdaUserGuide.replay(
	['A'，'B']
);
```

Joyride配置项可参考https://docs.react-joyride.com/