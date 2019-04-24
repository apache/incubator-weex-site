:::danger
VSCode Extension is a third party plugin, and is not developed nor maintained by Apache Weex.
:::

# Introduction

## Features

- Creating weex project.
- Weex language support for VSCode.
- Checking iOS and Android develop environment.
- Launch weex debugger terminal to debug your code.
- Runing iOS or Android project with hot reload.

The VSCode extension mainly contains the following packages:

- [weex-new-project](#weex-new-project) - used for creating weex project in VSCode.

- [weex-lang](#weex-lang) - support latest weex language for VSCode.

- [weex-doctor](#weex-doctor) - check the iOS and Android develop environment on your platform.

- [weex-debugger](#weex-debugger) - launch weex debugger terminal to debug your weex code.

- [weex-run](#weex-run) - run iOS or Android project under VSCode (support hot reload).

You can install below packages by just install the `vscode-weex` extension.

## Install

Searching `vscode-weex` on VSCode Extension panel -> Install.

## Packages

### weex-new-project

This extension is used for creating weex project under VSCode environment.

#### Create weex project

##### How to use

1. Open your VSCode, then type <kbd>CMD</kbd> + <kbd>SHIFT</kbd> + <kbd>P</kbd> or <kbd>CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>P</kbd> to open VSCode commandline.
2. Type `weex new project`.
3. Type <kbd>Enter</kbd>, then choosing a address for your project.

##### Snapshot

![Create Snapshot](https://raw.githubusercontent.com/weex-cli/vscode-weex/master/asset/new.project.gif)

#### Add android project

##### How to use

1. Open your VSCode, then type <kbd>CMD</kbd> + <kbd>SHIFT</kbd> + <kbd>P</kbd> or <kbd>CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>P</kbd> to open VSCode commandline.
2. Type `weex platform add android project`
3. Type <kbd>Enter</kbd>

##### Snapshot

![Add android Snapshot](https://raw.githubusercontent.com/weex-cli/vscode-weex/master/asset/new.android.gif)

#### Add iOS project

##### How to use

1. Open your VSCode, then type <kbd>CMD</kbd> + <kbd>SHIFT</kbd> + <kbd>P</kbd> or <kbd>CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>P</kbd> to open VSCode commandline.
2. Type `weex platform add iOS project`
3. Type <kbd>Enter</kbd>


#### weex-lang

Weex language support for VSCode.

More detail you can see: [vscode-weex-lang](https://github.com/weex-cli/vscode-weex-lang).

##### Snapshot

![Weex Lang Snapshot](https://raw.githubusercontent.com/weex-cli/vscode-weex/master/asset/weex.lang.gif)

#### weex-doctor

Extension for checking Weex develop environment. 

##### How to use

1. Open your VSCode, then type <kbd>CMD</kbd> + <kbd>SHIFT</kbd> + <kbd>P</kbd> or <kbd>CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>P</kbd> to open VSCode commandline.
2. Type `weex doctor`
3. Type <kbd>Enter</kbd>

##### Snapshot

![Weex Doctor Snapshot](https://raw.githubusercontent.com/weex-cli/vscode-weex/master/asset/weex.doctor.gif)

#### weex-debugger

Launch weex debugger terminal for VSCode.

##### How to use

1. Open your VSCode, then type <kbd>CMD</kbd> + <kbd>SHIFT</kbd> + <kbd>P</kbd> or <kbd>CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>P</kbd> to open VSCode commandline.
2. Type `weex debug`
3. Type <kbd>Enter</kbd>

More detail you can see: [weexteam/weex-debugger](https://github.com/weexteam/weex-debugger)

#### weex-run

Runing iOS/Android/Web project under the VSCode.

##### How to use

1. Open a weex project created by VSCode extension or `weex-toolkit`.
2. Run the project under the VSCode debug panel.
3. You can also edit the configuration under the `.vscode/launch.json`.

##### Snapshot


##### Web

![Run Web Snapshot](https://raw.githubusercontent.com/weex-cli/vscode-weex/master/asset/run.web.gif)

##### iOS

![Run iOS Snapshot](https://raw.githubusercontent.com/weex-cli/vscode-weex/master/asset/run.ios.gif)

##### Result

![Run iOS Result Snapshot](https://raw.githubusercontent.com/weex-cli/vscode-weex/master/asset/run.ios.result.gif)

##### Android

![Run Android Snapshot](https://raw.githubusercontent.com/weex-cli/vscode-weex/master/asset/run.android.gif)

##### Result

![Run Android ResultSnapshot](https://raw.githubusercontent.com/weex-cli/vscode-weex/master/asset/run.android.result.gif)


## Note

* Run iOS or Android APP make sure you have added native project (Path of which you `launch.json` key `projectPath` set), you can use [weex-new-project](#weex-new-project) add native project

* If the run fails, You can try to check the environment by [weex-doctor](#weex-doctor)

* iOS Environmental dependence: `XCode` and open once

* Android Environmental dependence: `Android studio`, `Java SDK 1.8` (Windows need set Java home, [guide](https://developer.android.com/studio/install?hl=zh-cn)), `Android SDK Platform 26` (Install by Android studio), `Android SDK Build-Tools 26` (Install by Android studio), `Android virtual device` (Install by Android studio)

* Debugging in the vscode editor breakpoint is not yet supported

## Issues

- [weex-cli/vscode-weex/issues](https://github.com/weex-cli/vscode-weex/issues)
