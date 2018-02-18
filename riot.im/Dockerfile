FROM registry.linuxlab.sh/nginx-base:latest

LABEL MAINTAINER "Charles Butler <chuck@linuxlab.sh>"

ARG RIOT_VERSION="v0.13.5"

ADD https://github.com/vector-im/riot-web/releases/download/$RIOT_VERSION/riot-$RIOT_VERSION.tar.gz /tmp/riot.tgz
WORKDIR /tmp
RUN tar xfz /tmp/riot.tgz \
    && rm -rf /srv/default /tmp/riot.tgz \
    && mv /tmp/riot-${RIOT_VERSION} /srv/default