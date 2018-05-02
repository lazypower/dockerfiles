FROM ubuntu:16.04

RUN apt-get update                          && \
    apt install -y build-essential \
                   python2.7-dev \
                   libffi-dev \
                   python-pip \
                   python-setuptools \
                   libssl-dev \
                   python-virtualenv \
                   libjpeg-dev \
                   libxslt1-dev \
                   libpq-dev \
                   virtualenv

RUN virtualenv -p python2.7 /synapse  &&\
    /synapse/bin/pip install --upgrade pip &&\
    /synapse/bin/pip install --upgrade setuptools &&\
    /synapse/bin/pip install https://github.com/matrix-org/synapse/archive/v0.28.1.tar.gz &&\
    /synapse/bin/pip install psycopg2 &&\
    /synapse/bin/pip install lxml

RUN /synapse/bin/python -m synapse.app.homeserver \
    --server-name dashome.co \
    --config-path /synapse/homeserver.yaml \
    --generate-config \
    --report-stats=no

RUN apt-get remove --purge -y build-essential

ENV CONFIG="homeserver.yaml"

WORKDIR /synapse

EXPOSE 8008
EXPOSE 8448

CMD /synapse/bin/python2.7  -m synapse.app.homeserver -c ${CONFIG}
