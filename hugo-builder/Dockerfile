FROM alpine:latest
LABEL maintainer "Charles Butler <chuck@dasroot.co>"

ENV REPOSITORY https://github.com/chuckbutler/dasroot-blog.git
ENV GOPATH /go

VOLUME /workspace


RUN apk add --no-cache \
        go \
        git \
        gcc \
        libc-dev \
        libgcc \
    && go get -v github.com/spf13/hugo \
    && cd /go/src/github.com/spf13/hugo \
    && go build -o /usr/bin/hugo . \
    && rm -rf /go \
    && echo "Build complete."

WORKDIR /workspace

ENTRYPOINT ["hugo"]
