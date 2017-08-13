#!/bin/sh

set -e

sed -i "s/<source-password>hackme/<source-password>$SOURCE_PASSWORD/" /etc/icecast/icecast.xml
sed -i "s/<relay-password>hackme/<relay-password>$RELAY_PASSWORD/" /etc/icecast/icecast.xml
sed -i "s/<admin-password>hackme/<admin-password>$ADMIN_PASSWORD/" /etc/icecast/icecast.xml
# this is for the mountpoint configuration
sed -i "s/<password>hackmemore/<password>$SOURCE_PASSWORD/" /etc/icecast/icecast.xml

icecast -c /etc/icecast/icecast.xml
