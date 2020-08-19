FROM registry.fedoraproject.org/fedora-minimal

LABEL Maintainer="https://gitlab.com/users/franckf/"
LABEL Description="template"

RUN \
  microdnf --assumeyes install nodejs && \
  microdnf --assumeyes install sqlite && \
  microdnf --assumeyes install redis

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install --production --silent

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]