#!/bin/bash
version="development"

npx prettier --write "./api/**/*.js" "./web/**/*.js"

if [ $? -ne 0 ]; then
        exit
fi

npx  eslint -c ./eslint.config.mjs --ignore-pattern "web/public/**/*.*" --ignore-pattern "ecosystem.config.js"

if [ $? -ne 0 ]; then
        exit
fi

npx handlebars ./web/views/partials/*.hbs -f ./web/public/scripts/templates.js

if [ $? -ne 0 ]; then
        exit
fi

docker buildx create --name multiarchbuilder --use --bootstrap

docker buildx build . --no-cache --load --platform linux/arm64 -t "guidcruncher/labortablo:$version"

if [ $? -ne 0 ]; then
	exit
fi

docker push "guidcruncher/labortablo:$version"
