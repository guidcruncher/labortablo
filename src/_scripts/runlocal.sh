#!/bin/bash

export PERSISTENCE_STORE="$HOME/src/dev/labortablo/cache"
export NODE_CONFIG_DIR="$HOME/src/dev/labortablo/config"

mkdir -p "$NODE_CONFIG_DIR"
mkdir -p "$PERSISTENCE_STORE"

./_scripts/tidy.sh

if [ $? -ne 0 ]; then
	exit 1
fi

export DOCKER_GATEWAY_HOST=$(ip -4 addr show docker0 | grep -Po 'inet \K[\d.]+')
export NODE_ENV=development
npm run start-dev
