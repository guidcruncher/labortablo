#!/bin/bash
version="development"

docker buildx build . \
	--no-cache \
      	--platform linux/arm64 \
	-t "guidcruncher/labortablo:latest"

docker push "guidcruncher/labortablo:latest"
