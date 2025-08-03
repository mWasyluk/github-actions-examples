FROM node:lts-alpine3.21 AS builder
WORKDIR /app
# Copy the source files and clean install deps
COPY package*.json .
RUN npm ci
COPY . .
# Build the app
RUN npm run build

FROM nginx:stable-alpine3.21
# Copy the built app
COPY --from=builder /app/build/ /usr/share/nginx/html
# Copy the nginx configuration
COPY --from=nginx default.conf /etc/nginx/conf.d/default.conf
