#!/bin/sh

cat > /etc/turnserver.conf <<EOF
listening-port=3478
tls-listening-port=5349
verbose
use-auth-secret
static-auth-secret=${TURN_SHARED_SECRET}
realm=${TURN_REALM}
no-tcp-relay
log-file=stdout
no-tlsv1
no-tlsv1_1
no-tlsv1_2
cert=${TURN_TLS_CERT}
pkey=${TURN_TLS_KEY}
cipher-list=${TURN_TLS_CIPHER}
EOF

turnserver
