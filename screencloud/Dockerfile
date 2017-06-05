# usage:
# This container requires X11 socket and access. Use the following breakdown
# as a guide for running:
#  docker run -ti --rm -e DISPLAY=$DISPLAY \
#  -v /tmp/.X11-unix/:/tmp/.X11-unix \
#  -v $HOME/.Xauthority:/root/.Xauthority \
#  --net=host \
#  lazypower/screencloud

FROM ubuntu:16.04

LABEL maintainer "Charles Butler <chuck@dasroot.co>"

ADD http://de.archive.ubuntu.com/ubuntu/pool/universe/q/qtmobility/libqtmultimediakit1_1.2.0-1ubuntu2_amd64.deb /tmp/libqtmultimediakit1_1.2.0-1ubuntu2_amd64.deb
ADD http://download.opensuse.org/repositories/home:olav-st/xUbuntu_16.04/Release.key /root/Release.key
RUN apt-get update \
    && apt-get install -y dbus fontconfig fontconfig-config fonts-dejavu-core iso-codes krb5-locales libasound2 libasound2-data libasyncns0 libaudio2 libavahi-client3 libavahi-common-data libavahi-common3 libbsd0 libcap-ng0 libcups2 libdbus-1-3 libdrm-amdgpu1 libdrm-intel1 libdrm-nouveau2 libdrm-radeon1 libdrm2 libedit2 libelf1 libexpat1 libffi6 libflac8 libfontconfig1 libfreetype6 libgl1-mesa-dri libgl1-mesa-glx libglapi-mesa libglib2.0-0 libglib2.0-data libgmp10 libgnutls30 libgssapi-krb5-2 libgstreamer-plugins-base0.10-0 libgstreamer0.10-0 libhogweed4 libice6 libicu55 libjbig0 libjpeg-turbo8 libjpeg8 libjson-c2 libk5crypto3 libkeyutils1 libkrb5-3 libkrb5support0 liblcms2-2 libllvm3.8 libmng2 libmysqlclient20 libnettle6 libogg0 liborc-0.4-0 libp11-kit0 libpciaccess0 libpng12-0 libpulse0 libqt4-dbus libqt4-declarative libqt4-network libqt4-opengl libqt4-script libqt4-sql libqt4-sql-mysql libqt4-xml libqt4-xmlpatterns libqtcore4 libqtdbus4 libqtgui4 libsm6 libsndfile1 libtasn1-6 libtiff5 libtxc-dxtn-s2tc0 libvorbis0a libvorbisenc2 libwrap0 libx11-6 libx11-data libx11-xcb1 libxau6 libxcb-dri2-0 libxcb-dri3-0 libxcb-glx0 libxcb-present0 libxcb-sync1 libxcb1 libxdamage1 libxdmcp6 libxext6 libxfixes3 libxi6 libxml2 libxrender1 libxshmfence1 libxt6 libxv1 libxxf86vm1 mysql-common qdbus qt-at-spi qtchooser qtcore4-l10n sgml-base shared-mime-info tcpd ucf x11-common xdg-user-dirs xml-core wget \
    && dpkg -i /tmp/libqtmultimediakit1_1.2.0-1ubuntu2_amd64.deb

RUN echo 'deb http://download.opensuse.org/repositories/home:/olav-st/xUbuntu_16.04/ /' > /etc/apt/sources.list.d/screencloud.list \
    && apt-key add - < /root/Release.key \
    && apt-get update && apt-get install -y screencloud

CMD ["/usr/bin/screencloud"]
