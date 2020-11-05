#!/bin/bash

# source build
rm -rf node_modules
npm install
npm run build

# pulish to apache/asf-site
rm -rf .deploy_git
mkdir .deploy_git
cd .deploy_git
# git init
# git remote add apache git@github.com:apache/incubator-weex-site.git
# git fetch apache asf-site
# git reset apache/asf-site
mv ../docs/.vuepress/dist/* ./
echo move to deploy_git successful
rm -rf ./zh/community/biz-emas.html
echo remove biz-emas.html
node ../scripts/generate-redirect-html.js
echo generate redirect html
node ../scripts/generate-htaccess-file.js
echo generate htaccess file
# DATE=`date '+%Y-%m-%d %H:%M:%S'`
# git add -A
# git commit -m "Site updated: ${DATE}"
# git checkout apache/asf-site -b asf-site
# git merge master
# git push apache asf-site
