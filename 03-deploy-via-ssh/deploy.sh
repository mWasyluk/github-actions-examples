#!/bin/sh
docker stop $CONTAINER_NAME
docker pull $IMAGE_NAME
docker run --rm -d -p $CONTAINER_PORT:80 --name $CONTAINER_NAME $IMAGE_NAME
