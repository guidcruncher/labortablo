#!/bin/bash
version="development"

npx prettier --write "./api/**/*.js" "./web/**/*.js"

npx  eslint -c ./eslint.config.mjs --ignore-pattern "web/public/**/*.*" --ignore-pattern "ecosystem.config.js"
