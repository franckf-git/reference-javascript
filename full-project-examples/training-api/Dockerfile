# Pour activer l'utilisation de systemd dans le conteneur, lancer sur la machine hôte :
# sudo setsebool -P container_manage_cgroup true

FROM registry.fedoraproject.org/fedora

LABEL Maintainer="https://gitlab.com/users/franckf/"
LABEL Description="DEV : Dockerfile pour mettre en place un environnement nodejs, postgre et proxy httpd avec Podman"

RUN cp /usr/share/zoneinfo/Europe/Paris /etc/localtime

RUN \
  dnf --assumeyes install nodejs && \
  dnf --assumeyes install httpd && \
  dnf --assumeyes install php php-pgsql && \
  dnf --assumeyes install sqlite && \
  dnf clean all && \
  systemctl enable httpd && \
  systemctl enable postgresql

COPY docker/httpd.conf /etc/httpd/conf/httpd.conf
COPY docker/mpm.conf /etc/httpd/conf.modules.d/00-mpm.conf

COPY docker/default-site.conf /etc/httpd/conf.d/00-default-site.conf
COPY docker/adminer-site.conf /etc/httpd/conf.d/10-adminer-site.conf

COPY docker/adminer-4.7.5.php /var/www/html/index.php
COPY docker/adminer.css       /var/www/html/adminer.css

RUN npm install pm2 --global

RUN useradd --create-home --shell /bin/bash node

RUN mkdir --parents /home/node/app/ && chown --recursive node:node /home/node/app

WORKDIR /home/node/app

EXPOSE 80
EXPOSE 8000

CMD [ "/sbin/init" ]

# Contruire l'image :
# podman build --tag=devnodepgsqlhttpd .

# Lancer le conteneur :
# podman run --name="$(grep name package.json | cut --delimiter='"' --fields=4)" --detach --interactive --tty --volume=.:/home/node/app:Z --publish=1337:80/tcp --publish=8000:8000/tcp devnodepgsqlhttpd

# Pour résumer :
#               strapi est lancé sur le port 1337
#               httpd fait le proxy et redirige le 1337 vers le 80
#               le container redirige le 80 vers le 1337 (car pb la machine locale ne veut pas du port 80 pour les containers)
# adminer sera disponible par : 127.0.0.1:8000 (grace à la configuration apache)

# Entrer dans le conteneur :
# podman exec --user=root --interactive --tty $(grep name package.json | cut --delimiter='"' --fields=4) /bin/bash
#
# Une fois à l'intérieur initialiser la base de données avec :
# postgresql-setup --initdb --unit postgresql
# systemctl restart postgresql
# su - postgres
# psql
# postgres=# CREATE USER pguser WITH PASSWORD '...';
# postgres=# CREATE DATABASE playgroundapi OWNER pguser;
# COPY docker/pg_hba.conf /var/lib/pgsql/data/pg_hba.conf
# psql -Upguser playgroundapi