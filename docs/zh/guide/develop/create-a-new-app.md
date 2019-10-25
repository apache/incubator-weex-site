# 创建一个 App

> 以下步骤假设您已经了解了 Node.js 和 npm 的基本知识。如果对它们不熟悉，可以访问 [https://docs.npmjs.com/](https://docs.npmjs.com/) 来了解更多关于 npm 的用法。

Weex 提供了一个命令行工具 [weex-cli](./weex_cli.html) 来帮助开发者使用 Weex。它可以用来快速创建一个空项目、初始化 iOS 和 Android 开发环境、调试、安装插件等操作。

目前 `weex-cli` 只支持创建 Vue.js 的项目。创建 Rax 的项目可以使用 `rax-cli`，参考 [Rax 的官方网站](https://alibaba.github.io/rax/) 了解其用法。

::: tip
Rax CLI 是三方插件, 不由 Apache Weex 开发或维护。
:::

## 初始化

请确保你已经安装了 [Node.js](https://nodejs.org/)，然后全局安装 `weex-cli`。

```bash
npm install weex-toolkit -g
```

这条命令会向你命令行环境中注册一个 `weex` 命令。你可以用 `weex create` 命令来创建一个空的模板项目：

```bash
weex create awesome-app
```

命令执行完以后，在当前目录的 `awesome-app` 文件夹里就有了一个空的 **Weex + Vue.js** 项目。

## 开发

下一步就是进入刚刚创建的文件夹，并且安装依赖，然后执行 `npm start`：

```bash
cd awesome-app
npm install
npm start
```

然后工具会启动一个本地的 web 服务，监听 `8081` 端口。你可以打开 `http://localhost:8081` 查看页面在 Web 下的渲染效果。 源代码在 `src/` 目录中，你可以像一个普通的 Vue.js 项目一样来开发.

![Preview](../../guide/images/toolkit-preview.png)

除此之外，你还可以打开 `http://localhost:8081/preview.html` 开启一个预览页面，它会把 web 端的页面放在一个 iframe 中渲染，而且在右侧生成一个二维码。用 [Weex playground app](/zh/tools/playground.html) 扫描这个二维码可以看到页面在手机上渲染的真实效果。

## 编译和运行

默认情况下 `weex create` 命令并不初始化 iOS 和 Android 项目，你可以通过执行 `weex platform add` 来添加特定平台的项目。

```bash
weex platform add ios
weex platform add android
```

由于网络环境的不同，安装过程可能需要一些时间，请耐心等待。如果安装失败，请确保自己的网络环境畅通。

为了能在本地机器上打开 Android 和 iOS 项目，你应该配置好客户端的开发环境。对于 iOS，你应该安装并且配置好 [Xcode](https://developer.apple.com/xcode/)。对于 Android，你应该安装并且配置好 [Android Studio](https://developer.android.com/studio/index.html)。当开发环境准备就绪后，运行下面的命令，可以在模拟器或真实设备上启动应用：

```bash
weex run ios
weex run android
weex run web
```

## 调试

`weex-toolkit` 还提供了强大的调试功能，只需要执行：

```bash
weex debug
```

这条命令会启动一个调试服务，并且在 Chrome （目前只支持基于 V8 引擎的桌面浏览器） 中打开调试页面。详细用法请参考 [weex-toolkit 的文档](./weex_cli.html)。