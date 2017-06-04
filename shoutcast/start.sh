#!/bin/bash

set -e

mkdir -p /etc/shoutcast

cat << EOF > /etc/shoutcast/shoutcast.conf
adminpassword=$ADMINPASS
password=$SOURCEPASS
requirestreamconfigs=1
EOF

/opt/shoutcast/sc_serv /etc/shoutcast/shoutcast.conf