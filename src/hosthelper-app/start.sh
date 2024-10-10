#!/bin/bash
export DOCKER_GATEWAY_HOST=$(ip -4 addr show eth0 | grep -Po 'inet \K[\d.]+')

	if [ "$NODE_ENV" = "production" ]; then
		nohup npm run start > /dev/null 2>&1 &
	else
		nohup npm run start-dev > /dev/null 2>&1 &
	fi
