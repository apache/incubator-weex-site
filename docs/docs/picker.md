# picker
以下为 picker 相关的 API，用于数据选择，日期选择，时间选择。（ H5模块如需使用，请手动引入 [weex-picker组件](https://github.com/weexteam/weex-picker)）。

## API
### picker.pick(options, callback)
调用单选 picker  

options参数如下：
| 参数        | 说明          | 类型   |
| ---------- | ------------- | -----  |
| index      | 默认选中的选项 | number |
| items      | picker 数据源 | array |
| textColor   | picker中文字的颜色 | color |
| selectionColor | picker中选中item的背景色 | color |
| confirmTitle  | 确认按钮的文案 | string |
| cancelTitle   | 取消按钮的文案 | string |
| confirmTitleColor | 确认按钮的文字颜色 | color |
| cancelTitleColor | 取消按钮的文字颜色 | color |
| title   | 对话框的标题 | string |
| titleColor | 对话框标题的文字颜色 | color |
| titleBackgroundColor  | 对话框标题的背景色 | color |

`callback {function(ret)}`：执行完读取操作后的回调函数。`ret {Object}` 为 `callback` 函数的参数，有两个属性：
* `result {string}`：结果三种类型 `success`, `cancel`, `error`
* `data {number}`：选择的选项,仅成功确认时候存在

### picker.pickDate(options, callback)
调用 date picker  

options参数如下：
| 参数        | 说明          | 类型   |
| ---------- | ------------- | -----  |
| value      | 必选，date picker 选中的值，date 的字符串格式为 `yyyy-MM-dd` | string |
| max      | 可选，date 的最大值 | string |
| min   | 可选，date 的最小值 | string |

`callback {function(ret)}`：执行完读取操作后的回调函数。`ret {Object}` 为 `callback` 函数的参数，有两个属性：
* `result {string}`：结果三种类型 `success`, `cancel`, `error`
* `data {number}`：选择的值 date 的字符，格式为 yyyy-MM-dd, 仅成功确认的时候存在

### picker.pickTime(options, callback)
调用 time picker

options参数如下：
| 参数        | 说明          | 类型   |
| ---------- | ------------- | -----  |
| value      | 必选，time 格式为 `HH:mm` | string |

`callback {function(ret)}`：执行完读取操作后的回调函数。`ret {Object}` 为 `callback` 函数的参数，有两个属性：
* `result {string}`：结果三种类型 `success`, `cancel`, `error`
* `data {number}`：time 格式为 `HH:mm`, 仅成功确认的时候存在

## Demo
[基本用法](http://dotwe.org/vue/060faedd0952f518d2d5322a5fb5ea2f)
<IPhoneImg imgSrc="https://img.alicdn.com/tfs/TB1idhbogHqK1RjSZJnXXbNLpXa-544-960.gif" />