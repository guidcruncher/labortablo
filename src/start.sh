#!/bin/sh

cp /app/web/public/images/labortablo.svg /cache/
cp /app/web/public/images/labortablo.svg /app/web/public/icons/

mkdir -p "$NODE_CONFIG_DIR"

if [ ! -f  "$NODE_CONFIG_DIR/bookmarks.json" ]; then
	cp /config.default/bookmarks.json  "$NODE_CONFIG_DIR/bookmarks.json"
fi

if [ ! -f  "$NODE_CONFIG_DIR/default.json" ]; then
	cp /config.default/default.json  "$NODE_CONFIG_DIR/default.json"
fi


if [ ! -z "$PERSISTENCE_STORE" ]; then
	mkdir -p "$PERSISTENCE_STORE"
fi

lighttpd -f /etc/lighttpd/lighttpd.conf

export NODE_ENV=production
npm run start
