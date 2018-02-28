---
title: 使用 weex-toolkit
type: tools
order: 5.1
version: 2.1
---

# weex-toolkit

[weex-toolkit](https://github.com/weexteam/weex-toolkit) 是官方提供的一个脚手架命令行工具，你可以使用它进行 Weex 项目的创建，调试以及打包等功能。

## 安装

``` bash
$ npm install -g weex-toolkit
```

> 如果你本地没有安装 node.js 你可以前往[Nodejs 官网](https://nodejs.org/en/)下载安装, 并确保你的 node 版本是>=6，你可以使用 [n](https://github.com/tj/n) 来进行 node 的版本管理。

中国用户如果npm遭遇网络问题，可以使用淘宝的 [npm镜像](https://npm.taobao.org/)或通过[nrm](https://www.npmjs.com/package/nrm)工具切换你的npm镜像：

``` bash
$ npm install weex-toolkit -g --registry=https://registry.npm.taobao.org
// 或者
$ nrm use taobao
$ npm install weex-toolkit -g
```

如果你安装的过程中遇到了问题，你可以在[weex-toolkit常见问题](https://github.com/weexteam/weex-toolkit/blob/master/README-zh.md#%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98)中找到解决方法或者在[weex-toolkit issues](https://github.com/weexteam/weex-toolkit/issues)中进行反馈。


## 命令

### create
```bash
# 从官方模板中创建项目
$ weex create my-project

# 从github上下载模板到本地
$ weex create username/repo my-project
```
从官方模板或者远程源创建项目模板，你也可以创建你自己的`weex`项目模板，更多细节你可以查看[如何创建你自己的模板](https://github.com/weex-templates/How-to-create-your-own-template).

### preview

weex-toolkit supports previewing your Weex file(`.we` or `.vue`) in a watch mode. You only need specify your file path.
weex-toolkit工具支持对你的Weex文件（`.vue`)在监听模式下进行预览，你只需要指定一下你的项目路径。

自`weex-toolkit v1.1.0+`版本后修改
``` bash
$ weex preview src/foo.vue
```

浏览器会自动得打开预览页面并且你可以看到你的weex页面的布局和效果。如果你在你的设备上安装了[Playground](https://weex.apache.org/cn/playground.html)，你还可以通过扫描页面上的二维码来查看页面。

使用下面的命令，你将可以预览整个文件夹中的`.vue`文件

``` bash
$ weex src --entry src/foo.vue
```

你需要指定要预览的文件夹路径以及入口文件（通过`--entry`传入）。

### compile

使用 `weex compile` 命令可以编译单个weex文件或者整个文件夹中的weex文件。

``` bash
$ weex compile [source] [dist]  [options]
```

#### 参数

| Option        | Description    | 
| --------   | :-----   |
|`-w, --watch` | 开启watch模式，同步文件改动并进行编译|
|`-d,--devtool [devtool]`|设置devtool选项|
|`-e,--ext [ext]`| 设置文件拓展名，默认为vue|
|`-m, --min`| 压缩jsbundle选项|

你可以这样子使用：

``` bash
$ weex compile src dest --devtool source-map -m
```

### platform

使用`weex platform [add|remove] [ios|android]`命令可以添加或移除ios/android项目模板。

``` bash
$ weex platform add ios
$ weex platform remove ios
```

使用 `weex platform list`来查看你的项目中支持的平台。

### run

你可以使用`weex-toolkit`来运行android/ios/web项目.

``` bash
$ weex run ios
$ weex run android
$ weex run web
```

### debug

** [Weex devtools](https://github.com/weexteam/weex-devtool) ** 是实现[Chrome调试协议](https://developer.chrome.com/devtools/docs/debugger-protocol)的Weex自定义开发工具, 
主要用于帮助你快速检查您的应用程序，并在Chrome网页中调试您的JS bundle源代码，支持Android和iOS平台。所以你可以通过`weex-toolkit`使用的`weex-devtool`功能。

#### 用法

``` bash
weex debug [we_file|bundles_dir] [options]
```

#### 参数

| Option        | Description    | 
| --------   | :-----   |
|`-v, --version`|  显示weex-debugger版本信息|
|`-h, --help`| 展示帮助信息 |
|` -H --host [host]`| 设置浏览器打开的host地址（适用于代理环境下，如docker环境等）|
|`-p, --port [port]`| 设置调试服务器的端口，默认值 8088|
|`-m, --manual`|开启该选项后将不会自动打开浏览器|
|`-e,--ext [ext]`|设置文件拓展名用于编译器编译，默认值为`vue`|
|`--min`|开启该选项后将会压缩jsbunlde|
|`--telemetry`|上传用户数据帮助提升weex-toolkit体验|
|`--verbose`|显示详细的日志数据|
|`--loglevel [loglevel]`|设置日志等级，可选silent/error/warn/info/log/debug,默认值为error|
|`--remotedebugport [remotedebugport]`|设置调试服务器端口号，默认值为9222|

#### 功能介绍

##### 连接设备
使用以下命令打开调试页面，使用测试包扫码，进入你需要调试的weex页面
```
$ weex debug
```
自`weex-toolkit v1.1.0+`版本起默认的debug工具已从[weex-devtool](https://github.com/weexteam/weex-devtool)切换至[weex-debugger](https://github.com/weexteam/weex-debugger)，如想使用旧版本devtool，可通过以下命令使用：

```
$ weex xbind debugx weex-devtool
$ weex debugx
```

##### 链接设备

请使用[weex playground app](http://weex.apache.org/tools/playground.html)扫码或使用集成了weex-devtool的app进行扫码，集成方法见[集成devtool工具](#集成devtool工具)。有ios模拟器环境的用户也可以通过点击二维码的方式进行模拟器调试（仅限mac用户使用）。

![debugger-main](https://img.alicdn.com/tfs/TB1v.PqbmBYBeNjy0FeXXbnmFXa-1886-993.png)

##### 编译 `.vue` 文件

```
$ weex debug your_weex.vue
```
点击可扫码的二维码按钮即可打开编译后得到的产物二维码，可直接通过weex playground app 进行扫码预览。

![devtools-entry](https://img.alicdn.com/tfs/TB1j3DIbntYBeNjy1XdXXXXyVXa-1915-1001.png)

##### Inspector功能
> Inspector功能可查看页面的VDOM/Native Tree结构

注：如不需要此功能尽量保持关闭状态，开启浏览器Inspector界面会增加大量页面通讯，较为影响性能。

![inspectors-one](https://img.alicdn.com/tfs/TB166B8bhGYBuNjy0FnXXX5lpXa-2876-1652.png)

![inspectors-two](https://img.alicdn.com/tfs/TB11kN2beuSBuNjy1XcXXcYjFXa-2872-1636.png)

##### JS Debug功能
> JS Debug功能可对weex页面中的Jsbundle进行调试。

![js-debug](https://img.alicdn.com/tfs/TB1b5J2beuSBuNjy1XcXXcYjFXa-2880-1648.png)


##### Network功能
> Network功能可以收集weex应用中的网络请求信息。

![network](https://img.alicdn.com/tfs/TB126JNbbGYBuNjy0FoXXciBFXa-2868-1642.png)


##### LogLevel和ElementMode功能
> LogLevel和ElementMode功能用于调整调试工具的输出配置。

LogLevel分别有 debug/info/warn/log/error五个log等级，切换可输出不同等级的log信息  
ElementMode可以切换Element标签中Domtree显示模式，下图为vdom显示界面，可从标签中看到详细的数据结构：  
![loglevel-elementMode](https://img.alicdn.com/tfs/TB1qzrObntYBeNjy1XdXXXXyVXa-2872-1636.png)


##### Prophet功能（加载时序图）
> Prophet功能用于查看weex的加载时序图和页面性能指标。

点击右上角Prophet即可查看时序图(iOS暂不支持，性能数据可在log的performance中查看)，如下：  
![prophet](https://img.alicdn.com/tfs/TB1E4rObntYBeNjy1XdXXXXyVXa-2852-1626.png)


#### 集成devtool工具
* Android
    * 查看文档 [Weex devtools (Android)](../../references/advanced/integrate-devtool-to-android.html), 它会引导你一步一步配置和使用它。
* iOS
    * 查看文档 [Weex devtools (iOS)](../../references/advanced/integrate-devtool-to-ios.html), 它会引导你一步一步配置和使用它。
