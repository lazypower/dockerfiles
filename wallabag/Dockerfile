FROM alpine:3.6
LABEL maintainer "Charles Butler <chuck@linuxlab.sh>"

RUN apk add --no-cache \
  curl git php7 php7-phar php7-openssl \
  nginx \
  php7-fpm php7-cgi php7-session php7-ctype php7-dom php7-json php7-gd \
  php7-mbstring php7-xml php7-tidy php7-curl php7-gettext php7-pgsql \
  php7-pdo_pgsql php7-iconv php7-simplexml php7-tokenizer


ADD https://getcomposer.org/installer /installer
RUN chmod +x /installer \
    && php /installer --install-dir=/usr/bin --filename=composer 
 
RUN git clone https://github.com/wallabag/wallabag.git -b 2.0.8 --depth 1 /wallabag

WORKDIR /wallabag

ADD auth.json /root/.composer/auth.json
RUN composer install --no-dev -o --no-scripts

ADD parameters.yml /wallabag/app/config/parameters.yml
ADD nginx.conf /etc/nginx/nginx.conf

ENV SYMFONY_ENV=prod
EXPOSE 80

CMD composer run-script post-cmd -- --no-interaction && chown -R nobody /wallabag/var && php-fpm7 && nginx -g "daemon off;"
