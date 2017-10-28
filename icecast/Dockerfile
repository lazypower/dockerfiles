FROM alpine:3.3
LABEL maintainer "Charles Butler <chuck@linuxlab.sh>"

ENV ICECAST_VERSION 2.4.2-r1
ENV SOURCE_PASSWORD hackme
ENV RELAY_PASSWORD hackme
ENV ADMIN_PASSWORD hackme

# https://docs.docker.com/engine/reference/builder/#arg
# docker run -p 8000:8000 --net music_stack --name=icecast -d alpine-icecast:dev
ARG user=icecast
ARG group=icecast

RUN apk -q update \
    && apk -q --no-progress add icecast="$ICECAST_VERSION" sed \
    && rm -rf /var/cache/apk/* \
    && mkdir -p /etc/icecast

COPY silence.ogg /usr/share/icecast/silence.ogg
COPY icecast.xml /etc/icecast/icecast.xml
COPY radio.sh /usr/local/bin/radio.sh

RUN mkdir -p /var/log/icecast \
    && chown -R ${user}:${group} /usr/share/icecast \
    && chown -R ${user}:${group} /etc/icecast \
    && chown -R ${user}:${group} /var/log/icecast

EXPOSE 8000

USER ${user}
CMD ["/usr/local/bin/radio.sh"]
