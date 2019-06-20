# console-log

Your App may shield all console logs. Which makes difficult for debugging problems.
Console-log module is used to force redirect all Weex logs to console.

# API

## switchLogLevel

#### switchLogLevel(level, callback)

* **@level**, log level: off|error|warning|info|debug
* **@callback**, Callback after successfully switched level.

# Usage

Scan to open page [Log Switch](http://editor.weex.io/vue/eb6d6b27563608112a655b63ade638f0) and select log level.

On iOS, connect your device to Mac, open XCode->Window->Devices and Simulators，Open Console. Filter using "<Weex>".