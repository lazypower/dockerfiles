FROM ubuntu:16.04
LABEL maintainer "Charles Butler <chuck@linuxlab.sh>"

RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -q -y --no-install-recommends \
    apt-utils \
    ca-certificates \
    lib32gcc1 \
    net-tools \
    lib32stdc++6 \
    lib32z1 \
    lib32z1-dev \
    curl

ENV HOME="/home/steam" 
ENV PATH="$PATH:/home/steam/Steam"
ENV STEAMCMD_URL="https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz" 
ENV STEAMCMD_DIR="/home/steam/Steam"

RUN useradd steam && \
    mkdir -p /home/steam/Steam && \
    chown -R steam:steam $HOME

USER steam

WORKDIR $HOME

RUN curl -s "$STEAMCMD_URL" | tar -v -C "$STEAMCMD_DIR" -zx
