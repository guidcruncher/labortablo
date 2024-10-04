FROM alpine:latest

RUN apk add --no-cache nano lighttpd nodejs-current npm curl

RUN npm i --global npx handlebars pm2 prettier minify

ENV NODE_CONFIG_DIR="/config"
ENV PERSISTENCE_STORE="/cache"
RUN mkdir -p "$NODE_CONFIG_DIR"
RUN mkdir -p "$PERSISTENCE_STORE"

ENV API_INTERNAL_URL="http://127.0.0.1:9080"
ENV LISTEN_ADDRESS=""
ENV DOCKER_SOCKET=""
ENV DOCKER_HOST="" 
ENV DOCKER_IO_USER=""
ENV DOCKER_IO_PASS=""
ENV GHCR_IO_USER=""
ENV GHCR_IO_PASS=""
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
RUN mkdir -p /config/user-icons
RUN mkdir -p /app
RUN mkdir -p /cache/services
RUN mkdir -p /cache/bookmarks
RUN mkdir -p /cache/feeds

WORKDIR /app/

COPY ./lighttpd.conf /etc/lighttpd/lighttpd.conf

COPY ./.minify.json /app/.minify.json
COPY ./_config/* /config.default/
COPY ./start.sh /app/start.sh
COPY ./ecosystem.config.js /app/ecosystem.config.js
COPY ./package.json /app/package.json
RUN chmod +x /app/start.sh

RUN npm config set loglevel warn \
    && npm config set maxsockets 5 \
    && npm config set progress true

RUN cd /app && npm i

COPY . /app/

RUN npx prettier --write "./**/*.js"
RUN npx handlebars /app/views/partials/*.hbs -f /app/public/scripts/templates.js
RUN npx minify /app/public/scripts/main.js > /app/public/scripts/main.min.js

RUN rm /app/.minify.json
RUN rm -r /app/_config /app/_scripts

EXPOSE 80

CMD ["/bin/sh", "-e", "-c", "/app/start.sh"]
