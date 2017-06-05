# credit: https://github.com/jessfraz/dockerfiles/blob/master/cloudapp/Dockerfile
FROM	ruby:alpine
LABEL maintainer "Charles Butler <chuck@dasroot.co>"

RUN	apk add --no-cache \
	libcurl

RUN	set -x \
	&& apk add --no-cache --virtual .build-deps \
	build-base \
	&& gem install cloudapp --no-rdoc --no-ri \
	&& apk del .build-deps

ENTRYPOINT	["cloudapp"]
