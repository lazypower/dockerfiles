#!/bin/bash

cat << EOF > /root/.s3cfg
[default]
access_key = $AWS_ACCESS_KEY_ID
secret_key = $AWS_SECRET_KEY
EOF

git clone $REPOSITORY blog
cd blog
hugo -t $THEME
s3cmd --acl-public --delete-removed sync public/* s3://$BUCKET/
