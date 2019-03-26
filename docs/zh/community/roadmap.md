# Weex Project Roadmap

> 这篇文章主要介绍我们目前正在做和计划要做的事情, 我们希望从社区收到大家的反馈来让我们能够更好的了解大家的需求, 我们会根据您提的需求来适当的调整计划.

## WeexCore
### JS Runtime
#### v0.21

* 全新的 WeexCore 3.0 架构, 支持更多的平台, ios, Android.
* 使用 JavaScriptCore 标准的 api 代替原有的源码接入, 独立的 JSRuntime, 使 ios 和 Android 都可以运行在上面.
* 更高性能的 C++ Dom API.

### Layout
#### v0.21
*  为 Layout 引擎增加更多的属性支持
*  为 Layout 引擎添加更多的测试用例.
### Render
#### v0.21
## 工具

今年我们将发布 Weex-toolkit 的 2.0.0 版本, 主要包含一下新功能

- 无缝的安装和升级体验.
- 更好的单元测试支持
- Visual Studio Code  IDE插件支持 编译/运行/调试.
- 拆成多包模式, 可以在服务端复用.

另外, 我们添加了一些新功能和优化来支持子模块, 例如 weex-debugger,weexpack 等等.

所有的计划可以参考这里 [milestones](https://github.com/weexteam/weex-toolkit/milestones).

### Community
#### 0.22
* Github commit/PR 发送将发送至`commit@weex.incubator.apache.org`而不是`dev@weex.incubator.apache.org`
* Layout 项目的代码设计和开发流程迁移到 [Github Project](https://github.com/apache/incubator-weex/projects) 中。