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
如果你本地没有安装 node.js 你可以前往[官网](https://nodejs.org/en/)下载安装。

* 请确保你的 node 版本是>=6，你可以使用 [n](https://github.com/tj/n) 来进行 node 的版本管理。

中国用户如果npm遭遇网络问题，可以使用淘宝的 [npm镜像](https://npm.taobao.org/)或通过[nrm](https://www.npmjs.com/package/nrm)工具切换你的npm镜像：

``` bash
$ npm install weex-toolkit -g --registry=https://registry.npm.taobao.org
// 或者
$ nrm use taobao
$ npm install weex-toolkit -g
```

如果你安装的过程中遇到了问题，你可以在[weex-toolkit问题汇总](https://github.com/weexteam/weex-toolkit#faq)中找到解决方法或者在[weex-toolkit issues](https://github.com/weexteam/weex-toolkit/issues)中与我们讨论。


## 命令

### create
```bash
$ weex create awesome-project
```
该命令用于创建一个新的weex项目。命令运行后，你可以找到`awesome-project`目录，里面有一些Weex模板,里面提供了一些内置的脚本

- `build`: 用于打包源文件生成JS bundle
- `dev`: 运行监听模式的webpack打包脚本
- `serve`: 启动热更新静态服务器

你需要在运行`npm start`前运行一下`npm i`来安装项目依赖，之后浏览器就会自动打开开发页面。

### preview

weex-toolkit supports previewing your Weex file(`.we` or `.vue`) in a watch mode. You only need specify your file path.
weex-toolkit工具支持对你的Weex文件（`.vue`)在监听模式下进行预览，你只需要指定一下你的项目路径。

``` bash
$ weex src/foo.vue
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
|`-w, --watch`        | watch we file changes auto build them and refresh debugger page! [default `true`]|
|`-d,--devtool [devtool]`        |set webpack devtool mode|
|`-e,--ext [ext]`        | set enabled extname for compiler default is vue|we|
|`-m, --min`| set jsbundle uglify or not. [default `false`]|

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
|`-V, --verbose`       | display logs of debugger server|
|`-v, --version`       | display version|
|`-p, --port [port]`   | set debugger server port|
|`-e, --entry [entry]` | set the entry bundlejs path when you specific the bundle server root path|
|`-m, --mode [mode]`   | set build mode [transformer|loader]|
|`-w, --watch`        | watch we file changes auto build them and refresh debugger page! [default `true`]|
|`--ip [ip]`|set the host ip of debugger server|
|`--loglevel [loglevel]`| set log level `silent|error|warn|info|log|debug`|
|`--min`| set jsbundle uglify or not. [default `false`]|
|`--debug`| start with node-inspect default port is 9331|

#### 特性

##### 连接设备

```
$ weex debug
```

这个命令将启动调试服务器并启动一个打开“DeviceList”页面的chrome。
这个页面会显示一个二维码，你可以使用[Playground](https://weex.apache.org/cn/playground.html)来扫描它来启动调试或者在你的应用中集成[Weex devtools](#集成devtool工具)

![devtools-main](https://img.alicdn.com/tfs/TB1xPipftfJ8KJjy0FeXXXKEXXa-2880-2314.png)

##### 调试`.vue`文件

```
$ weex debug your_weex.vue
```
这个命令会将`your_weex.vue`编译成`your_weex.js`，并根据命令启动调试服务器。
`your_weex.js`将部署在服务器上并显示在调试页面中，使用另一个二维码用于`your_weex.js`文件的调试。

![devtools-entry](https://img.alicdn.com/tfs/TB13a9Zfx6I8KJjy0FgXXXXzVXa-2880-2314.png)

##### 调试文件夹中的`.vue`文件

```
$ weex debug your/vue/path  -e index.vue
```
这个命令将编译`your/vue/path`中的每个文件，并将它们部署在捆绑服务器上，新的文件将映射到`http://localhost:port/weex/`路径下，使用`-e`指定的路径作为页面的入口。

##### Inspector

 Inspector 能够用来查看 `Element` \ `NetWork` \ `Console log` \ `ScreenCast` \ `BoxModel` \ `Native View` 等。

![devtools-inspector](https://img.alicdn.com/tfs/TB1rmGMfBTH8KJjy0FiXXcRsXXa-2826-1636.png)

##### Element

![inspector-element](https://img.alicdn.com/tfs/TB1V.CJfBTH8KJjy0FiXXcRsXXa-2880-1652.png)

##### NetWork

![network](https://img.alicdn.com/tfs/TB1I.uRfwvD8KJjy0FlXXagBFXa-2840-1622.png)

##### 查看网络请求的总耗时和延时

![inspector-network](https://img.alicdn.com/tfs/TB1eKz_c5qAXuNjy1XdXXaYcVXa-2870-1650.png)

##### 查看网络请求的header和response

![inspector-network](https://img.alicdn.com/tfs/TB1eKz_c5qAXuNjy1XdXXaYcVXa-2870-1650.png)

##### 控制台

![inspector-console](https://img.alicdn.com/tfs/TB1Vt9PfwvD8KJjy0FlXXagBFXa-2880-1652.png)

##### 资源

![inspector-resource](https://img.alicdn.com/tfs/TB131eDfv2H8KJjy0FcXXaDlFXa-2872-1642.png)

#### 调试

 调试器用来调试 Weex 中的 JS 代码，能够设置断点、查看调用栈。

![devtools-debugger](https://img.alicdn.com/tfs/TB1iuS5fDnI8KJjy0FfXXcdoVXa-2816-1642.png)

##### Breakpoint and CallStack

![debugger-breakpoint](https://img.alicdn.com/tfs/TB1cV5MfxrI8KJjy0FpXXb5hVXa-2860-1644.png)


#### 集成devtool工具
* Android
    * 查看文档 [Weex devtools (Android)](../../references/advanced/integrate-devtool-to-android.html), 它会引导你一步一步配置和使用它。
* iOS
    * 查看文档 [Weex devtools (iOS)](../../references/advanced/integrate-devtool-to-ios.html), 它会引导你一步一步配置和使用它。
