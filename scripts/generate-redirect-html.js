const fs = require('fs-extra');
const path = require('path');

const target = path.join(__dirname, '../.deploy_git/')
const redirectDate = path.join(__dirname, '../docs/.vuepress/data/redirect.json');

async function generate () {
  await fs.ensureFile(redirectDate)
  let json = await fs.readJson(redirectDate)
  for (let key in json) {
    let basename = path.basename(key)
    let output
    if (!/\.html/.test(basename)){
      output = key + '/index.html'
    } else {
      output = key
    }
    let filename = path.join(target, output)
    if (fs.existsSync(filename)) {
      continue
    }
    await fs.ensureFile(filename)
    fs.writeFile(filename, 
`<!DOCTYPE html>
<html>
<head>
<!-- HTML meta URL redirect -->
<meta http-equiv="refresh" content="0; url=https://weex.apache.org${json[key]}">
</head>
<body>
</body>
</html>`, (error) => {
      if (error) {
        console.error(`Generate redirect error: ${error && error.stack}`)
      }
    })
  }
}

generate()