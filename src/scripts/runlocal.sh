#!/bin/bash
version="development"

export API_INTERNAL_URL="http://192.168.1.201:9080"
export API_BASE="http://192.168.1.201:9080"
export PERSISTENCE_STORE="$HOME/tmp/cache"
export DOCKER_SOCKET="/var/run/docker.sock"
export CONFIG_DIR="$HOME/tmp/config"
export OIDC_ENABLED=false
export OIDC_CLIENTID="labortablo"
export OIDC_SECRET="replace-with-some-long-random-string-please"
export OIDC_CLIENTSECRET="859MZPNnKgrotpeix4h74zBdhKmtsmlM"
export BASE_URL="http://192.168.1.201:9081"

mkdir -p "$CONFIG_DIR"
mkdir -p "$PERSISTENCE_STORE"
# rm "$PERSISTENCE_STORE"/*

npx handlebars ./web/views/partials/*.hbs -f ./web/public/scripts/templates.js
npx pm2 -s --no-daemon start ./ecosystem.config.js

