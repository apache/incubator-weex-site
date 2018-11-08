# EMAS Studio 使用说明文档

## 下载
<div>
  <img src="/emas-studio/logo.png" width="100px" />
  <div><a href="/tool/">官网地址</a></div>
</div> 

欢迎使用 EMAS Studio。
我们为weex开发者提供更专业的一站式开发工具。从项目创建到编码、预览、调试，带给你沉浸式的开发体验。

## 安装

### macOS
 1. 下载对应 macOS 压缩包后，双击解压，将EMAS Studio.App拖至 `应用程序`。
 2. 双击运行程序。  
 	2.1 如果出现下图情况，并非你安装的软件已损坏，而是Mac系统的安全设置问题。可以修改系统配置解决，这里先点击 **取消**。
  <div>
    <img src="/emas-studio/install-mac-step1.png" width="50%" />
  </div>
  下图也是类似原因。
  <div>
    <img src="/emas-studio/install-mac-step1-2.jpg" width="50%" />
  </div> 
 	2.2 打开`系统偏好设置` -> `安全性与隐私`
  <div>
    <img src="/emas-studio/install-mac-step2.png" width="50%" />
  </div> 
	2.3 点击锁按钮，输入密码，选择 `任何来源`
  <div>
    <img src="/emas-studio/install-mac-step3.png" width="50%" />
  </div> 
	2.4 如果没看见 任何来源 选项，可以打开终端，输入命令`sudo spctl --master-disable` 按回车。再次回到隐私页面即可看见 `任何来源` 选项。
 3. 再次运行程序，选择 **打开**。
  <div>
    <img src="/emas-studio/install-mac-step4.png" width="50%" />
  </div>  

### windows
这里以win10举例，值得注意的是，我们只提供64位的windows版本。
1. 下载对应的 windows 安装包，双击开始安装。弹出以下选择框，选择 **是** 。
  <div>
    <img src="/emas-studio/install-win-step1.png" width="40%" />
  </div> 
2. 后续过程逐步点击 `下一步`，如同你安装其他软件一样，安装过程请稍等片刻。
  <div>
    <img src="/emas-studio/install-win-step2.png" width="40%" />
  </div> 
  <br>
  <div>
    <img src="/emas-studio/install-win-step3.png" width="40%" />
  </div> 
3. 安装完成后，点击 `完成` 结束。
  <div>
    <img src="/emas-studio/install-win-step4.png" width="40%" />
  </div> 
4. 后续打开IDE后，如果弹出防火墙提示，请点击 `允许访问`。

