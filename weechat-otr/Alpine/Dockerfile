FROM alpine:3.6

RUN apk add --no-cache weechat python3 python3-dev build-base tzdata \
    && pip3 install python-potr \
    && echo "America/Chicago" | tee /etc/timezone \
    && ln -fs /usr/share/zoneinfo/America/Chicago /etc/localtime \
    && adduser -D -u 1000 weechat
ADD https://raw.githubusercontent.com/mmb/weechat-otr/master/weechat_otr.py /usr/share/weechat/python/otr.py
USER weechat
WORKDIR /home/weechat

RUN # Enable otr \
    echo /python load /usr/share/weechat/python/otr.py >> config.txt && \
    echo /set weechat.bar.status.items "\"[time],[buffer_last_number],[buffer_plugin],[otr],buffer_number+:+buffer_name+(buffer_modes)+{buffer_nicklist_count}+buffer_zoom+buffer_filter,[lag],[hotlist],completion,scroll\"" >> config.txt && \
    # Connect with SSL \
    echo /server add freenode chat.freenode.net >> config.txt \
    && echo /set irc.server.freenode.addresses \"chat.freenode.net/7000\" >> config.txt \
    && echo /set irc.server.freenode.ssl on >> config.txt

ENTRYPOINT sh -c 'if [ -f "/home/weechat/.weechat/irc.conf" ] ; then weechat ; else weechat -r "`cat config.txt | tr \"\\n\" \"\;\"`" ; fi'

