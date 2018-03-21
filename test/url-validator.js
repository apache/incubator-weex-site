const glob = require('glob')
const fs = require('fs')
const fetch = require('node-fetch')
const urlExtractor = require('url-extractor')
const chalk = require('chalk')

const extractUrls = urlExtractor.extractUrls
const SOURCE_TYPE_MARKDOWN = urlExtractor.SOURCE_TYPE_MARKDOWN

const whiteList = [
  'localhost'
]

glob('source/**/*.md', (err, files) => {
  files.forEach((file, fileIndex) => {
    fs.readFile(file, { encoding: 'utf-8' },  (err, text) => {
      const urls = extractUrls(text, SOURCE_TYPE_MARKDOWN)
      urls.forEach(url => {
        // '//xxx.com' -> 'http://xxx.com'
        if (url.match(/^\/\//)) url = 'http:' + url

        // ignore non-http(s)
        if (!url.match(/^https?:\/\//)) return
        // ignore whitelist
        for (let i = 0; i < whiteList.length; i++) {
          if (url.match(whiteList[i])) return
        }

        // using fetch to test whether available
        fetch(url)
          .then(res => {
            if (res.status >= 400) {
              console.log(chalk.bgRed(res.status), chalk.yellow(url), file)
            }
          })
          .catch(err => {
            if (err.code !== 'ECONNREFUSED' && err.code !== 'ECONNRESET') {
              console.log(chalk.bgRed(err.code), chalk.yellow(url), file)
            }
          })
      })
    })
  })
})
