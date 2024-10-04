#!/bin/bash
version="development"

export PERSISTENCE_STORE="$HOME/src/dev/labortablo/cache"
export NODE_CONFIG_DIR="$HOME/src/dev/labortablo/config"

mkdir -p "$NODE_CONFIG_DIR"
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

npx eslint -c ./eslint.config.mjs --ignore-pattern "web/public/**/*.*" --ignore-pattern "ecosystem*.config.js"

if [ $? -ne 0 ]; then
	exit
fi

npx handlebars ./web/views/partials/*.hbs -f ./web/public/scripts/templates.js

if [ $? -ne 0 ]; then
	exit
fi

export NODE_ENV=development
npx pm2 -s --no-daemon restart ./ecosystem.development.config.js --update-env

