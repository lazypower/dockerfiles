FROM alpine:3.3
LABEL maintainer "Charles Butler <chuck@linuxlab.sh>"


RUN apk -q update \
    && apk -q --no-progress add sed lame \
    && apk add --no-cache -X http://dl-4.alpinelinux.org/alpine/edge/community ezstream \
    && rm -rf /var/cache/apk/*

VOLUME /ezstream
VOLUME /music

CMD ["ezstream", "-c", "/ezstream/config.xml"]
