## -*- docker-image-name: "matrix-appservice-tg" -*-
FROM alpine:3.6

RUN apk add --no-cache nodejs nodejs-npm git ca-certificates
ADD matrix-appservice-tg /matrix-tg
ADD start.sh /start.sh

WORKDIR /matrix-tg
RUN npm install

CMD /start.sh
