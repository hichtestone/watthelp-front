FROM node:12-alpine

RUN apk -v --update add \
        python \
        py-pip \
        groff \
        less \
        mailcap \
        && \
    pip install --upgrade awscli s3cmd python-magic && \
    apk -v --purge del py-pip && \
    rm /var/cache/apk/*

WORKDIR /var/www/html

# add `/app/node_modules/.bin` to $PATH
ENV PATH /var/www/html/node_modules/.bin:$PATH

RUN npm install -g @angular/cli

CMD node
