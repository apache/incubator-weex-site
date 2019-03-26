# 介绍

## 功能

- 创建Weex项目.
- 支持在VSCode对Weex的语法支持.
- 检查iOS和Android开发环境.
- 通过VSCode启动Weex调试工具.
- 在热更新模式下启动Android及iOS工程.

VSCode拓展包包含下面的包:

- [weex-new-project](#weex-new-project) - 用于在VSCode中创建Weex项目.

- [weex-lang](#weex-lang) - 用于在VSCode中对最新的Weex语法进行支持.

- [weex-doctor](#weex-doctor) - 用于检查iOS和Android本地开发环境.

- [weex-debugger](#weex-debugger) - 用于在VSCode中启动Weex调试工具.

- [weex-run](#weex-run) - 用于在热更新模式下启动Android及iOS工程.

你可以通过安装 `vscode-weex` 拓展来安装上面的所有包。

## 安装

在 VSCode 拓展面板搜索 `vscode-weex`。

## 拓展包

### weex-new-project

VSCode环境中创建Weex工程。

#### 创建Weex工程

##### 如何使用

1. 打开VSCode, 输入 <kbd>CMD</kbd> + <kbd>SHIFT</kbd> + <kbd>P</kbd> or <kbd>CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>P</kbd> 打开VSCode命令行。
2. 输入 `weex new project`。
3. 输入 <kbd>Enter</kbd>, 然后选择你要创建的项目地址。

##### 截图

![Create Snapshot](https://raw.githubusercontent.com/weex-cli/vscode-weex/master/asset/new.project.gif)

#### 添加Android工程

##### 如何使用

1. 打开VSCode, 输入 <kbd>CMD</kbd> + <kbd>SHIFT</kbd> + <kbd>P</kbd> or <kbd>CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>P</kbd>打开VSCode命令行。
2. 输入 `weex platform add android project`
3. 输入 <kbd>Enter</kbd>

##### 截图

![Add android Snapshot](https://raw.githubusercontent.com/weex-cli/vscode-weex/master/asset/new.android.gif)

#### 添加iOS工程

##### 如何使用

1. 打开VSCode, 输入  <kbd>CMD</kbd> + <kbd>SHIFT</kbd> + <kbd>P</kbd> or <kbd>CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>P</kbd> to open VSCode commandline。
2. 输入 `weex platform add iOS project`。
3. 输入 <kbd>Enter</kbd>。


### weex-lang

VSCode针对Weex的语法支持。

更详细的内容查，查看: [vscode-weex-lang](https://github.com/weex-cli/vscode-weex-lang).

#### 截图

![Weex Lang Snapshot](https://raw.githubusercontent.com/weex-cli/vscode-weex/master/asset/weex.lang.gif)

### weex-doctor

VSCode针对开发环境的检查。

#### 如何使用

1. 打开VSCode，输入 <kbd>CMD</kbd> + <kbd>SHIFT</kbd> + <kbd>P</kbd> or <kbd>CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>P</kbd> to open VSCode commandline。
2. 输入 `weex doctor`。
3. 输入 <kbd>Enter</kbd>。

#### 截图

![Weex Doctor Snapshot](https://raw.githubusercontent.com/weex-cli/vscode-weex/master/asset/weex.doctor.gif)

### weex-debugger

VSCode中启动Weex调试工具。

#### 如何使用

1. 打开VSCode，输入 <kbd>CMD</kbd> + <kbd>SHIFT</kbd> + <kbd>P</kbd> or <kbd>CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>P</kbd> to open VSCode commandline.
2. 输入 `weex debug`
3. 输入 <kbd>Enter</kbd>

更多细节，查看: [weexteam/weex-debugger](https://github.com/weexteam/weex-debugger)

### weex-run

VSCode环境中运行iOS/Android/Web工程。

#### 如何使用

1. 打开通过VSCode拓展或`weex-toolkit`生成的项目.
2. 在VSCode调试面板下运行项目.
3. 你可以通过修改 `.vscode/launch.json` 进行配置.

#### 截图


#####  Web

![Run Web Snapshot](https://raw.githubusercontent.com/weex-cli/vscode-weex/master/asset/run.web.gif)

##### iOS

![Run iOS Snapshot](https://raw.githubusercontent.com/weex-cli/vscode-weex/master/asset/run.ios.gif)

##### 结果

![Run iOS Result Snapshot](https://raw.githubusercontent.com/weex-cli/vscode-weex/master/asset/run.ios.result.gif)

##### Android

![Run Android Snapshot](https://raw.githubusercontent.com/weex-cli/vscode-weex/master/asset/run.android.gif)

##### 结果

![Run Android ResultSnapshot](https://raw.githubusercontent.com/weex-cli/vscode-weex/master/asset/run.android.result.gif)


## 提示

* 在运行iOS或者Android项目前请确保你添加可对应工程 （路径与 `.vscode/launch.json`中的`projectPath`值保持一致）你可以通过使用 [weex-new-project](#weex-new-project) 来添加客户端工程。

* 如果运行失败了，你可以通过 [weex-doctor](#weex-doctor) 检查一下你的本地开发环境。

* iOS环境依赖`XCode`，安装后请打开`XCode`以便完成后续的初始化工作。

* Android环境依赖`Android studio`, `Java SDK 1.8` (Windows需要设置Java的环境路径，[教程](https://developer.android.com/studio/install?hl=zh-cn)), `Android SDK Platform 26` (通过Android studio安装), `Android SDK Build-Tools 26` (通过Android studio安装), `Android virtual device` (通过Android studio安装)

* VSCode中进行代码断点调试目前还未支持

## 问题

- [weex-cli/vscode-weex/issues](https://github.com/weex-cli/vscode-weex/issues)