### 依赖
因为Weex项目的构建依赖Node服务，所以你的PC上必须安装 Node.js。
安装 Node.js 方式多种多样，最简单的方式是在 [Node.js官网](https://nodejs.org/en/) 下载可执行程序直接安装即可。通常，安装了 Node.js 环境，npm 包管理工具也随之安装了。

安装完成后，可以使用以下命令检测是否安装成功：
```
$ node -v
v8.11.3
$ npm -v
6.2.0
```

## 界面
EMAS Studio是基于Visual Studio Code定制开发的，因此保持了其原有的界面风格和功能。在此基础上，我们增加了Weex代码预览窗口和调试窗口，具体使用可继续参看本说明。
  <div>
    <img src="/emas-studio/board.png" width="80%" />
  </div> 
### 语言设置
如果你喜欢英文的开发环境，可以通过以下设置来完成。
1. 快捷键`shift`+`command`+`p`，输入`language`，选择 `配置语言`。
  <div>
    <img src="/emas-studio/lang-setting1.png" width="50%" />
  </div> 
2. 把 `locale` 的值改成 `en` 并保存。重启IDE后即切换成英文。值得注意的是，我们定制开发的功能仅仅支持中文和英文，其他语言暂不支持。
  <div>
    <img src="/emas-studio/lang-setting2.png" width="50%" />
  </div> 


## 新建
我们制作了一个标准、完整的Weex项目工程（Vue DSL），可以供你参考。通过以下步骤来新建一个Weex项目。
1. 点击 `新建WEEX项目` ，也可在 `文件`选项中选择 `新建WEEX项目` 。
  <div>
    <img src="/emas-studio/create-1.png" width="30%" />
  </div> 
2. 输入项目名称，选择项目路径。点击 `确认` ，即可完成创建。
  <div>
    <img src="/emas-studio/create-2.png" width="50%" />
  </div> 
3. 项目创建后会自动帮你安装所需的node_modules依赖。
  <div>
    <img src="/emas-studio/create-3.png" width="50%" />
  </div> 
4. 打开 src 目录，参考代码的组织结构，开始你的 WEEX 开发。
  <div>
    <img src="/emas-studio/create-4.png" width="30%" />
  </div> 


## 编码
打开任何一个 `vue` 文件，可以通过安装默认推荐的	`Vetur` 插件（后续计划推出我们自己实现的插件）来实现语法提示和语法高亮等功能。当然，你也可以安装任何你喜欢的插件来满足你自己的编码体验，这与你使用Visual Studio Code完全一样。
  <div>
    <img src="/emas-studio/code.png" width="80%" />
  </div>  

## 预览	
点击预览窗口的绿色 `启动` 按钮（启动后变成 `重启` 状态），即会编译工程，编译时长与工程复杂度相关，同时会在本地启动一个预览服务。
  <div>
    <img src="/emas-studio/preview1.png" width="50%" />
  </div> 

::: warning 注意
由于点击预览按钮执行的script是 `npm run ide:preview` ，如需支持非EMAS Studio新建的项目工程，请在 `package.json` 中新增该 script，例：`"ide:preview" : "npm run dev"`。如果你不太了解这些脚本配置，请参考EMAS Studio新建的项目工程中的相关配置。
:::

### 实时预览
1. 可以通过 `选择器` 来选择预览任何一个项目中的页面，同时也可以按 `机型` 切换不同分辨率的屏幕，以便查看代码的视觉兼容性。这里的预览本质上是web预览。
  <div>
    <img src="/emas-studio/preview2.png" width="50%" />
  </div> 
2. `前进`、`后退`、`刷新`，这三个基本操作，可以通过相应的按钮来实现。
  <div>
    <img src="/emas-studio/preview3.png" width="50%" />
  </div> 
3. 预览窗口就是当前选中页面的效果，页面中的点击均可以响应。值得注意的是，此为web模拟预览，如果代码中用到了一些不支持web端的组件，则无法预览。这种情况可以真机预览，请继续往下阅读。
  <div>
    <img src="/emas-studio/preview4.png" width="30%" />
  </div> 
4. 如果当前页面需要通过url传递一些参数，可以在这里 `输入`，请注意书写格式。`回车` 后，会刷新页面，传入了输入的参数，可以验证你代码的正确性。点击 `链接` 按钮，会复制完整的url到粘贴板，你可以将这个链接发给任何和你在同一网络下的需要预览的同事（比如项目经理、产品经理）。
  <div>
    <img src="/emas-studio/preview5.png" width="40%" />
  </div> 
5. 当你修改代码并保存时，会自动编译修改的文件并刷新该页面的预览效果。

### 真机预览
当你在web预览下基本完成了页面的视觉还原工作，为了保障在客户端中的视觉表现，可以进行真机预览。使用你自己的集成了Weex SDK的App扫描当前页面的二维码即可。如果你暂时没有自己的App，可以使用Weex Playground、EMAS组件、或者手机淘宝等已经集成了Weex的App来扫码预览。请务必保证你的PC和手机在同一网络下。
  <div>
    <img src="/emas-studio/preview6.png" width="40%" />
  </div> 

## 调试
如果需要断点调试，可以在任何需要的地方写上 `debugger` 命令，当执行到此处的时候，会暂停在此处。在面板上选择 `网页调试` 和  `Web devtool`，运行时的页面元素、网络请求、Console输出，均可以查看，就和在Chrome中操作几乎一致。
  <div>
    <img src="/emas-studio/debugger1.png" width="60%" />
  </div> 

### web调试
在预览窗口选择该页面，执行会触发断点的操作，就会暂停在断点处。然后，你可以单步调试、查看变量值等常规的debug手段。
  <div>
    <img src="/emas-studio/debugger2.png" width="80%" />
  </div> 

### 真机调试
1. 点击预览窗口下方的 `真机调试` 启动按钮，IDE会自动呼起 `Weex devtool`面板，且为待连接状态。 
  <div>
    <img src="/emas-studio/debugger3.png" width="30%" />
  </div> 
2. 首先扫二维码连接调试服务，成功后即会切换到连接成功状态。
  <div>
    <img src="/emas-studio/debugger4.png" width="50%" />
  </div>  
  连接成功状态：
  <div>
    <img src="/emas-studio/debugger5.png" width="50%" />
  </div>  
3. 然后扫描需要调试的页面的二维码，执行会触发断点的操作，同样会暂停在断点处。后续debug操作如同web调试一样。
  <div>
    <img src="/emas-studio/debugger6.png" width="50%" />
  </div> 

## FAQ
1. 问题： 用手机Weex Playground App扫码 weex devtool的连接调试服务二维码没有反应?  
回答： 1. 确认手机和电脑在同一局域网 2. 调试端口可能被防火墙拦截，尝试关闭系统防火墙

2. 问题： 正在本地开发的页面，如何给PD、PM实时预览下?  
回答： 可以点击预览地址区域的复制按钮，将url发给相关同学，他在浏览器打开即可。也可以将二维码发给他，用Playground或者你项目的App扫码预览。