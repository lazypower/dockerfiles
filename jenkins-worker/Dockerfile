FROM openjdk:8-jdk-alpine

ARG VERSION=3.16
ARG AGENT_WORKDIR=/home/jenkins/agent
ARG DOCKER_VERSION="17.09.1-ce"

ENV HOME /home/jenkins
RUN addgroup -S -g 10000 jenkins
RUN addgroup -S -g 233 docker
RUN adduser -S -u 10000 -h $HOME -G jenkins -G docker -G ping jenkins

LABEL Description="This is a fork of the docker-slave Dockerfile"

RUN apk add --update --no-cache curl bash git openssh-client openssl shadow \
  && curl --create-dirs -sSLo /usr/share/jenkins/slave.jar https://repo.jenkins-ci.org/public/org/jenkins-ci/main/remoting/${VERSION}/remoting-${VERSION}.jar \
  && chmod 755 /usr/share/jenkins \
  && chmod 644 /usr/share/jenkins/slave.jar \
  && curl --output /tmp/docker.tgz https://download.docker.com/linux/static/stable/x86_64/docker-${DOCKER_VERSION}.tgz \
  && cd /tmp && tar xvfz docker.tgz && install docker/docker /usr/bin/docker && rm -rf docker \
  && usermod -aG docker jenkins \
  && apk del curl
  
USER jenkins
ENV AGENT_WORKDIR=${AGENT_WORKDIR}
RUN mkdir /home/jenkins/.jenkins && mkdir -p ${AGENT_WORKDIR}

VOLUME /home/jenkins/.jenkins
VOLUME ${AGENT_WORKDIR}
WORKDIR /home/jenkins

COPY jenkins-slave /usr/local/bin/jenkins-slave

ENTRYPOINT ["jenkins-slave"]