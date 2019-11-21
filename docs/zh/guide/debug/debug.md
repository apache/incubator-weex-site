# 调试

:::danger
[weex-toolkit](https://github.com/weexteam/weex-toolkit) 是三方插件, 不由 Apache Weex 开发或维护。
:::

本文档主要演示如何使用 `weex-toolkit` 中内置的调试工具进行代码调试。

## 安装

首先需要通过 `npm` 或 `yarn` 安装 `weex-toolkit` 工具

```
$ npm i weex-toolkit@beta -g
$ weex -v // 检查是否安装成功
```

## 运行

安装完成后，运行 `weex debug` 命令启动调试控制台，运行后程序将会自动打开如下界面:

![控制台界面](https://img.alicdn.com/tfs/TB1lDgKIZfpK1RjSZFOXXa6nFXa-1150-802.png)

如果你有需要编译的页面，你也可以通过 `weex debug [ folder | file ]` 命令进行编译，如运行 `weex debug src` ，编译后的页面将会在 `页面` 这个标签下显示，如图所示：

![编译页面](https://img.alicdn.com/tfs/TB1n4cMI4jaK1RjSZFAXXbdLFXa-747-532.png)

## 开始调试

::: tip

在调试开始前，请确保安装了调试应用的手机与PC处于同一局域网下，同时关闭VPN等代理设置，否则将无法正常进行调试，同时，我们在使用功能时，尽量保证其他功能为关闭状态，如在使用`JS调试`功能时将无关的`网络审查`功能关闭，将会有更好的开发体验。

:::

调试需要使用集成了Weex调试工具的APP进行扫码调试，相关文档可参考：

[1] [Android Weex Detool集成文档](./integrate-devtool-to-android.html)。
</br>
[2] [iOS Weex Detool集成文档](./integrate-devtool-to-ios.html)。

你也可以使用Weex官方提供的Playground App进行代码调试，下载地址见：[Weex Playground](http://weex.apache.org/zh/guide/playground.html)。

回到调试二维码页面，用应用的扫码功能进行扫码，即可进入调试控制台，如图所示：

![调试控制台](https://img.alicdn.com/tfs/TB1baQ0I4naK1RjSZFBXXcW7VXa-1915-1000.png)

初次进入调试界面会有提示界面引导你了解调试中会使用的相关功能，对于首次使用调试工具的开发者建议完整看完所有提示。

### JS调试

开启`JS调试`功能即可进入Weex代码调试模式，如图所示：

![JS调试](https://img.alicdn.com/tfs/TB1xs33I5LaK1RjSZFxXXamPFXa-1915-1001.png)

### 日志等级

通过控制台及日志等级选项对日志进行筛选过滤，保留你关注的日志内容，如图所示：

![日志等级](https://img.alicdn.com/tfs/TB1aDEzI9zqK1RjSZFLXXcn2XXa-1912-995.png)

### 网络审查

开启`网络审查`功能可以查看应用的网络请求信息，对页面的请求进行有效的分析，如图所示：
![网络审查](https://img.alicdn.com/tfs/TB1Gu3FIVzqK1RjSZSgXXcpAVXa-1905-992.png)

### 节点审查

::: tip
节点审查模式下会发送大量的页面信息，默认情况下为开启状态，在页面较为复杂的情况下，我们一般建议通过重置台的![预览](https://img.alicdn.com/tfs/TB1S4RVJkvoK1RjSZFwXXciCFXa-30-24.png)按钮关闭该功能，否则可能会影响到JS调试相关功能的速度。
::: 

通过选择`切换视图`选项可切换当前视图的显示情况，可对页面的视图层级进行对应分析，如图所示：

![节点审查](https://img.alicdn.com/tfs/TB1endjb_Zmx1VjSZFGXXax2XXa-1916-995.png)

### 拓展功能

以下拓展功能需在`JS调试`功能开启并且处于Weex页面内才可使用。

#### 快速导航

![快速导航](https://img.alicdn.com/tfs/TB1jYBYJcbpK1RjSZFyXXX_qFXa-1000-562.gif)

#### 文件替换

点击控制台顶部的 `环境设置` 菜单，可针对weex页面运行的依赖文件进行修改替换，修改完成后依次点击`生成文件` -> `更改设置` 即可对运行环境进行替换。 

![环境设置](https://img.alicdn.com/tfs/TB1F0tWJXzqK1RjSZFCXXbbxVXa-1000-562.gif)

如果你在使用过程中遇到了什么问题，可以到[这里](https://github.com/weexteam/weex-toolkit/issues/new?labels=@weex-cli/debug)提交isssue进行反馈, 同时你也可以在[这里](https://github.com/weexteam/weex-toolkit/labels/%40weex-cli%2Fdebug)搜索是否有已解决的方案。