# Guide

ErrorCode in WEEX 

# Common Error

## Degrade


|code|Android|iOS|reason|soultion|
|:---|:---|:---|:---|:---|
|-1000|✓|✓|degrade cause exception|check errmsg，fix|
|-1001|✓|:|create instance failed|check errmsg，fix|
|-1003|✓|✓|bundle content-length check failed|check the bundle sent by server|
|-1004|✓|✓|http header Content-Type check failed，must be application/javascript|check server response|
|-1005|✓|✓|other reason|check errormsg fix|
|-1008|:|✓|bundle downLoad failed|check errormsg|


## JS Exception

|code|Android|iOS| reason |soultion|
|:---|:---|:---|:---|:---|
|-2013|✓|✓|js exception|check js error stack|
|-9801|✓|✓|memory leak, jsBundle's bundletype error，should be`// { "framework": "vue/rax"} `|repackage bundle|


## DownLoad Error


|code|Android|iOS|reason| soultion |
|:---|:---|:---|:---|:---|
|-9201|✓|:|bundle download faild|check error msg|


## WhiteScreen Exception

|code|Android|iOS|reasom| soultion |
|:---|:---|:---|:---|:---|
|-9700|✓|✓|white screen cause js exception |check error msg，fix|



# Plantform


## Android


native logic，see error msg.

- code: -1012
	- description: jsfm init failed cause params is null
- code: -2001
	- description: load so failed
- code: -2112 
	- description: weexjscCrash
- code: -9000
	 - description: sdk init failed
- code: -9003
	- description: jsfm init failed
- code: -9610
	- description: when call Native，params is null（instanceid、args）

