---
title: Integrate to Your App
type: guide
group: Overview
order: 1.3
version: 2.1
---

# Integrate to Your App

## Integrate to Android Platform
The following documents assume that you already have a certain Android development experience.


### Quick Start Five Steps

The keys to intergrating Weex into your Android application are the following five step:

1.Configure Gralde dependency in build.gradle
```javascript
dependencies {
    ...
    // weex sdk and fastjson
    compile 'com.taobao.android:weex_sdk:0.5.1@aar'   
    compile 'com.alibaba:fastjson:1.1.46.android'

    //support library dependencies
    compile 'com.android.support:recyclerview-v7:23.1.1'
    compile 'com.android.support:support-v4:23.1.1'
    compile 'com.android.support:appcompat-v7:23.1.1'
}
```
2.Add required permissions in your AndroidManifest.xml

```xml
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
```
3.Init Week SDK When Application Create
```java
public class WXApplication extends Application {
  @Override
  public void onCreate() {
    super.onCreate();
    InitConfig config = new InitConfig.Builder().setImgAdapter(new FrescoImageAdapter()).build();
    WXSDKEngine.initialize(this,config);
  }
}
```[Fresco  ImageAdapter](https://github.com/apache/incubator-weex/blob/master/android/commons/src/main/java/com/alibaba/weex/commons/adapter/FrescoImageAdapter.java) [Picasso ImageAdapter](https://github.com/apache/incubator-weex/blob/master/android/commons/src/main/java/com/alibaba/weex/commons/adapter/ImageAdapter.java)  

4. Create an WXSDKInstance,  add IWXRenderListener and activity lifecycle on it. load weex bundle url. when  page load success; target view will be send for you on  onViewCreated callback, set target view to activity contentView.
```java
public class MainActivity extends AppCompatActivity implements IWXRenderListener {
  WXSDKInstance mWXSDKInstance;
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    mWXSDKInstance = new WXSDKInstance(this);
    mWXSDKInstance.registerRenderListener(this);
    /**
    * bundleUrl source http://dotwe.org/vue/38e202c16bdfefbdb88a8754f975454c
    */
    String pageName = "WXSample";
    String bundleUrl = "http://dotwe.org/raw/dist/38e202c16bdfefbdb88a8754f975454c.bundle.wx";
    mWXSDKInstance.renderByUrl(pageName, bundleUrl, null, null,WXRenderStrategy.APPEND_ASYNC);
  }
  @Override
  public void onViewCreated(WXSDKInstance instance, View view) {
    setContentView(view);
  }
  @Override
  public void onRenderSuccess(WXSDKInstance instance, int width, int height) {
  }
  @Override
  public void onRefreshSuccess(WXSDKInstance instance, int width, int height) {
  }
  @Override
  public void onException(WXSDKInstance instance, String errCode, String msg) {
  }
  @Override
  protected void onResume() {
    super.onResume();
    if(mWXSDKInstance!=null){
      mWXSDKInstance.onActivityResume();
    }
  }
  @Override
  protected void onPause() {
    super.onPause();
    if(mWXSDKInstance!=null){
       mWXSDKInstance.onActivityPause();
    }
  }
  @Override
  protected void onStop() {
    super.onStop();
    if(mWXSDKInstance!=null){
      mWXSDKInstance.onActivityStop();
    }
  }
  @Override
  protected void onDestroy() {
    super.onDestroy();
    if(mWXSDKInstance!=null){
      mWXSDKInstance.onActivityDestroy();
    }
  }
}
```
5. Run app, start activity, then you will see hello world demo. well done.

[Hello World Demo Source](http://dotwe.org/vue/38e202c16bdfefbdb88a8754f975454c)

Tip: Click QRCode Image in Demo Source Page, your will see compiled bundle js.


## Integrated to iOS

Through the cocoaPods integrated Weex iOS SDK to the project.
First assume that you have finished installing the [iOS development environment](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppStoreDistributionTutorial/Setup/Setup.html) and [CocoaPods](https://guides.cocoapods.org/using/getting-started.html).

### Step 1: Add Dependencies
Import Weex iOS SDK to your existing project, if not, you can create a new project.
Before proceeding, make sure that the Podfile file is under the project file. If not, create one and open with  text editor.

+ Integration framework

WeexSDK The latest version on cocoaPods can be obtained [here](https://cocoapods.org/pods/WeexSDK) .
Add the following to the Podfile file:

```object-c
source 'git@github.com:CocoaPods/Specs.git'
target 'YourTarget' do
    platform :ios, '7.0'
    pod 'WeexSDK', '0.9.5'   ## Suggest using latest Weex SDK
end
```

+ Integrate with source code

First copy the ios / sdk directory to your existing project directory (here to copy the root directory of your existing project as an example), and then add the Podfile file.

```object-c
source 'git@github.com:CocoaPods/Specs.git'
target 'YourTarget' do
    platform :ios, '7.0'
    pod 'WeexSDK', :path=>'./sdk/'
end
```

### Step 2: Install Dependencies

Open the command line, switch to the directory of the Podfile file, and run the pod install command. If there are no errors, it means that the environment has been configured.

### Step 3: Initialize the Weex environment
In the AppDelegate.m file to do the initialization operation, usually in the didFinishLaunchingWithOptions method as follows to add.

```object-c
//business configuration
[WXAppConfiguration setAppGroup:@"AliApp"];
[WXAppConfiguration setAppName:@"WeexDemo"];
[WXAppConfiguration setAppVersion:@"1.0.0"];
//init sdk environment
[WXSDKEngine initSDKEnvironment];
//register custom module and component，optional
[WXSDKEngine registerComponent:@"MyView" withClass:[MyViewComponent class]];
[WXSDKEngine registerModule:@"event" withClass:[WXEventModule class]];
//register the implementation of protocol, optional
[WXSDKEngine registerHandler:[WXNavigationDefaultImpl new] withProtocol:@protocol(WXNavigationProtocol)];
//set the log level
[WXLog setLogLevel: WXLogLevelAll];
```

### Step 4: Render weex Instance

Weex supports both full page rendering and partial rendering. What you need to do is render Weex's view with the specified URL and add it to its parent container. The parent container is generally a viewController.

```object-c
#import <WeexSDK/WXSDKInstance.h>
- (void)viewDidLoad
{
    [super viewDidLoad];
    _instance = [[WXSDKInstance alloc] init];
    _instance.viewController = self;
    _instance.frame = self.view.frame;
    __weak typeof(self) weakSelf = self;
    _instance.onCreate = ^(UIView *view) {
        [weakSelf.weexView removeFromSuperview];
        weakSelf.weexView = view;
        [weakSelf.view addSubview:weakSelf.weexView];
    };
    _instance.onFailed = ^(NSError *error) {
        //process failure
    };
    _instance.renderFinish = ^ (UIView *view) {
        //process renderFinish
    };
    NSURL *url = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"js"];
    [_instance renderWithURL:url options:@{@"bundleUrl":[self.url absoluteString]} data:nil];
}
```

WXSDKInstance is a very important class that provides a basic method and some callbacks, such as renderWithURL, onCreate, onFailed, etc., can be found in WXSDKInstance.h.

### Step 5: Destroy Weex Instance
In the dealloc phase of the viewController destroyed Weex instance, can play a role in avoiding memory leaks.

```object-c
- (void)dealloc
{
    [_instance destroyInstance];
}
```

#### Import the Weex SDK framework to the project.
The Weex SDK can be compiled from the source code. You can try the latest feature in the new feature or bugfix branch.
Refer to [here](https://open.taobao.com/doc2/detail?spm=a219a.7629140.0.0.tFddsV&&docType=1&articleId=104829) for direct import of weexSDK.
