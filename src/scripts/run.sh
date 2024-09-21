#!/bin/bash
version="development"

docker run --name labortablo \
	-i -t -p 9000:80 \
	-v /var/run/docker.sock:/var/run/docker.sock:ro \
	--rm \
	crockerish/labortablo:$version
