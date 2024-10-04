FROM alpine:latest

RUN apk add --no-cache nano lighttpd nodejs-current npm curl

RUN npm i --global npx handlebars pm2 prettier minify

ENV PERSISTENCE_STORE="/cache"
ENV API_BASE="/api"

ENV API_INTERNAL_URL="http://127.0.0.201:9080"
ENV LISTEN_ADDRESS=""
ENV DOCKER_SOCKET=""
ENV DOCKER_HOST="" 
ENV DOCKER_IO_USER=""
ENV DOCKER_IO_PASS=""
ENV GHCR_IO_USER=""
ENV GHCR_IO_PASS=""
ENV CONFIG_DIR="/config"
ENV API_PORT=9080
ENV API_LISTEN_ADDRESS="0.0.0.0"
ENV WEB_PORT=9081
ENV WEB_LISTEN_ADDRESS="0.0.0.0"
ENV BASE_URL=""
ENV OIDC_ENABLED=false
ENV OIDC_DISCOVER_URL=""
ENV OIDC_CLIENTID=""
ENV OIDC_CLIENTSECRET=""
ENV OIDC_SECRET="replace-with-some-long-random-string-please"

RUN mkdir -p /config.default
RUN mkdir -p /config
RUN mkdir -p /app/api
RUN mkdir -p /app/web
RUN mkdir -p /app/web/public/icons
RUN mkdir -p /cache/services
RUN mkdir -p /cache/bookmarks
RUN mkdir -p /cache/feeds

WORKDIR /app/

COPY ./lighttpd.conf /etc/lighttpd/lighttpd.conf

COPY ./.minify.json /app/.minify.json
COPY ./config/* /config.default/
COPY ./start.sh /app/start.sh
COPY ./ecosystem.config.js /app/ecosystem.config.js
COPY ./package.json /app/package.json
COPY ./api/package.json /app/api/package.json
COPY ./web/package.json /app/web/package.json
RUN chmod +x /app/start.sh

RUN npm config set loglevel warn \
    && npm config set maxsockets 5 \
    && npm config set progress true

RUN cd /app && npm i
RUN cd /app/api && npm i
RUN cd /app/web && npm i

COPY ./api/ /app/api
COPY ./web/ /app/web

RUN npx prettier --write "./api/**/*.js" "./web/**/*.js"
RUN npx handlebars /app/web/views/partials/*.hbs -f /app/web/public/scripts/templates.js
RUN npx minify /app/web/public/scripts/main.js > /app/web/public/scripts/main.min.js

RUN rm /app/.minify.json

EXPOSE 80

CMD ["/bin/sh", "-e", "-c", "/app/start.sh"]
