FROM alpine:latest

LABEL MAINTAINER "Charles Butler <chuck@linuxlab.sh>"
LABEL GUIDE "https://github.com/matrix-org/synapse/blob/master/docs/turn-howto.rst"

ENV TURN_REALM=turn.example.com
ENV TURN_SHARED_SECRET=xxx
ENV TURN_TLS_KEY=""
ENV TURN_TLS_CERT=""
ENV TURN_TLS_CIPHER="DEFAULT"

RUN apk add --no-cache git build-base openssl-dev libevent libevent-dev linux-headers \
    && git clone https://github.com/coturn/coturn.git /coturn

WORKDIR /coturn
RUN ./configure && make && make install

ADD start.sh /start.sh

CMD /start.sh