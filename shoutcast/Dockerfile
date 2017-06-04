FROM ubuntu:14.04
LABEL maintainer "Charles Butler <chuck@dasroot.co>"

ENV ADMINPASS=admin
ENV STREAMPASS=stream

RUN mkdir /opt/shoutcast && \
    mkdir /var/log/shoutcast

WORKDIR /opt/shoutcast

RUN apt-get update && \ 
    apt-get install -y wget && \
    wget http://download.nullsoft.com/shoutcast/tools/sc_serv2_linux_x64-latest.tar.gz && \
    tar -xzf sc_serv2_linux_x64-latest.tar.gz

ADD start.sh /start.sh

EXPOSE 8001 8002

ENTRYPOINT ["/start.sh"]

