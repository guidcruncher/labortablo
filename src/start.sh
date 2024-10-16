#!/bin/sh

cp /app/public/images/labortablo.svg /cache/
cp /app/public/images/labortablo.svg /app/public/icons/

cp /usr/share/zoneinfo/"$TZ" /etc/localtime

mkdir -p "$NODE_CONFIG_DIR"

if [ ! -f  "$NODE_CONFIG_DIR/default.json" ]; then
        cp /config.default/default.json  "$NODE_CONFIG_DIR/default.json"
        echo "firstrun" > "$NODE_CONFIG_DIR"/firstrun.txt
fi

for filename in $(find /config.default -type f); do
	localfile=$(echo "$filename" | sed 's@/config.default@'"$NODE_CONFIG_DIR"'@g')

	if [ ! -f  "$localfile" ]; then
		echo "Copying $localfile from default."
		cp "$filename" "$localfile"
	fi
done

if [ ! -z "$PERSISTENCE_STORE" ]; then
	mkdir -p "$PERSISTENCE_STORE"
fi


export API_INTERNAL_URL='http://127.0.0.1:9080/api';
npm run start
