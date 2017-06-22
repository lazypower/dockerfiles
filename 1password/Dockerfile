# To build:
# docker build -t geekylucas/1password-wine .
#
# To run:
# docker run \
#   -it \
#   -v /tmp/.X11-unix:/tmp/.X11-unix \
#   -e DISPLAY=unix$DISPLAY \
#   -v "$HOME/Dropbox/1Password.agilekeychain:/wine/drive_c/users/root/My Documents/1Password.agilekeychain" \
#   --net="host" \
#   --name 1password-wine \
#   geekylucas/1password-wine \
#   bash
#
# To operate:
# Use up arrow for handy commands
#
# To start after first run:
# docker start -i geekylucas/1password-wine

FROM jess/wine
MAINTAINER Lucas Chan <docker@lucaschan.com>

ENV WINEPREFIX=/wine

RUN \
  apt-get update && \
  apt-get install -y --no-install-recommends \
    xauth \
    xvfb \
  && \
  rm -rf /var/lib/apt/lists/*

ADD https://d13itkw33a7sus.cloudfront.net/dist/1P/win4/1Password-4.6.0.598.exe /usr/src/

# Auto install 1Password using xvfb as null display.
# WINEDLLOVERRIDES=mscoree=d to disable wine's mono install prompt.
# wineserver -k to flush registry files to disk after install.
RUN xvfb-run -a bash -c "\
  WINEDLLOVERRIDES=mscoree=d wine /usr/src/1Password-4.6.0.598.exe /VERYSILENT /DIR=c:\1Password && \
  grep -A4 Installation /wine/drive_c/1Password/1Password.InnoSetup.log.txt && \
  /usr/lib/i386-linux-gnu/wine/bin/wineserver -k"

RUN echo >/root/.bash_history "wine /wine/drive_c/1Password/Agile1pAgent.exe" && \
  echo >>/root/.bash_history "wine /wine/drive_c/1Password/1Password.exe"

EXPOSE 6258

CMD ["wine", "/wine/drive_c/1Password/1Password.exe"]

