# 介绍

::: warning 警告
这份文档是对应 `weex-toolkit` **2.x** 版本的。老版本的 `weex-toolkit` 文档请移步[这里](https://github.com/weexteam/weex-toolkit/blob/v1.0/README.md)。
:::

[Weex Toolkit](https://github.com/weexteam/weex-toolkit) 致力于将 Weex 生态中的工具基础标准化。它确保了各种构建工具能够基于智能的默认配置即可平稳衔接，这样你可以专注在撰写应用上，而不必花好几天去纠结配置的问题。

## 系统组件

[Weex Toolkit](https://github.com/weexteam/weex-toolkit) 在新版本中将各个功能模块拆分成了独立的几个部分，如果你看到我们的[源代码](https://github.com/weexteam/weex-toolkit/tree/master/packages/%40weex)，你会发现我们在仓库中通过[Lerna](https://lernajs.io/)管理了多个单独发布的包，提供如下功能模块：

- `@weex-cli/core` 内核模块用于模块调用及升级管理，该内核：
  - 可升级；
  - 可以通过插件及扩展进行能力定制；
  - 提供全局可配置的文件；
- `@weex-cli/generator` 模块快速搭建交互式的项目脚手架。
- `@weex-cli/compile` 模块快速零配置编译工程文件。
- `@weex-cli/preview` 模块快速零预览Weex页面。
- `@weex-cli/debug` 模块对Weex页面进行编译调试。
- `@weex-cli/doctor` 模块快速检查用户本地开发环境。
- `@weex-cli/lint` 模块对本地`.vue`文件进行质量诊断。
- `@weex-cli/preview` 模块快速零预览Weex页面。
- `@weex-cli/device` 模块快速管理用户本地设备。
- `@weex-cli/run` 模块快速运行`iOS/Android/Web`工程。

# 如何使用

::: warning 警告
如果你本地没有安装 node.js 你可以前往[Nodejs 官网](https://nodejs.org/en/)下载安装, 并确保你的 node 版本是>=7.6.0，你可以使用 [n](https://github.com/tj/n) 来进行 node 的版本管理。
:::

## 安装

如果你安装的过程中遇到了问题，你可以在[这里](https://github.com/weexteam/weex-toolkit/issues)进行问题搜索及反馈。

``` bash
$ npm install weex-toolkit@alpha -g
```

## 命令

### 创建工程

```bash
# 从官方模板中创建项目
$ weex create my-project
```

`@weex-cli/generator` 模块使用 [`download-git-repo`](https://github.com/flipxfx/download-git-repo) 去下载模板文件. `download-git-repo` 工具允许你指定特定的分支及远程仓库地址进行项目下载，指定分支通过 (`#`) 符号进行分隔.

下载特定分支下的模板格式如下：
```bash
$ weex create '<template-name>#<branch-name>' <project-name>
```

例如：

```bash
$ weex create weex-templates/webpack#v1.0 my-project
```

该命令将会通过[weex-templates/webpack](https://github.com/weex-templates/webpack/tree/v1.0)项目的`v1.0`分支进行项目初始化。

你可以从官方模板或者远程源创建项目模板，也可以创建你自己的`weex`项目模板，更多细节你可以查看[如何创建你自己的模板](https://github.com/weex-templates/How-to-create-your-own-template).

### 编译页面

`@weex-cli/compile` 模块提供对 Weex 项目中 `.vue` 文件的编译能力，你可以在官方项目中使用，也可以直接对单个`.vue`文件进行零配置的沙箱编译，使用方法如下：

```bash
$ weex compile [资源文件] [产物地址]  <options>
```

例如：

```bash
$ weex compile src build
```

或

```bash
$ weex compile src/index.vue build
```

#### 选项

| 选项        | 描述    |
| --------   | :-----   |
|`-w, --watch`        | 监听文件改动并实时编译 [默认： `true`]|
|`-d,--devtool [devtool]`        |设置webpack编译的devtool选项|
|`-e,--ext [ext]`        | 设置默认编译文件 [默认： `.vue`] |
|`-m, --min`| 对产物进行代码混淆及压缩 [默认： `false`]|
|`-c, --config`| 传入webpack配置文件 [默认： `false`]|
|`-b, --base`| 设置基础路径 [默认： `process.cwd()`]|

### 预览页面

`@weex-cli/preview` 模块提供对 Weex 项目中 `.vue` 文件的编译及预览能力，你可以在官方项目中使用，也可以直接对单个`.vue`文件进行零配置的沙箱预览，使用方法如下：

``` bash
$ weex preview [file | folder] <options>
```

浏览器会自动得打开预览页面并且你可以看到你的weex页面的布局和效果。如果你在你的设备上安装了[Weex Playground App](/tools/)，你还可以通过扫描页面上的二维码来查看页面。

使用下面的命令，你将可以预览整个文件夹中的`.vue`文件

``` bash
$ weex src --entry src/foo.vue
```

你需要指定要预览的文件夹路径以及入口文件（通过`--entry`传入）。

#### 选项

| 选项        | 描述    |
| --------   | :-----   |
|`-d,--devtool [devtool]`        |设置webpack编译的devtool选项|
|`-m, --min`| 对产物进行代码混淆及压缩 [默认： `false`]|
|`-c, --config`| 传入webpack配置文件 [默认： `false`]|
|`-b, --base`| 设置基础路径 [默认： `process.cwd()`]|

### 添加iOS/Android工程

`@weex-cli/generator` 模块提供添加添加Weex官方iOS/Android工程功能。

使用`weex platform [add|remove] [ios|android]`命令可以添加或移除`iOS/Android`项目模板。

例子：

``` bash
$ weex platform add ios
$ weex platform remove ios
```

该命令仅在 `weex` 官方项目中有效，请注意项目结构，可以使用 `weex platform list`来查看你的项目中支持的平台。

### 运行iOS/Android工程

`@weex-cli/run` 模块提供添加运行Weex官方iOS/Android工程功能，你可以通过如下命令使用：

``` bash
# 运行 iOS 模拟器预览
$ weex run ios
# 运行 Android 模拟器/真机预览
$ weex run android
# 运行 Web 端预览
$ weex run web
```

### 调试页面

`@weex-cli/debug` 模块提供对Weex页面的调试能力，可使用如下命令启动：

``` bash
$ weex debug [we_file|bundles_dir] [options]
```

#### 选项

| 选项        | 描述    |
| --------   | :-----   |
|`-p, --port [port]`| 设置调试服务器的端口，[默认：`8088`]|
|`--manual`|开启该选项后将不会自动打开浏览器，[默认：`false`]|
|`--channelid`|指定调试通道ID|
|`--remote-debug-port [port]`|设置调试服务器端口号，[默认：`9222`]|



#### 如何集成调试工具到自己的APP

参考文档：
- [1] [集成Weex调试工具(Android)](zh/guide/debug/integrate-devtool-to-android.html)
- [2] [集成Weex调试工具 (iOS)](zh/guide/debug/integrate-devtool-to-ios.html)


### 代码质量检查

`@weex-cli/lint` 模块提供对Weex代码质量校验功能，可使用如下命令启动：

```base
$ weex lint [file | folder] <options>
```

#### 选项

`@weex-cli/lint` 内置 `eslint` 模块用于进行代码质量校验，选项可参考 [ESLint CLI](https://eslint.org/docs/user-guide/command-line-interface)。

如果想在你的工程内加入 `weex` 代码质量校验，你也可通过添加eslint插件[eslint-plugin-weex](https://www.npmjs.com/package/eslint-plugin-weex)的方式使用。


### 开发环境检查

`@weex-cli/doctor` 模块提供对本地开发环境的检查，可使用如下命令启动：

```base
$ weex doctor
```

该命令会检查你的本地开发环境，你可根据提示对你的开发环境进行调整，以便进行weex页面的开发工作。
