#!/bin/bash

set -e

if [ ! -z $1 ]; then
  START=$1
fi

if [ ! -z $2 ]; then
  NUM_WORKERS=$2
fi



export KV_IP=$(docker-machine ssh kvstore 'ifconfig eth1 | grep "inet addr:" | cut -d: -f2 | cut -d" " -f1')

for i in $(seq $START $NUM_WORKERS); do
    docker-machine create \
        -d digitalocean \
        --swarm \
        --swarm-discovery="consul://${KV_IP}:8500" \
        --engine-opt="cluster-store=consul://${KV_IP}:8500" \
        --engine-opt="cluster-advertise=eth1:2376" \
        workerbee-${i} &
done;
wait
