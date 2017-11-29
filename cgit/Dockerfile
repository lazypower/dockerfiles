FROM alpine:edge

RUN apk add --no-cache nginx fcgiwrap git cgit spawn-fcgi               && \
    adduser git -h /var/lib/git -D                                      && \
    adduser nginx git                                                   && \
    adduser nginx users                                                 && \

    git config --system http.receivepack true                           && \
    git config --system http.uploadkpack true                           && \
    git config --system user.email "gitserver@git.com"                  && \
    git config --system user.name "Git server "                         && \

    ln -sf /dev/stdout /var/log/nginx/access.log                        && \
    ln -sf /dev/stderr /var/log/nginx/error.log


ADD ./etc/nginx.conf /etc/nginx/conf.d/default.conf
ADD ./etc/cgitrc /etc/cgitrc
ADD ./entrypoint.sh /usr/local/bin/entrypoint

CMD ["entrypoint"]

