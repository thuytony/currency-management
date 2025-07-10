FROM eclipse-temurin:17-jdk AS build

WORKDIR /app

# Install Maven
RUN apt-get update && apt-get install -y maven

# Copy pom.xml and download dependencies
COPY apps/backend/pom.xml ./
RUN mvn dependency:go-offline

# Copy source code and build
COPY apps/backend/src ./src
RUN mvn clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:17-jre

WORKDIR /app

# Copy built jar from build stage
COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar app.jar

# Run application
EXPOSE 8080
CMD ["java", "-jar", "app.jar"] 