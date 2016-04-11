#!/bin/bash

export KV_IP=$(docker-machine ssh kvstore 'ifconfig eth1 | grep "inet addr:" | cut -d: -f2 | cut -d" " -f1')

docker-machine create \
    -d digitalocean \
    --swarm \
    --swarm-master \
    --swarm-discovery="consul://${KV_IP}:8500" \
    --engine-opt="cluster-store=consul://${KV_IP}:8500" \
    --engine-opt="cluster-advertise=eth1:2376" \
    queenbee
