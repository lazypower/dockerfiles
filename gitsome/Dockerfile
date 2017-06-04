# Credit: https://github.com/jessfraz/dockerfiles/blob/master/gitsome/Dockerfile
FROM python:3.5-alpine
LABEL maintainer "Charles Butler <chuck@dasroot.co>"

RUN apk add --no-cache \
    bash

RUN pip3 install gitsome

ENV HOME /home/anon
RUN adduser -S anon \
    && chown -R anon $HOME

WORKDIR $HOME
USER anon

ENTRYPOINT ["gitsome"]
