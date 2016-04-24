FROM ubuntu:14.04
MAINTAINER BILL WATTS <bill@billwatts.codes>

RUN sudo apt-get update && sudo apt-get install curl -y

# Get latest download from plex.tv.
RUN DOWNLOAD_URL=`curl -sSL "https://plex.tv/downloads" | grep -o '[^"'"'"']*amd64.deb' | grep -v binaries` \
    && curl -sSL "${DOWNLOAD_URL}" -o plex.deb \
    && dpkg -i plex.deb \
    && rm -f plex.deb

RUN sudo ln -s "/root/Library" "/var/lib/plexmediaserver"

# Expose default plex port.
EXPOSE 32400

ENTRYPOINT ["/usr/sbin/start_pms"]
