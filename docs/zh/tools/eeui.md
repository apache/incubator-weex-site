# 介绍

EEUI 是一个基于 WeexSDK 开发的独立完整框架（EEUI 仅支持 Android、iOS两端，不支持WEB端）。

:::danger
EEUI 是三方框架, 不由 Apache Weex 开发或维护。
:::

## 演示

<a href="https://eeui.app/app/android.apk" target="_blank"><img src="https://eeui.app/app/android.png" width="220px"></a>

<a href="javascript:alert('没钱申请开发者账号上架！');"><img src="https://eeui.app/app/ios.png" width="220px"></a>

<img src="https://eeui.app/app/demo.png" width="640px">

## 自带组件

除了Weex原有的组件外，EEUI还自带了很多实用的组件：

- [&lt;banner&gt;](https://eeui.app/component/banner.html) - 轮播控件，支持无限循环，支持任意组件
- [&lt;button&gt;](https://eeui.app/component/button.html) - 预设常用按钮
- [&lt;grid&gt;](https://eeui.app/component/grid.html) - 一个分页网格容器
- [&lt;icon&gt;](https://eeui.app/component/icon.html) - 字体图标，支持1126+个字体图标
- [&lt;marquee&gt;](https://eeui.app/component/marquee.html) - 跑马文字，一个横向自动滚动文字的容器
- [&lt;navbar&gt;](https://eeui.app/component/navbar.html) - 预设导航栏
- [&lt;ripple&gt;](https://eeui.app/component/ripple.html) - 一个点击元素时，会产生向外扩散的水波纹效果容器
- [&lt;scroll-text&gt;](https://eeui.app/component/scroll-text.html) - 一个横向滚动文字的容器，适合用于单行公告
- [&lt;scroll-view&gt;](https://eeui.app/component/scroll-view.html) - 列表容器，跟Weex自带的列表容器区别于自带原生下拉刷新+上拉加载更多
- [&lt;tabbar&gt;](https://eeui.app/component/tabbar.html) - 强大的选项卡页面
- [&lt;web-view&gt;](https://eeui.app/component/web-view.html) - 强大的web网页容器
- [更多组件...](https://eeui.app/component)

## 自带模块

除了Weex原有的模块外，EEUI还自带了很多实用的模块：

- [adDialog](https://eeui.app/module/adDialog.html) - 广告弹窗
- [ajax](https://eeui.app/module/ajax.html) - 异步请求，支持get、post
- [alert](https://eeui.app/module/alert.html) - 对话框，提示框、确认提示框、输入提示框
- [captcha](https://eeui.app/module/captcha.html) - 验证弹窗，滑动验证
- [keyboard](https://eeui.app/module/keyboard.html) - 键盘功能，动态隐藏软键盘、判断软键盘是否可见
- [loading](https://eeui.app/module/loading.html) - 等待弹窗，支持超过12+种等待效果
- [navigationBar](https://eeui.app/module/navigationBar.html) - 系统导航标题栏，不会被软键盘弹出导致导航栏上移
- [newPage](https://eeui.app/module/newPage.html) - 页面功能，打开页面、动态加载页面、拦截Android物理返回键、状态栏字体颜色、...等20+种页面相关功能
- [openOtherApp](https://eeui.app/module/openOtherApp.html) - 打开其他APP，支持打开微信、支付宝、qq、京东
- [saveImage](https://eeui.app/module/saveImage.html) - 保存网络图片至本地
- [getImageSize](https://eeui.app/module/getImageSize.html) - 获取网络图片尺寸
- [scaner](https://eeui.app/module/scaner.html) - 二维码扫描
- [share](https://eeui.app/module/share.html) - 文字图片系统分享
- [storage](https://eeui.app/module/storage.html) - 数据存储，支持app缓存（重启app数据不清除）、app全局变量（重启app数据清除）
- [system](https://eeui.app/module/system.html) - 系统信息，Android获取IMEI，iOS获取IFA等系统信息
- [toast](https://eeui.app/module/toast.html) - 简单好用吐司提示
- [更多模块...](https://eeui.app/module/)

## 插件市场

EEUI提供完整的插件市场，在原有的组件、模块不够业务需求时可以通过插件市场来补充更多的业务需求：

- [websocket](https://eeui.app/markets/detail.html#websocket) - 即时通讯
- [screenshots](https://eeui.app/markets/detail.html#screenshots) - 组件截图功能
- [citypicker](https://eeui.app/markets/detail.html#citypicker) - 城市选择器
- [picture](https://eeui.app/markets/detail.html#picture) - 图片选择器、视频选择、图片拍照、视频录制、压缩图片、预览图片、预览视频
- [rongim](https://eeui.app/markets/detail.html#rongim) - 融云连接登录、聊天室业务
- [umeng](https://eeui.app/markets/detail.html#umeng) - 友盟推送模块
- [pay](https://eeui.app/markets/detail.html#pay) - 第三方支付模块（支付宝、微信支付）
- [audio](https://eeui.app/markets/detail.html#audio) - 音频播放、获取音频时长
- [deviceInfo](https://eeui.app/markets/detail.html#deviceInfo) - 设备信息、网络状态、设备震动、屏幕信息、音量信息、电池信息
- [amap](https://eeui.app/markets/detail.html#amap) - 高德地图
- [videoView](https://eeui.app/markets/detail.html#videoView) - 视频播放器组件
- [communication](https://eeui.app/markets/detail.html#communication) - 直接拨打电话、发送短信、发送邮件
- [geolocation](https://eeui.app/markets/detail.html#geolocation) - 获取当前位置、实时监听定位
- [recorder](https://eeui.app/markets/detail.html#recorder) - 录音机支持声道、波段
- [accelerometer](https://eeui.app/markets/detail.html#accelerometer) - 加速器，获取当前加速度、实时监听加速度
- [compass](https://eeui.app/markets/detail.html#compass) - 指南针，获取当前方位角、实时监听方位角
- [插件市场](https://eeui.app/markets/)、[开发插件](https://eeui.app/plugin/dev/create.html)


## EEUI生态

- eeui-cli - [https://www.npmjs.com/package/eeui-cli](https://www.npmjs.com/package/eeui-cli)
- 中文文档 - [https://eeui.app/](https://eeui.app/)
- 插件市场 - [https://eeui.app/markets/](https://eeui.app/markets/)
- 演示项目 - [https://editor.eeui.app/#/case](https://editor.eeui.app/#/case)
- 在线编辑器 - [https://editor.eeui.app/](https://editor.eeui.app/)
- 交流社区 - [https://bbs.eeui.app/](https://bbs.eeui.app/)
- 热更新功能 - [https://eeui.app/update/](https://eeui.app/update/)
- 快速生成应用图标 - [https://eeui.app/guide/icons.html](https://eeui.app/guide/icons.html)
- 快速生成启动图片 - [https://eeui.app/guide/launch.html](https://eeui.app/guide/launch.html)
