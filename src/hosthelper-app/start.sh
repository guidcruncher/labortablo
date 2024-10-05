#!/bin/bash
export DOCKER_GATEWAY_HOST=$(ip -4 addr show docker0 | grep -Po 'inet \K[\d.]+')

	if [ "$NODE_ENV" = "production" ]; then
		npm run start
	else
		npm run start-dev
	fi
