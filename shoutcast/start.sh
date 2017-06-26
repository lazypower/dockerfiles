#!/bin/bash

set -e

mkdir -p /etc/shoutcast

cat << EOF > /etc/shoutcast/shoutcast.conf
; NOTE: for any relative paths specified are relative to
; sc_serv and not to where the conf file is being stored

; here we will setup where the log and other related files
; will be stored. make sure that these folders exist else
; sc_serv will throw an error and will close itself down.
; we will make the logs save to the sc_serv2 directory
logfile=logs/sc_serv.log
w3clog=logs/sc_w3c.log
banfile=control/sc_serv.ban
ripfile=control/sc_serv.rip


; for testing we will make the server only work locally
; (i.e. localhost / 127.0.0.1) though if this is left out
; or set to publicserver=always then we attempt to make a
; connection to the YP for listing - do not forget to add
; in a 'streamauthhash' value for any public streams made
publicserver=$PUBLICSERVER


; if you're wanting to use a different port to use for any
; connections then you can use this option e.g. to use 80
; otherwise port 8000 is used as the default to listen on.
portbase=$PORTBASE

; password used by sc_trans or the Winamp dsp plug-in
; NOTE: remember to change this to something else
password=$STREAMPASS

; password used for accessing the administation pages
; NOTE: remember to change this to something else
adminpassword=$ADMINPASS

EOF


/opt/shoutcast/sc_serv /etc/shoutcast/shoutcast.conf
