FROM alpine:3.6
LABEL maintainer "chuck <chuck@dasapp.co>"

RUN apk add --no-cache jq curl && curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl && install kubectl /usr/local/bin/kubectl

ADD scanner.sh /scanner

CMD ["/scanner"]


