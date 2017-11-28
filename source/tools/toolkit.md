---
title: Use weex-toolkit
type: tools
order: 5.1
version: 2.1
---

# weex-toolkit

[weex-toolkit](https://github.com/weexteam/weex-toolkit) is an official command line tool to help developers to create, debug and build their Weex project.

## Install

``` bash
$ npm install -g weex-toolkit
```
You can use the `weex -v` command to confirm that the installation is successful.

If you have never installed node.js, you should go [node.js.org]( https://nodejs.org/en/) to download and install it.
* node engine version >= 6. You can try [n](https://github.com/tj/n) to manage your node versions*
If you meet some errors when installing, please go [weex-toolkit issues](https://github.com/weexteam/weex-toolkit/issues) or [weex-toolkit faq](https://github.com/weexteam/weex-toolkit#faq) to find some solution or have a discuss with us.


## Commands

### create
```bash
$ weex create awesome-project
```
Creates a new weex project. After command running, you can find `awesome-project` directory and there are some Weex templates in it.
There are some useful npm scripts you will use in the future:

- `build`: build the source code and generate the JS bundle
- `dev`: run webpack watch configuration
- `serve`: start a hot-reload web server

You need to run `npm i` before running `npm start` to install project dependencies，after that, the development page will open in the browser automatically

### preview

weex-toolkit supports previewing your Weex file(`.vue`) in a watch mode. You only need specify your file path.

``` bash
$ weex src/foo.vue
```

The browser automatically opens the preview page and you can see the layout and effects of your weex page. If you have a [Playground](https://weex.apache.org/cn/playground.html) app in your mobile devices, you can scan the QR code at the opened page.

Try the command below, you’ll preview the whole directory files.

``` bash
$ weex src --entry src/foo.vue
```

You need to specify the folder path to preview and the entry file (passed in via `--entry`).

### compile

Use `weex compile` o compile a single weex file or a weex file in an entire folder.

``` bash
$ weex compile [source] [dist]  [options]
```

#### options

| Option        | Description    | 
| --------   | :-----   |
|`-w, --watch`        | watch we file changes auto build them and refresh debugger page! [default `true`]|
|`-d,--devtool [devtool]`        |set webpack devtool mode|
|`-e,--ext [ext]`        | set enabled extname for compiler default is vue|we|
|`-m, --min`| set jsbundle uglify or not. [default `false`]|

You can use like this:

``` bash
$ weex compile src dest --devtool source-map -m
```

### platform

Use `weex platform [add|remove] [ios|android]` to add or remove ios / android project templates.

``` bash
$ weex platform add ios
$ weex platform remove ios
```
Use `weex platform list` to show what platforms your application supported.

### run

You can use `weex-toolkit` to run project on android/ios/web.

``` bash
$ weex run ios
$ weex run android
$ weex run web
```

### debug

** [Weex devtools](https://github.com/weexteam/weex-devtool) ** is a custom devtools for Weex that implements [Chrome Debugging Protocol](https://developer.chrome.com/devtools/docs/debugger-protocol), it is designed to help you quickly inspect your app and debug your JS bundle source in a Chrome web page, both android and iOS platform are supported. So you can use weex-devtools feature by weex-toolkit.

#### usage

``` bash
weex debug [we_file|bundles_dir] [options]
```

| Option        | Description    | 
| --------   | :-----   |
|`-V, --verbose`       | display logs of debugger server|
|`-v, --version`       | display version|
|`-p, --port [port]`   | set debugger server port|
|`-e, --entry [entry]` | set the entry bundlejs path when you specific the bundle server root path|
|`-m, --mode [mode]`   | set build mode [transformer|loader]|
|`-w, --watch`        | watch we file changes auto build them and refresh debugger page! [default `true`]|
|`--ip [ip]`|set the host ip of debugger server|
|`--loglevel [loglevel]`| set log level `silent|error|warn|info|log|debug`|
|`--min`| set jsbundle uglify or not. [default `false`]|
|`--debug`| start with node-inspect default port is 9331|

#### Features

##### Connect devices

```
$ weex debug
```

This command will start debug server and launch a chrome opening `DeviceList` page.
this page will display a QR code, you can use [Playground](https://weex.apache.org/cn/playground.html) scan it for starting debug or integrate [Weex devtools](#Integrate devtool) into your application.

![devtools-main](https://img.alicdn.com/tfs/TB1xPipftfJ8KJjy0FeXXXKEXXa-2880-2314.png)

##### debug with `.vue` file

```
$ weex debug your_weex.vue
```

This command will compile `your_weex.vue` to `your_weex.js`  and start the debug server as upon command.
`your_weex.js` will be deployed on the server and displayed on the debug page, using another QR code for debugging `your_weex.js` file.

![devtools-entry](https://img.alicdn.com/tfs/TB13a9Zfx6I8KJjy0FgXXXXzVXa-2880-2314.png)

##### start debugger with a directory of vue files

```
$weex debug your/vue/path  -e index.vue
```

This command will compile each of the files in `your/vue/path` and deploy them on the bundled server with the new file mapped to the path `http://localhost:port/weex/` with the `-e` designated path as the entrance to the page.

##### Inspector

 Inspector can be used to show your `Element` \ `Network` \ `Console log` \ `ScreenCast` \ `BoxModel` \ `Native View` and so on.

![devtools-inspector](https://img.alicdn.com/tfs/TB1rmGMfBTH8KJjy0FiXXcRsXXa-2826-1636.png)

##### Element

![inspector-element](https://img.alicdn.com/tfs/TB1V.CJfBTH8KJjy0FiXXcRsXXa-2880-1652.png)

##### NetWork

![network](https://img.alicdn.com/tfs/TB1I.uRfwvD8KJjy0FlXXagBFXa-2840-1622.png)

##### show the total time and latency

![inspector-network](https://img.alicdn.com/tfs/TB1mziKfC_I8KJjy0FoXXaFnVXa-2866-1648.png)
##### show the header and response

![inspector-network](https://img.alicdn.com/tfs/TB1eKz_c5qAXuNjy1XdXXaYcVXa-2870-1650.png)
##### Console

![inspector-console](cd ..FlXXagBFXa-2880-1652.png)
##### Resource

![inspector-resource](https://img.alicdn.com/tfs/TB131eDfv2H8KJjy0FcXXaDlFXa-2872-1642.png)

#### Debugger

![devtools-debugger](https://img.alicdn.com/tfs/TB1iuS5fDnI8KJjy0FfXXcdoVXa-2816-1642.png)

##### Breakpoint and CallStack

![debugger-breakpoint](https://img.alicdn.com/tfs/TB1cV5MfxrI8KJjy0FpXXb5hVXa-2860-1644.png)

#### Integrate devtool
* Android
    * See the doc [Weex devtools (Android)](../../references/advanced/integrate-devtool-to-android.html), it will lead you to config and use it step by step.
* iOS
    * See the doc [Weex devtools (iOS)](../../references/advanced/integrate-devtool-to-ios.html), it will lead you to config and use it step by step.
