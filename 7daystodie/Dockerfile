FROM registry.linuxlab.sh/steamcmd:latest

LABEL maintainer "Charles Butler <chuck@linuxlab.sh>"

ENV STEAM_APP_ID="294420"
ENV STEAM_APP_ANONYMOUS="1"
ENV SDTD_DIR="/home/steam/sevendaystodie"
ENV SDTD_CONFIG="serverconfig.xml"
ENV SDTD_TELNET_PORT="8081"

COPY files/server.sh /server.sh

RUN mkdir -p $SDTD_DIR

WORKDIR $SDTD_DIR

VOLUME $SDTD_DIR

CMD /server.sh
