# 概述

WEEX Android平台,各种异常错误码的含义。


# 公共错误

## 降级类

|code|Android|iOS|原因|解决方案|
|:---|:---|:---|:---|:---|
|-1000|✓|✓|异常降级|查看error msg，fix|
|-1001|✓|:|创建instnacejs错误|查看errmsg，fix|
|-1003|✓|✓|bundle content-length 校验失败|检查服务端下发bundle|
|-1004|✓|✓|http header的Content-Type 不合法，必须是application/javascript|服务端返回异常|
|-1005|✓|✓|其它原因|查看errormsg fix|
|-1008|:|✓|bundle下载异常|查看|


## js错误

|code|Android|iOS|原因|解决方案|
|:---|:---|:---|:---|:---|
|-2013|✓|✓|js执行错误|查看error stack，fix|
|-9801|✓|✓|内存泄漏, jsBundle的头部bundletype不对，正确的应该是`// { "framework": "vue/rax"} `|重新打包|


## 下载异常


|code|Android|iOS|原因|解决方案|
|:---|:---|:---|:---|:---|
|-9201|✓|:|bundle下载失败|查看error msg，fix |


## 白屏异常

|code|Android|iOS|原因|解决方案|
|:---|:---|:---|:---|:---|
|-9700|✓|✓|js错误导致白屏|查看error msg，fix|



# 平台特殊


## Android


- 错误码：-2001
	- 说明：load so 失败，sdk初始化失败
- 错误码：-2111
	- 说明：jsc重启
- 错误码：-2112 
	- 说明：jsc进程Crash
- 错误码：9000
	 - 说明：sdk初始化失败
- 错误码：-9003
	- 说明：jsfm 初始化失败
- 错误码：-9610
	- 说明：callNativeModule 时，参数为空 （instanceid、args）












