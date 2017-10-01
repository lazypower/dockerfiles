#!/bin/sh

set -eu

SLEEP="${SLEEP:-300}"
NAMESPACE="${NAMESPACE:-default}"

scan() {
    # Read the kube token from the system
    KUBE_TOKEN=$(cat /var/run/secrets/kubernetes.io/serviceaccount/token)

    if [ -z "${KUBE_TOKEN}" ]; then
        echo "Missing Kube Token. Run this pod in a namespace with service accounts enabled."
        exit 1
    fi

    # Query the API and prepare the result to feed into JQ
    json=$(curl -sSk -H "Authorization: Bearer ${KUBE_TOKEN}" https://${KUBERNETES_SERVICE_HOST}:${KUBERNETES_PORT_443_TCP_PORT}/api/v1/namespaces/${NAMESPACE}/pods)

    # Sift through the data and find only the names of failed pods
    located_pods=$(echo ${json} | jq '.items[] | {"name": .metadata.name, "status": .status.phase} | select(.status == "Failed") | .name ')

    # Timestamp when something happened for auditing purposes...
    date
    if [ ! -z "${located_pods}" ]; then
        echo $located_pods | xargs kubectl delete po
    fi
}

# Main run loop
while :
do
    scan
    sleep $SLEEP
done
