FROM buildpack-deps:xenial-curl

#
# Install apt packages needed by backbeat and buildbot_worker
#
ENV LANG C.UTF-8
COPY guidelines_packages.list buildbot_worker_packages.list /tmp/


RUN curl -sS http://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb http://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update \
    && apt-get install -y yarn \
    && cat /tmp/*packages.list | xargs apt-get install -y \
    && git clone https://github.com/tj/n.git \
    && make -C ./n \
    && n 10 \
    && pip install pip==9.0.1 \
    && rm -rf ./n \
    && rm -rf /var/lib/apt/lists/* \
    && rm -f /tmp/packages.list \
    && rm -f /etc/supervisor/conf.d/*.conf

#
# Run buildbot-worker on startup through supervisor
#
ARG BUILDBOT_VERSION

RUN pip install buildbot-worker==$BUILDBOT_VERSION
ADD supervisor/buildbot_worker.conf /etc/supervisor/conf.d/

CMD ["supervisord", "-n"]
