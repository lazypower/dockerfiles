#!/bin/sh

set -o errexit

readonly GIT_PROJECT_ROOT="/var/lib/git"
readonly GIT_INITIAL_ROOT="/var/lib/initial"
readonly GIT_HTTP_EXPORT_ALL="true"

readonly GIT_USER="git"
readonly GIT_GROUP="git"

readonly USERID="nginx"
readonly SOCKUSERID=$USERID

readonly FCGIPROGRAM="/usr/bin/fcgiwrap"
readonly FCGISOCKET="/var/run/fcgiwrap.socket"

main() {
    mkdir -p $GIT_PROJECT_ROOT
    mkdir -p /run/nginx

    initialize_services
}

initialize_services() {
    # This was destructive, leave the chmod and roll the dice.
	#chown nginx  $GIT_PROJECT_ROOT
	chmod -R 775 $GIT_PROJECT_ROOT


    /usr/bin/spawn-fcgi \
        -s $FCGISOCKET \
        -F 4 \
        -u $USERID \
        -g $USERID \
        -U $USERID \
        -G $GIT_GROUP -- \
        "$FCGIPROGRAM"
    exec nginx -g 'daemon off;'
}

main "$@"
