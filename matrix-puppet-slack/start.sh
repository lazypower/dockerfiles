#!/bin/sh

cp /config/sl/config.json /puppet/config.json
cp /config/syn/slack-registration.yaml /puppet/slack-registration.yaml

node index.js

