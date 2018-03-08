FROM alpine:3.6

ENV HOMESERVER_ADDRESS="https://matrix.org"
ENV HOMESERVER_DOMAIN="matrix.org"
ENV HOMESERVER_VERIFY_SSL="true"

ENV HOSTNAME="localhost"
ENV PORT="8080"



RUN apk add --no-cache python3 \
    	    	       python3-dev \
		       git \
		       build-base \
		       zlib-dev \
		       jpeg-dev \
		       postgresql-client \
		       sqlite
		       
RUN git clone https://github.com/tulir/mautrix-telegram /mautrix \
    && cd /mautrix \
    && pip3 install --process-dependency-links --upgrade .
