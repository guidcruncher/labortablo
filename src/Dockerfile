FROM node:22.9.0-alpine3.20

RUN apk add --no-cache nano bash curl sqlite
RUN apk add --no-cache  cairo-dev cairo cairo-tools libpng pango libpng-dev jpeg-dev libjpeg-turbo-dev librsvg

RUN npm i --global handlebars

ENV API_INTERNAL_URL="http://127.0.0.1:9080/api"
ENV NODE_CONFIG_DIR="/config"
ENV PERSISTENCE_STORE="/cache"
RUN mkdir -p "$NODE_CONFIG_DIR"
RUN mkdir -p "$PERSISTENCE_STORE"

RUN mkdir -p /config.default
RUN mkdir -p /config
RUN mkdir -p /config/user-icons
RUN mkdir -p /app
RUN mkdir -p /cache/services
RUN mkdir -p /cache/bookmarks
RUN mkdir -p /cache/feeds

WORKDIR /app/


COPY ./.minify.json /app/.minify.json
COPY ./_config/* /config.default/
COPY ./start.sh /app/start.sh
COPY ./package.json /app/package.json
RUN chmod +x /app/start.sh

RUN npm config set loglevel warn \
    && npm config set maxsockets 5 \
    && npm config set progress true

RUN cd /app && npm i

COPY . /app/

RUN rm /app/.minify.json /app/eslint.config.mjs /app/Gruntfile.js
RUN rm -r /app/_config

EXPOSE 9080

CMD ["/bin/sh", "-e", "-c", "/app/start.sh"]
