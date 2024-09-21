#!/bin/bash
version="development"

docker buildx build --push . \
      	--platform linux/arm64 \
       	-t "crockerish/labortablo:$version"

