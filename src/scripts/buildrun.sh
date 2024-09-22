#!/bin/bash
version="development"

docker buildx create --name multiarchbuilder --use --bootstrap
docker buildx build . --load --platform linux/arm64 -t "guidcruncher/labortablo:$version"

docker run --name labortablo-dev \
	-i -t -p 9000:80 \
	-v /var/run/docker.sock:/var/run/docker.sock:ro \
	-v /home/jcrocker/tmp/cache:/cache \
	-v /home/jcrocker/tmp/config:/config \
        -e DOCKER_SOCKET="/var/run/docker.sock" \
	-e DOCKER_IO_USER=${DOCKER_IO_USER} \
	-e DOCKER_IO_PASS=${DOCKER_IO_PASS} \
	-e GHCR_IO_USER=${GHCR_IO_USER} \
	-e GHCR_IO_PASS=${GHCR_IO_PASS} \
	--rm \
	guidcruncher/labortablo:$version
