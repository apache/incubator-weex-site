const glob = require('glob')
const fs = require('fs')
const fetch = require('node-fetch')
const urlExtractor = require('url-extractor')
const chalk = require('chalk')
const findLineColumn = require('find-line-column')

const extractUrls = urlExtractor.extractUrls
const SOURCE_TYPE_MARKDOWN = urlExtractor.SOURCE_TYPE_MARKDOWN

const whiteList = [
  'localhost'
]

function log(errorCode, url, file, position) {
  console.log(chalk.bgRed(errorCode), chalk.yellow(url),
    `${file}:${position.line}:${position.col}`);
}

glob('source/**/*.md', (err, files) => {
  files.forEach((file, fileIndex) => {
    fs.readFile(file, { encoding: 'utf-8' },  (err, text) => {
      if (err) {
        console.error(err)
        return
      }

      const urls = extractUrls(text, SOURCE_TYPE_MARKDOWN)
      urls.forEach(url => {
        const position = findLineColumn(text, text.indexOf(url))

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
              log(res.status, url, file, position);
            }
          })
          .catch(err => {
            if (err.code !== 'ECONNREFUSED' && err.code !== 'ECONNRESET') {
              log(err.code, url, file, position)
            }
          })
      })
    })
  })
})
