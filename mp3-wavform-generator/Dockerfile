FROM ubuntu:trusty
VOLUME ["/audio"]
RUN apt-get update && \
    apt-get install -y sox git build-essential python libav-tools && \
    git clone https://github.com/beschulz/wav2png.git /tmp/wav2png && \
    cd /tmp/wav2png/build && make install_dependencies && make all && \
    mv /tmp/wav2png/bin/Linux/wav2png /usr/local/bin/wav2png

ADD batch_process.py /usr/local/bin/batch_process
ADD decodemp3 /usr/local/bin/decodemp3
CMD decodemp3 && /usr/local/bin/batch_process && rm -rf /audio/*.wav
