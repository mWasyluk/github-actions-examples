#! /bin/bash

DOCKER_COMPOSE_PATH="docker/docker-compose.yml"

OPTIONAL_VARS=("TODOSAPP_APP_PORT" "TODOSAPP_DB_PORT" "TODOSAPP_DB_HOST" "TODOSAPP_DB_NAME" "TODOSAPP_DB_USERNAME")
REQUIRED_VARS=("TODOSAPP_API_IMAGE_NAME" "TODOSAPP_APP_IMAGE_NAME" "TODOSAPP_DB_PASSWORD" "TODOSAPP_ADMIN_SECRET")

# Verify if docker-compose is present in the docker directory
if [ ! -f "$DOCKER_COMPOSE_PATH" ]; then
    echo "[ERROR] Docker compose file could not be found under "$DOCKER_COMPOSE_PATH"."
    exit 1
fi

# Verify if all required variables are set
MISSING_VARS=()
for VAR in ${REQUIRED_VARS[@]}; do
    if [ -z ${!VAR} ]; then
        MISSING_VARS+=("$VAR")
    fi
done

if [ ${#MISSING_VARS[@]} -gt 0 ]; then
    MISSING_VARS_STR=$(printf '%s, ' "${MISSING_VARS[@]}" | sed 's/, $//')
    echo "[ERROR] The following variables are requiared but missing: $MISSING_VARS_STR."
    exit 1
fi

TODOSAPP_APP_PORT=${TODOSAPP_APP_PORT:=8080}
TODOSAPP_DB_PORT=${TODOSAPP_DB_PORT:=5432}
TODOSAPP_DB_USERNAME=${TODOSAPP_DB_NAME:=todosapp-db}
TODOSAPP_DB_NAME=${TODOSAPP_DB_NAME:=$TODOSAPP_DB_USERNAME}
TODOSAPP_DB_HOST=${TODOSAPP_DB_HOST:=todosapp-db}

ALL_VARS=("${OPTIONAL_VARS[*]}" "${REQUIRED_VARS[*]}")

# Log values of the variables used by this script
echo "[LOG] Running containers with the following configuration:"
for VAR in ${ALL_VARS[@]}; do
    export $VAR=${!VAR}
    case $VAR in
        "TODOSAPP_DB_PASSWORD") VAL=*** ;;
        "TODOSAPP_ADMIN_SECRET") VAL=*** ;;
        *) VAL=${!VAR} ;;
    esac
    printf '      %s\n' "$VAR=$VAL"
done

docker compose -f $DOCKER_COMPOSE_PATH up
