#! /bin/bash
API_CONT_NAME=todosapp-api
APP_CONT_NAME=todosapp-app
DB_CONT_NAME=${TODOSAPP_DB_NAME:=todosapp-db}

OPTIONAL_VARS=("TODOSAPP_APP_PORT" "TODOSAPP_DB_HOST" "TODOSAPP_DB_PORT" "TODOSAPP_DB_NAME" "TODOSAPP_DB_USERNAME")
REQUIRED_VARS=("TODOSAPP_API_IMAGE_NAME" "TODOSAPP_APP_IMAGE_NAME" "TODOSAPP_DB_PASSWORD" "TODOSAPP_ADMIN_SECRET")

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
TODOSAPP_DB_HOST=${TODOSAPP_DB_HOST:=todosapp-db}
TODOSAPP_DB_PORT=${TODOSAPP_DB_PORT:=5432}
TODOSAPP_DB_NAME=${TODOSAPP_DB_NAME:=$TODOSAPP_DB_HOST}
TODOSAPP_DB_USERNAME=${TODOSAPP_DB_USERNAME:=$TODOSAPP_DB_NAME}

ALL_VARS=("${OPTIONAL_VARS[*]}" "${REQUIRED_VARS[*]}")

# Log values of the variables used by this script
echo "[LOG] Environment:"
for VAR in ${ALL_VARS[@]}; do
    export $VAR=${!VAR}
    case $VAR in
        "TODOSAPP_DB_PASSWORD") VAL=*** ;;
        "TODOSAPP_ADMIN_SECRET") VAL=*** ;;
        *) VAL=${!VAR} ;;
    esac
    printf '      %s\n' "$VAR=$VAL"
done

# Remove current containers if present; pull and run the newest
echo "[INFO] Clearing space and pulling images..."

docker pull $TODOSAPP_API_IMAGE_NAME 1>/dev/null 2>&1
docker pull $TODOSAPP_APP_IMAGE_NAME 1>/dev/null 2>&1

docker rm -f $API_CONT_NAME $APP_CONT_NAME $DB_CONT_NAME >/dev/null 2>&1 || true
docker network inspect todosapp-net >/dev/null 2>&1 || docker network create todosapp-net

echo "[INFO] Running database..."
docker run -d \
  --name "${TODOSAPP_DB_HOST}" \
  --restart always \
  --network todosapp-net \
  -e POSTGRES_DB="$TODOSAPP_DB_NAME" \
  -e POSTGRES_USER="$TODOSAPP_DB_USERNAME" \
  -e POSTGRES_PASSWORD="$TODOSAPP_DB_PASSWORD" \
  --health-cmd "pg_isready -d $TODOSAPP_DB_NAME -U $TODOSAPP_DB_USERNAME" \
  --health-interval 2s \
  --health-timeout 10s \
  --health-retries 10 \
  --health-start-period 2s \
  -v todosapp-data:/var/lib/postgresql/data \
  postgres:17.5-alpine3.21 1>/dev/null

until [ "$(docker inspect -f "{{if .State.Health}}{{.State.Health.Status}}{{end}}" "$TODOSAPP_DB_HOST")" = "healthy" ]; do
    sleep 1
done

echo "[INFO] ✅ database is healthy. Running api..."

docker run -d \
  --name "$API_CONT_NAME" \
  --restart always \
  --network todosapp-net \
  -e TODOSAPP_DB_HOST="$TODOSAPP_DB_HOST" \
  -e TODOSAPP_DB_PORT="$TODOSAPP_DB_PORT" \
  -e TODOSAPP_DB_NAME="$TODOSAPP_DB_NAME" \
  -e TODOSAPP_DB_USERNAME="$TODOSAPP_DB_USERNAME" \
  -e TODOSAPP_DB_PASSWORD="$TODOSAPP_DB_PASSWORD" \
  -e TODOSAPP_ADMIN_SECRET="$TODOSAPP_ADMIN_SECRET" \
  --health-cmd "wget --spider -q http://localhost:8080/health || exit 1" \
  --health-interval 5s \
  --health-timeout 10s \
  --health-retries 10 \
  --health-start-period 5s \
  "$TODOSAPP_API_IMAGE_NAME" 1>/dev/null

until [ "$(docker inspect -f "{{if .State.Health}}{{.State.Health.Status}}{{end}}" "$API_CONT_NAME")" = "healthy" ]; do
    sleep 1
done

echo "[INFO] ✅ api is healthy. Running app..."

docker run -d \
  --name "$APP_CONT_NAME" \
  --restart always \
  --network todosapp-net \
  -p "$TODOSAPP_APP_PORT:80" \
  "$TODOSAPP_APP_IMAGE_NAME" 1>/dev/null

echo "[INFO] ✅ app is healthy. All is up and running."
