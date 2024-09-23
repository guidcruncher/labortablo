#!/bin/sh

mkdir -p /cache
mkdir -p /cache/bookmarks

cp /labortablo/web/public/images/labortablo.svg /cache/
cp /labortablo/web/public/images/labortablo.svg /labortablo/web/public/icons/

if [ ! -f  "$CONFIG_DIR/bookmarks.json" ]; then
	echo "{}" > "$CONFIG_DIR/bookmarks.json"
fi


if [ ! -z "$ICON_CACHE" ]; then
	mkdir -p "$ICON_CACHE"
fi

lighttpd -f /etc/lighttpd/lighttpd.conf

npx pm2  --no-daemon start ./ecosystem.config.js
