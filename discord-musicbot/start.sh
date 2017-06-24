#!/bin/sh

set -ex

/usr/local/bin/env-template /templates/options.ini.gotempl > /MusicBot/config/options.ini
/usr/local/bin/env-template /templates/permissions.ini.gotempl > /MusicBot/config/permissions.ini

python3 run.py
