FROM alpine:3.6

RUN apk add --no-cache hugo
RUN adduser -D -u 1000 hugo

VOLUME /site
EXPOSE 1313

USER hugo
WORKDIR /site

ENTRYPOINT ["hugo"]
