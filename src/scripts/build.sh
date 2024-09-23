#!/bin/bash
version="development"

docker buildx create --name multiarchbuilder --use --bootstrap
docker buildx build . --no-cache --load --platform linux/arm64 -t "guidcruncher/labortablo:$version"

docker push "guidcruncher/labortablo:$version"
