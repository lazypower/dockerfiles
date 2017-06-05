#credit: https://github.com/jessfraz/dockerfiles/blob/master/rainbowstream/Dockerfile 
# docker run -it --rm \
#	-v /etc/localtime:/etc/localtime:ro \
#	-v $HOME/.rainbow_oauth:/root/.rainbow_oauth \ # mount config files
#	-v $HOME/.rainbow_config.json:/root/.rainbow_config.json \
#	--name rainbowstream \
#	lazypower/rainbowstream
#
FROM python:2-alpine
LABEL maintainer "Charles Butler <chuck@dasroot.co>"

RUN apk --no-cache add \
	build-base \
	ca-certificates \
	freetype \
	freetype-dev \
	openjpeg-dev \
	zlib-dev

RUN USER=root pip install \
	pillow==2.8.0 \
	rainbowstream

ENTRYPOINT [ "rainbowstream" ]
