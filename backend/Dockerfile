FROM eclipse-temurin:21-jdk-jammy AS builder
WORKDIR /app
COPY backend/.mvn/ .mvn
COPY backend/mvnw backend/pom.xml ./
RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline
COPY backend/src ./src
RUN ./mvnw package -DskipTests

FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]