# docker run -ti -v $HOME/.config/tootstream:/home/tootstream/.config/tootstream tootstream
FROM alpine:3.6
LABEL maintainer "Charles Butler <chuck@dasroot.co>"

RUN apk add --no-cache python3 \
    && pip3 install tootstream \
    && adduser -D -u 1000 tootstream

VOLUME /home/tootstream/.config/tootstream

USER tootstream
WORKDIR /home/tootstream

ENTRYPOINT ["tootstream"]
