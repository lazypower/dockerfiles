#!/bin/sh

set -ex

/usr/local/bin/env-template /templates/options.ini.j2 > /MusicBot/config/options.ini

python3 run.py
