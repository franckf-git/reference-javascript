FROM registry.fedoraproject.org/fedora

WORKDIR .

COPY ./livre-d-or /var/www/

RUN dnf -y update && \
    dnf -y install nodejs sqlite3

CMD npm start