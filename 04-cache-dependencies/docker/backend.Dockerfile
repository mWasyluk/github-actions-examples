# Builder stage
FROM maven:3.9.11-eclipse-temurin-17-alpine AS builder
WORKDIR /build
# Copy the source files and build a JAR arch
COPY . .
RUN mvn clean package

FROM eclipse-temurin:17-jre-alpine-3.21
WORKDIR /app
# Copy the JAR arch
COPY --from=builder /build/target/app.jar ./
# Run the app
CMD [ "java", "-jar", "app.jar" ]
