# Weex Website

This is the source code of Weex official website.

+ Official website: http://weex.apache.org/
+ Mirror in Alibaba Cloud (faster in China): https://weex-project.io/

## Develop

First you should install the [Node.js](https://nodejs.org/), and install dependencies:

```bash
npm install
```

After that, you can start a web server to preview the website on your local machine.

```bash
npm run dev
```

It will start a web server at `http://localhost:8080`. The pages will be updated automatically once you save the corresponding source file.

## Contribute

The documents are written in Markdown format located in the `docs` folder. Feel free to send pull requests!

## How to add a blog

To write a blog, edit 'docs/.vuepress/config.js'.

* Search 'blog' in this file. Edit blog section and add your article filename and title.
```javascript
'/blog/': [['write-a-blog', 'Write a Blog'], ['your-file-name', 'Your article title']]
'/zh/blog/': [['write-a-blog', '写一篇博客'], ['your-file-name', '你的文章标题']]
```

* Add your file in 'docs/blog' and 'docs/zn/blog' directories.

* Edit 'docs/blog/README.md' and 'docs/zh/blog/README.md', and add your file.
```javascript
<script>
module.exports = {
  created(){
  	this.$router.push('/blog/write-a-blog.html')
  	this.$router.push('/blog/your-file-name.html')
  }
}
</script>
```
```javascript
<script>
module.exports = {
  created(){
  	this.$router.push('/zh/blog/write-a-blog.html')
  	this.$router.push('/zh/blog/your-file-name.html')
  }
}
</script>
```