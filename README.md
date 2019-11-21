# Weex Website

This is the source code of Weex official website.

+ Official website: http://weex.apache.org/
+ Mirror in Alibaba Cloud (faster in China): https://weex-project.io/

## Develop

### Install
First you should install the [Node.js](https://nodejs.org/), and install dependencies:

```bash
npm install
```

### Develop

```bash
npm start
```

It will start a web server at `http://localhost:8080`. The pages will be updated automatically once you save the corresponding source file.

### Package

```
npm run build
```

This will generate static files for publishing. The files are located in `docs/.vuepress/dist/`

### Deploy

```
scripts/publish.sh
```

Run the above script to deploy the website. This script will add all files in `docs/.vuepress/dist/` to `asf-site` branch, make a git commit and publish to the remote.

After executing, `https://weex.apache.org/` will be updated automatically. If you're in China, you will need to wait several hours or one day before the CDN cache refreshing.

**The above scripts only works for committers, if you are not a committer, then you don't have the privilege to do the `git push`**.

## Contribute

The documents are written in Markdown format located in the `docs` folder. Feel free to send pull requests!

## How to add a blog

To write a blog, edit 'docs/.vuepress/config.js'.

* Search 'blog' in this file. Edit blog section and add your article filename(without 'md' extension) and title.
```javascript
'/blog/': [['write-a-blog', 'Write a Blog'], ['your-file-name', 'Your article title']]
'/zh/blog/': [['write-a-blog', '写一篇博客'], ['your-file-name', '你的文章标题']]
```

* Add your file(with 'md' extension) in 'docs/blog' and 'docs/zn/blog' directories.