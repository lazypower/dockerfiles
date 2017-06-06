# Usage:
#  docker run --rm -e DISPLAY=$DISPLAY \
# -v /tmp/.X11-unix/:/tmp/.X11-unix  \
# -v $HOME/.Xauthority:/root/.Xauthority
# --net=host lazypower/virt-manager
FROM ubuntu:16.04
LABEL maintainer "Charles Butler <chuck@dasroot.co>"

RUN apt-get update && apt-get install -y --no-install-recommends \
    virt-manager ssh-client ssh-askpass ssh-askpass-gnome spice-client-gtk gir1.2-spice-client-gtk-3.0

RUN adduser ubuntu
USER ubuntu
CMD ["/usr/bin/virt-manager", "--no-fork"]
