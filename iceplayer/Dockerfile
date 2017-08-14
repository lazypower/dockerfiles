FROM alpine:3.4
LABEL maintainer "Chuck Butler <chuck@dasapp.co>"

RUN apk update -q && apk add nginx
RUN echo "daemon off;" >> /etc/nginx/nginx.conf
RUN mkdir -p /run/nginx
RUN ln -sf /dev/stdout /var/log/nginx/access.log && \
    ln -sf /dev/stderr /var/log/nginx/error.log
COPY web /var/lib/nginx/html

CMD ["nginx"]
