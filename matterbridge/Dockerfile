FROM alpine:edge
ENTRYPOINT ["/bin/matterbridge"]

RUN apk update && apk add go git gcc musl-dev ca-certificates  \
        && export GOPATH=/go \
        && go get github.com/42wim/matterbridge \
        && cd /go/src/github.com/42wim/matterbridge \
        && go get \
        && go build -x -ldflags "-X main.githash=$(git log --pretty=format:'%h' -n 1)" -o /bin/matterbridge \
        && rm -rf /go \
        && apk del --purge git go gcc musl-dev
