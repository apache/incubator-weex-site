# 设置开发环境

使用 [Online Editor](http://dotwe.org/vue) 对 Weex 尝鲜是一个不错的选择，但如果你想更专业的开发 Weex，本节会教你如何搭建本地开发环境进行 Weex 开发。

## 安装依赖

Weex 官方提供了`weex-cli` 的脚手架工具来辅助开发和调试。

首先，你需要 Node.js 和 [Weex CLI](https://github.com/apache/weex-cli)。

安装 Node.js 方式多种多样，最简单的方式是在 [Node.js 官网](https://nodejs.org/en/) 下载可执行程序直接安装即可。

> 更多安装方式可参考 [Node.js 官方信息](https://nodejs.org/en/download/)

::: tip
通常，安装了 Node.js 环境，npm 包管理工具也随之安装了。因此，直接使用 npm 来安装 `weex-toolkit`, 你也可以通过 `yarn` 来进行安装。

国内的开发者推荐将npm镜像切换至 Taobao NPM 镜像 `https://registry.npm.taobao.org`。
:::

运行下面的命令安装最新的beta版本工具：

### OSX环境
```bash
$ sudo chmod -R 777 /usr/local/lib/node_modules/
$ npm i -g weex-toolkit // 安装不要使用sudo执行
$ weex -v // 查看当前weex工具版本
```

### Windows环境
```bash
$ npm i -g weex-toolkit 
$ weex -v // 查看当前weex工具版本
```

安装结束后你可以直接使用 `weex help` 命令验证是否安装成功，它会显示 `weex` 支持的所有指令，同时，你也可以通过 `weex doctor` 命令检查你的本地开发环境。


## 初始化项目

然后初始化 Weex 项目：

```bash
$ weex create awesome-project
```

执行完命令后，在 `awesome-project` 目录中已经为我们生成了标准项目结构。

## 开发

进入项目所在路径，如果你在生成项目的时候选择了自动安装依赖，在进入项目后只需直接运行 `npm start` 就可以将项目完整跑起来，否则，你需要预先在项目中运行一下 `npm install` 安装项目所需依赖。

![预览效果图](https://img.alicdn.com/tfs/TB1rAcoI9zqK1RjSZPxXXc4tVXa-2384-1488.png)


关于 Weex 语法部分，你可以直接参考 [Vue Guide](https://vuejs.org/v2/guide/)，这里不再重复介绍。如果您想了解有关技术详情的更多信息，请继续阅读下一节。
