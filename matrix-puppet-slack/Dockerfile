FROM alpine:3.7

RUN apk add --no-cache nodejs nodejs-npm git \
    && git clone https://github.com/matrix-hacks/matrix-puppet-slack /puppet

WORKDIR /puppet

RUN npm install

CMD node index.js
