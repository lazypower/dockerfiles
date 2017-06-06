# Usage:
#  docker run --rm -e DISPLAY=$DISPLAY \
# -v /tmp/.X11-unix/:/tmp/.X11-unix  \
# -v $HOME/.Xauthority:/root/.Xauthority
# --net=host lazypower/virt-manager
FROM ubuntu:16.04
LABEL maintainer "Charles Butler <chuck@dasroot.co>"

RUN apt-get update && apt-get install -y --no-install-recommends \
    virt-manager ssh-client ssh-askpass ssh-askpass-gnome

RUN adduser ubuntu
USER ubuntu
CMD ["/usr/bin/virt-manager", "--no-fork"]
