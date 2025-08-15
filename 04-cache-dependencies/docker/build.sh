#! /bin/bash

API_DIR="backend"
APP_DIR="frontend"
NGINX_DIR="nginx"
DOCKER_DIR="docker"

API_DOCKERFILE="$DOCKER_DIR/backend.Dockerfile"
APP_DOCKERFILE="$DOCKER_DIR/frontend.Dockerfile"

REQUIRED_DIRS=("$API_DIR" "$APP_DIR" "$NGINX_DIR" "$DOCKER_DIR")
REQUIRED_VARS=("TODOSAPP_API_IMAGE_NAME" "TODOSAPP_APP_IMAGE_NAME")

# Verify if all required directories are present
MISSING_DIRS=()
for DIR in ${REQUIRED_DIRS[@]}; do
  if [ ! -d "$DIR" ]; then
    MISSING_DIRS+=("$DIR")
  fi
done

# Display missing directories and exit with non-zero code
if [ ${#MISSING_DIRS[@]} -gt 0 ]; then
  MISSING_DIRS_STR=$(printf '%s, ' "${MISSING_DIRS[@]}"  | sed 's/, $//')
  echo "[ERROR] The following directories are required but missing: $MISSING_DIRS_STR."
  exit 1
fi

# Verify if all required variables are set
MISSING_VARS=()
for VAR in ${REQUIRED_VARS[@]}; do
  if [ -z "${!VAR}" ]; then
    MISSING_VARS+=("$VAR")
  fi
done

# Display missing variables and exit with non-zero code
if [ "${#MISSING_VARS[@]}" -gt 0 ]; then
  MISSING_VARS_STR=$(printf '%s, ' "${MISSING_VARS[@]}"  | sed 's/, $//')
  echo "[ERROR] The following variables are required but missing: $MISSING_VARS_STR."
  exit 1
fi

if [ -n "${TODOSAPP_CACHE_PATH:-}" ]; then
  echo "[INFO] Cache path for Docker set to $TODOSAPP_CACHE_PATH. Building with a custom builder..."
  docker buildx build -f "$API_DOCKERFILE" -t "$TODOSAPP_API_IMAGE_NAME" \
    --cache-from "type=local,src=$TODOSAPP_CACHE_PATH/api" \
    --cache-to   "type=local,dest=$TODOSAPP_CACHE_PATH/api,mode=max" \
    --load \
    "$API_DIR"

  docker buildx build -f "$APP_DOCKERFILE" --build-context nginx="$NGINX_DIR" -t "$TODOSAPP_APP_IMAGE_NAME" \
    --cache-from "type=local,src=$TODOSAPP_CACHE_PATH/app" \
    --cache-to   "type=local,dest=$TODOSAPP_CACHE_PATH/app,mode=max" \
    --load \
    "$APP_DIR"
else
  echo "[INFO] Cache path for Docker is not set. Building with the default builder..."
  docker build -f "$API_DOCKERFILE" -t "$TODOSAPP_API_IMAGE_NAME" "$API_DIR"
  docker build --build-context nginx="$NGINX_DIR" -f "$APP_DOCKERFILE" -t "$TODOSAPP_APP_IMAGE_NAME" "$APP_DIR"
fi
