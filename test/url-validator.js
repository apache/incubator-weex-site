const fs = require('fs')
const path = require('path')
const glob = require('glob')
const chalk = require('chalk')
const fetch = require('node-fetch')
const urlExtractor = require('url-extractor')
const similarity = require('string-similarity')
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

        // ignore whitelist
        for (let i = 0; i < whiteList.length; i++) {
          if (url.match(whiteList[i])) return
        }

        if (url.match(/^https?:\/\//)) {
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
        } else if (url.match(/^.{0,2}\//)) {
          // test local path
          let targetPath
          if (url.startsWith('/')) {
            // '/wiki' -> 'source/wiki'
            targetPath = path.resolve('source', url.substring(1))
          } else {
            targetPath = path.resolve(path.dirname(file), url)
          }
          // 'a.html#title1' -> '#title1
          const urlHash = url.split('#')[1] ? '#' + url.split('#')[1] : ''
          // 'a.html#title1' -> 'a.html' -> 'a.md
          targetPath = targetPath.replace(/#(.*)/, '').replace('.html', '.md')
          fs.access(targetPath, err => {
            if (err) {
              let patternDir
              const option = {
                cwd: 'source'
              }
              if (file.indexOf('/cn/') >= 0) {
                patternDir = 'cn/**/'
              } else {
                patternDir = '**/'
                option.ignore = 'cn/**'
              }
              glob(patternDir + path.basename(targetPath), option, (globError, files) => {
                log(err.code, url, file, position)
                if (files.length) {
                  console.log(chalk.bgBlue('FOUND'), files)
                  const match = similarity.findBestMatch(url, files)
                    .bestMatch.target.replace('.md', '.html')
                  console.log(chalk.bgGreen('FIXED'), match)
                  text = text.replace(url, `/${match}${urlHash}`)
                  // using sync mehtod to avoid writing a file in the same time.
                  fs.writeFileSync(file, text)
                }
              })
            }
          })
        }
      })
    })
  })
})
