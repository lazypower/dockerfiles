#!/bin/bash

set -ex

export LD_LIBRARY_PATH=$(dirname $SDTD_DIR)

export ADMIN_CONFIG="${SDTD_DIR}/Saved/serveradmin.xml"

if [ -n "STEAMCMD_APP_BETA" ]; then
  BETA="-beta $STEAMCMD_APP_BETA"
fi

if [ ! -f $ADMIN_CONFIG ]; then
    if [ -f /config/serveradmin.xml ]; then
	mkdir -p dirname $ADMIN_CONFIG
	cp /config/serveradmin.xml $ADMIN_CONFIG
    fi
fi

steamcmd.sh +login anonymous +force_install_dir $SDTD_DIR +app_update $STEAM_APP_ID $BETA +quit

$SDTD_DIR/7DaysToDieServer.x86_64 -logfile /dev/stdout -configfile=$SDTD_CONFIG -quit -batchmode -nographics -dedicated
