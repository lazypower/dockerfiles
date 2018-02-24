#!/bin/sh

cp /config/tg/telegram-config.yaml .
cp /config/syn/telegram-registration.yaml .

node index.js -c telegram-config.yaml -p $PORT


   
