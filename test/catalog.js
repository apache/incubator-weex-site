const fs = require('fs')
const path = require('path')
const glob = require('glob')

const bannerRE = /^[^`]*(\-{3})?([^`]+)\-{3}\n/i

function scan () {
  const output = glob.sync('source/**/*.md')
    .filter(name => !/\/\_/i.test(name))
    .map((name, index) => {
      const file = fs.readFileSync(name, { encoding: 'utf-8' })
      const result = bannerRE.exec(file)
      if (result && result[0]) {
        const keys = {}
        result[0].split(/[\n\t]+/).forEach(str => {
          const pair = str.split(/\s*\:\s*/)
          if (pair.length > 1) {
            keys[pair[0]] = pair[1]
          }
        })
        const indent = '    '.repeat(name.split(/\/|\\/).length - 2)
        const string = `${indent}* [${keys.title || ''}](${path.join('./', name)})`
        // console.log(string)
        return string
      }
    })
    .filter(x => !!x)

  console.log('-----> output:', output.length)
  fs.writeFileSync('catalog.md', output.join('\n'))
}

scan()
