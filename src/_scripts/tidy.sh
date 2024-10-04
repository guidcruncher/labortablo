#!/bin/bash

npx prettier --write "./**/*.js"
if [ $? -ne 0 ]; then
        exit 1
fi

rm ./public/scripts/main.min.js
npx minify ./public/scripts/main.js >./public/scripts/main.min.js
if [ $? -ne 0 ]; then
        exit 1
fi

npx eslint -c ./eslint.config.mjs --ignore-pattern "./public/**/*.*" --ignore-pattern "ecosystem*.config.js"
if [ $? -ne 0 ]; then
        exit 1
fi

npx handlebars ./views/partials/*.hbs -f ./public/scripts/templates.js
if [ $? -ne 0 ]; then
        exit 1
fi

exit 0
