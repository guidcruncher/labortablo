!/bin/sh

cp /app/web/public/images/labortablo.svg /cache/
cp /app/web/public/images/labortablo.svg /app/web/public/icons/

mkdir -p "$CONFIG_DIR"

if [ ! -f  "$CONFIG_DIR/bookmarks.json" ]; then
	cp /config.default/bookmarks.json  "$CONFIG_DIR/bookmarks.json"
fi

if [ ! -f  "$CONFIG_DIR/config.json" ]; then
	cp /config.default/config.json  "$CONFIG_DIR/config.json"
fi


if [ ! -z "$PERSISTENCE_STORE" ]; then
	mkdir -p "$PERSISTENCE_STORE"
fi

lighttpd -f /etc/lighttpd/lighttpd.conf

export NODE_ENV=production
npx pm2 -s --no-daemon restart ./ecosystem.config.js --update-env
