---
title: Create a plugin
type: guide
group: Extend
order: 6.1
version: 2.1
---

<!-- toc -->

The weex plugin development kit is designed to help developers build weex plugins quickly and easily, allowing them to integrate native functionality without changing business code.

The plugin abstracts a functionality and/or component to the rest of the app by including the specific implementation for each target platform ([Web](#web), [Android](#android) and [iOS](#ios)) and exposing it through a common API.

## Getting started

Create a weex plugin with weexpack:
```
weex plugin create weex-my-plugin
```
This will create a project structure similar to this:
```
     ├── android   (Android native code project)
     │    └── ...
     ├── ios   (iOS native code project)
     │    └── ...
     ├── js   (html5 project)
     │    └── ...
     ├── examples   (sample app)
     │    └── index.vue
     ├── playground   (sample projects to test the plugin)
     │    ├── android
     │    ├── browser
     │    └── ios
     ├── WeexMyPlugin.podspec   (iOS .podspec)
     ├── package.json
     ├── README.md
  ```

The `examples` directory contains a weex app that you can use to test your plugin. This test app will be loaded from the playground apps that are installed in the `playground` folder.

## Web

### Developing and testing with the playground app
1. Build the example weex app in `examples/index.vue`:
  ```
  npm run start:web
  ```
  Webpack will be listening for changes in `examples/index.vue` and re-build the example app for you. The app will be served in the port 12580 (e.g. http://localhost:12580).

2. Edit the plugin JavaScript/HTML/CSS code under the `js` folder. Refresh the test app to update the plugin in the playground app.

### Extending Web functionality
See [Extend Web Render](./extend-web-render.html).

## Android

### Developing and testing with the playground app
1. Build the example weex app in `examples/index.vue`:
  ```
  npm run start:native
  ```
  Webpack will be listening for changes in `examples/index.vue` and re-build the example app for you.

2. Open the android project under `playground/android` with Android Studio.

  The native plugin code will be linked as a gradle dependency. You can develop and test the plugin directly from Android Studio. You can also use `weex debug` to debug the playground app.

### Extending native functionality
See [Extend Android](./extend-android.html).

## iOS

### Developing and testing with the playground app
1. Build the example weex app in `examples/index.vue`:
  ```
  npm run start:native
  ```
  Webpack will be listening for changes in `examples/index.vue` and re-build the example app for you.

2. Open the iOS playground app and install the dependencies:
  ```
  cd playground/ios
  pod install
  ```
3. Open `WeexDemo.xcworkspace` in Xcode.

  The native plugin code will be linked as cocoa pod. You can develop and test the plugin directly from Xcode. You can also use `weex debug` to debug the playground app.

### Extending native functionality
See [Extend iOS](./extend-ios.html).

### Publishing a plugin to the cocapods repository
1. Edit the `*.podspec` generated in the root of the plugin project.
2. Check the correctness of the iOS plugin:
  ```
  pod spec lint --allow-warnings
  ```
3. Publish to cocoapods repository:
  ```
  pod trunk push --allow-warnings
  ```

## Publish the plugin in the weex market
You can publish to the [Weex Market](https://market.dotwe.org/) with the simple command:
```
weex plugin publish
```

## How to use the plugin in another project

### Using `weexpack`:
```
weex plugin add weex-kdp
```

### Manual integration:
#### iOS:
```
pod 'WeexMyPlugin'
```

#### Android:
Add the following line to the dependencies list in the build.gradle file for the corresponding project.
```
 compile '${groupId}:weexkdp:{$version}'
```
> Note: You need to specify the groupId and $version of the project.

#### Web integration
```
 npm install weexkdp
```
