#!/bin/sh

mkdir -p /cache
mkdir -p /cache/bookmarks

cp /labortablo/web/public/images/labortablo.svg /cache/
cp /labortablo/web/public/images/labortablo.svg /labortablo/web/public/icons/

if [ ! -f  "$CONFIG_DIR/bookmarks.json" ]; then
	echo "{}" > "$CONFIG_DIR/bookmarks.json"
fi


if [ ! -z "$PERSISTENCE_STORE" ]; then
	mkdir -p "$PERSISTENCE_STORE"
fi

lighttpd -f /etc/lighttpd/lighttpd.conf

export NODE_ENV=production
npx pm2 -s --no-daemon restart ./ecosystem.config.js --update-env
