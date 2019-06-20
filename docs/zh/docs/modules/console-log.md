# console-log

有些时候线上应用会屏蔽控制台日志，这对排查问题不是很方便。Console-log 模块用于强制将 Weex 日志输出到控制台。

# API

## switchLogLevel

#### switchLogLevel(level, callback)

* **@level**, 日志等级：off|error|warning|info|debug
* **@callback**, 切换成功后的回调

# 使用方法

扫码打开页面 [Log Switch](http://editor.weex.io/vue/eb6d6b27563608112a655b63ade638f0) ，选择日志等级即可。

在 iOS 平台，连接设备到 Mac，打开 XCode->Window->Devices and Simulators，Open Console。过滤“<Weex>”日志。