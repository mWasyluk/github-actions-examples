#! /bin/bash

DOCKER_COMPOSE_PATH="docker/docker-compose.yml"

OPTIONAL_VARS=("APP_PORT" "DB_PORT" "DB_HOST" "DB_NAME" "DB_USERNAME")
REQUIRED_VARS=("DOCKER_API_IMAGE_NAME" "DOCKER_APP_IMAGE_NAME" "DB_PASSWORD" "ADMIN_SECRET")

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

APP_PORT=${APP_PORT:=8080}
DB_PORT=${DB_PORT:=5432}
DB_USERNAME=${DB_NAME:=todosapp-db}
DB_NAME=${DB_NAME:=$DB_USERNAME}
DB_HOST=${DB_HOST:=todosapp-db-host}

ALL_VARS=("${OPTIONAL_VARS[*]}" "${REQUIRED_VARS[*]}")

# Log values of the variables used by this script
echo "[LOG] Running containers with the following configuration:"
for VAR in ${ALL_VARS[@]}; do
    export $VAR=${!VAR}
    case $VAR in
        "DB_PASSWORD") VAL=*** ;;
        "ADMIN_SECRET") VAL=*** ;;
        *) VAL=${!VAR} ;;
    esac
    printf '      %s\n' "$VAR=$VAL"
done

docker compose -f $DOCKER_COMPOSE_PATH up
