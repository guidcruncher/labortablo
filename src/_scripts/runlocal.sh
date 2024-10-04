#!/bin/bash

export PERSISTENCE_STORE="$HOME/src/dev/labortablo/cache"
export NODE_CONFIG_DIR="$HOME/src/dev/labortablo/config"

mkdir -p "$NODE_CONFIG_DIR"
mkdir -p "$PERSISTENCE_STORE"

./_scripts/tidy.sh

if [ $? -ne 0 ]; then
	exit 1
fi

export NODE_ENV=development
npm run start-dev

