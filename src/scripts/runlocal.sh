#!/bin/bash
version="development"

export API_INTERNAL_URL="http://dev.thecrockers.localcert.net:9080"
export API_BASE="http://dev.thecrockers.localcert.net:9080"
export PERSISTENCE_STORE="$HOME/src/dev/labortablo/cache"
export DOCKER_SOCKET="/var/run/docker.sock"
export CONFIG_DIR="$HOME/src/dev/labortablo/config"
export OIDC_ENABLED="false"
export OIDC_CLIENTID="labortablo"
export OIDC_SECRET="replace-with-some-long-random-string-please"
export OIDC_CLIENTSECRET="859MZPNnKgrotpeix4h74zBdhKmtsmlM"
export BASE_URL="http://dev.thecrockers.localcert.net:9081"

mkdir -p "$CONFIG_DIR"
mkdir -p "$PERSISTENCE_STORE"
# rm "$PERSISTENCE_STORE"/*

npx prettier --write "./api/**/*.js" "./web/**/*.js"

if [ $? -ne 0 ]; then
	exit
fi

rm ./web/public/scripts/main.min.js
npx minify ./web/public/scripts/main.js >./web/public/scripts/main.min.js

if [ $? -ne 0 ]; then
	exit
fi

npx eslint -c ./eslint.config.mjs --ignore-pattern "web/public/**/*.*" --ignore-pattern "ecosystem.config.js"

if [ $? -ne 0 ]; then
	exit
fi

npx handlebars ./web/views/partials/*.hbs -f ./web/public/scripts/templates.js

if [ $? -ne 0 ]; then
	exit
fi

npx pm2 -s --no-daemon start ./ecosystem.config.js
