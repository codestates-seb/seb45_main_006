FROM openjdk:11
ARG JAR_FILE=server/DevSquad/build/libs/*-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]

