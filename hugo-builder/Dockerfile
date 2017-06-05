# Docker container to run automated builds of a Hugo based website.

# Requires the following variables to be passed in:

# AWS_ACCESS_KEY_ID
# AWS_SECRET_KEY
# BUCKET
# THEME
# Setting the following allow the container to build the static content, and subsequently publish as a sync to a given S3 bucket.

FROM ubuntu:16.04
LABEL maintainer "Charles Butler <chuck@dasroot.co>"

ENV REPOSITORY https://github.com/chuckbutler/dasroot-blog.git
ENV AWS_ACCESS_KEY_ID XXX
ENV AWS_SECRET_KEY YYY
ENV BUCKET www.example.com
ENV GOPATH /go/
ENV THEME Porto
RUN apt-get update && apt-get upgrade -y && apt-get install -y git python-pygments s3cmd
ADD https://github.com/spf13/hugo/releases/download/v0.21/hugo_0.21_Linux-64bit.deb /tmp/
RUN dpkg -i /tmp/hugo_0.21_Linux-64bit.deb && rm /tmp/hugo*.deb
ADD build.sh /build.sh
CMD ["/build.sh"]
