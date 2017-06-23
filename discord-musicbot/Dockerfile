FROM ubuntu:16.04

ENV SKIPS='1'
ENV SAVEVIDEOS='no'
ENV COMMANDPREFIX='!'
ENV OWNER_ID='00000000000000'
ENV BOT_TOKEN=''


RUN apt-get update && \
    apt-get install -y build-essential \
                       software-properties-common \

    && add-apt-repository -y ppa:mc3man/xerus-media \

    && apt-get install -y git \
                       ffmpeg \
                       libopus-dev \
                       libffi-dev \
                       libsodium-dev \
                       python3-pip


ADD ./templates /templates
ADD ./start.sh /start.sh

RUN git clone https://github.com/Just-Some-Bots/MusicBot.git /MusicBot -b master
ADD https://github.com/fazy/env-template/releases/download/0.1/env-template-0.1-linux-x86_64 /usr/local/bin/env-template

RUN chmod +x /usr/local/bin/env-template

WORKDIR /MusicBot
RUN python3 -m pip install -U -r requirements.txt

CMD '/start.sh'

