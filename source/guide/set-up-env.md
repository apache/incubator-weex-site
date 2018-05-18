---
title: Setup Develop Environment
type: guide
group: Develop
order: 5.1
version: 2.1
---

<!-- toc -->

# Setup Develop Environment

Using [dotWe](http://dotwe.org/vue) is a good choice, but if you want to develop locally on your own machine, you will need to set up your develop environment.

You will need Node.js and the [Weex CLI](https://github.com/weexteam/weex-toolkit).

Install Node.js using [nvm](https://github.com/creationix/nvm) (Simple bash script to manage multiple active Node.js versions). Run the following commands in a terminal after installing nvm:

```bash
$ nvm install 6.10.0
$ nvm use 6.10.0
```

And `npm` comes with Node.js, with which you can install the Weex command line tools.

> **NOTE: ** After upgrading the `weex-toolkit` to v1.0.8, the `npm-shrinkwrap.json` npm 5 specification has been added to lock the package dependencies, it is needed to upgrade your npm version to 5 above by command: `npm install npm@latest -g` if your version is lower than this, please check your npm version before using it.

Run the following commands in a terminal:

```bash
$ npm install -g weex-toolkit
$ weex -v
```
You can use 'weex update <component>@x.x.x' to update weex-devtool, weex-previewer, weex-builder and weexpack to a specific version.
```
weex update weex-devtool@latest // Here latest means to install the latest version
```

> **NOTE: ** If you receive an error like `permission error`, check out where permission problems occur, please delete the corresponding file and reinstall or run the `chmod -R 777 [path]` command to authorize.

Then you can use the Weex command to verify if the installation is successful:

![success-setup-weex-toolkit](https://img.alicdn.com/tfs/TB1NzyNmY_I8KJjy1XaXXbsxpXa-631-270.png)

### Generate a new Weex project

Use the command line tool to generate a Weex project called "awesome-project". Run the following command in a terminal:

```bash
$ weex create awesome-project
```

Then enter the awesome-project folder, you will see a standard project skeleton has been generated.

### Usage

The `weex-toolkit` will prompt you whether to automatically run `npm install`, if not running, manually `cd` into the folder and run `npm install`.

In the `awesome-project` folder, install dependencies with the following command:


```bash
npm start
```

It will open the preview server automaticly, if you just want to see the web site, you can visite `/index.html`, like `localhost:8081/index.html`.

> **NOTE** When the port number is occupied, the port number may change, please pay attention to the console output.

### Folder Structure

```
| —— configs
  | —— config.js                  global config of webpack
  | —— helper.js                  helper functions
  | —— logo.png
  | —— plugin.js                  script for compile plugins
  | —— utils.js                   tool functions
  | —— vue-loader.conf.js         loader config of weex
  | —— webpack.common.conf.js     webpack configuration for common environment
  | —— webpack.dev.conf.js        webpack configuration for develop environment
  | —— webpack.prod.conf.js       webpack configuration for production environment
  | —— webpack.test.conf.js       webpack configuration for test environment
| —— platforms
  | —— platforms.json             platform meta data
| —— plugins
  | —— plugins.json               plugin data
| —— src
  | —— entry.js                   the entry file of whole bundle
  | —— index.vue                  vue file source
| —— test
  | —— unit
    | —— specs                    test scripts
    | —— index.js                 source code and config test environment
    | —— karma.conf.js            configuration for karma
| —— web                          static source
| —— .babelrc                     configuration for babel-loader
| —— android.config.json          configuration for packing android project
| —— ios.config.json              configuration for packing ios project
| —— npm-shrinkwrap.json          npm dependence lock file
| —— package.json
| —— README.md
| —— webpack.config.js            entry file of the webpack command

```

For more technical details, please continue to read the next section. And don't forget to write and preview your codes at [dotWe](http://dotwe.org/vue).
