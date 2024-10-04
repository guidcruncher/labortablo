#!/bin/bash
version="development"

./_scripts/tidy.sh

if [ $? -ne 0 ]; then
	exit 1
fi

docker buildx create --name multiarchbuilder --use --bootstrap

docker buildx build . --pull --no-cache --load --platform linux/arm64 -t "guidcruncher/labortablo:$version"

if [ $? -ne 0 ]; then
	exit
fi

docker push "guidcruncher/labortablo:$version"

docker rm buildx_buildkit_multiarchbuilder0 -f
docker volume rm buildx_buildkit_multiarchbuilder0_state
