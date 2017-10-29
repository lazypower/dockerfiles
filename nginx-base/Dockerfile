FROM alpine:3.6

RUN apk add --no-cache nginx pcre libbz2 ca-certificates libressl \
    && mkdir /var/cache/nginx \
    && rm -f /etc/nginx/*.default \
    && mkdir -p /run/nginx

COPY nginx.conf /etc/nginx/
ADD conf.d /etc/nginx/conf.d
ADD default /srv/default

VOLUME ["/var/cache/nginx"]
EXPOSE 80 443

CMD ["nginx"]
