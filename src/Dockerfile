FROM alpine:latest

RUN apk add --no-cache nano lighttpd  nodejs npm curl

RUN npm i --global npx handlebars pm2

ENV ICON_CACHE="/cache"
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

RUN mkdir -p /config
RUN mkdir -p /labortablo/api
RUN mkdir -p /labortablo/web
RUN mkdir -p /labortablo/web/public/icons
RUN mkdir -p /cache

WORKDIR /labortablo/

COPY ./lighttpd.conf /etc/lighttpd/lighttpd.conf


COPY ./start.sh /labortablo/start.sh
COPY ./ecosystem.config.js /labortablo/ecosystem.config.js
COPY ./package.json /labortablo/package.json
COPY ./api/package.json /labortablo/api/package.json
COPY ./web/package.json /labortablo/web/package.json
RUN chmod +x /labortablo/start.sh

RUN npm config set loglevel warn \
    && npm config set maxsockets 5 \
    && npm config set progress true

RUN cd /labortablo && npm i
RUN cd /labortablo/api && npm i
RUN cd /labortablo/web && npm i

COPY ./api/ /labortablo/api
COPY ./web/ /labortablo/web

RUN npx handlebars /labortablo/web/views/partials/*.hbs -f /labortablo/web/public/scripts/templates.js

EXPOSE 80

CMD ["/bin/sh", "-e", "-c", "/labortablo/start.sh"]
