FROM alpine:3.6

RUN apk add --no-cache nodejs nodejs-npm git
ADD matrix-appservice-tg /matrix-tg

WORKDIR /matrix-tg
RUN npm install
