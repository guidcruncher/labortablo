#!/bin/bash
version="development"

docker buildx create --name multiarchbuilder --use --bootstrap
docker buildx build . --load --platform linux/arm64 -t "guidcruncher/labortablo:$version"
