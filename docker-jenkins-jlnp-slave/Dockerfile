FROM jenkinsci/jnlp-slave
LABEL maintainer "Charles Butler <chuck@dasroot.co>"

ENV DOCKER_VERSION=1.12.0 KUBECTL_VERSION=v1.6.2

USER root
RUN apt-get update -qq && apt-get install -y -qq --no-install-recommends \
    make \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN curl -sSL -o /tmp/docker-${DOCKER_VERSION}.tgz https://get.docker.com/builds/Linux/x86_64/docker-${DOCKER_VERSION}.tgz \
    && tar xzf /tmp/docker-${DOCKER_VERSION}.tgz -C /tmp \
    && install /tmp/docker/docker /usr/local/bin/docker \
    && rm -rf /tmp/docker-${DOCKER_VERSION}.tgz /tmp/docker

RUN curl -L https://storage.googleapis.com/kubernetes-release/release/${KUBECTL_VERSION}/bin/linux/amd64/kubectl -o /usr/local/bin/kubectl \
    && chmod +x /usr/local/bin/kubectl

