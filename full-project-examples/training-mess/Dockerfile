# Pour activer l'utilisation de systemd dans le conteneur, lancer sur la machine hôte :
# sudo setsebool -P container_manage_cgroup true

FROM registry.fedoraproject.org/fedora

LABEL Maintainer="https://gitlab.com/users/franckf/"
LABEL Description="DEV : Dockerfile pour mettre en place un environnement nodejs, mysql et proxy httpd avec Podman"

RUN cp /usr/share/zoneinfo/Europe/Paris /etc/localtime

RUN \
  dnf --assumeyes install nodejs && \
  dnf --assumeyes install httpd && \
  dnf --assumeyes install php php-mysqlnd && \
  dnf --assumeyes install mariadb-server && \
  dnf clean all && \
  systemctl enable httpd && \
  systemctl enable mariadb

COPY config/docker/httpd.conf /etc/httpd/conf/httpd.conf
COPY config/docker/mpm.conf /etc/httpd/conf.modules.d/00-mpm.conf

COPY config/docker/default-site.conf /etc/httpd/conf.d/00-default-site.conf
COPY config/docker/adminer-site.conf /etc/httpd/conf.d/10-adminer-site.conf

COPY config/docker/adminer-4.7.5.php /var/www/html/index.php
COPY config/docker/adminer.css       /var/www/html/adminer.css

RUN npm install pm2 --global

RUN useradd --create-home --shell /bin/bash node

RUN mkdir --parents /home/node/app/ && chown --recursive node:node /home/node/app

WORKDIR /home/node/app

EXPOSE 80
EXPOSE 8000

CMD [ "/sbin/init" ]

# Contruire l'image :
# podman build --tag=devnodesqlhttpd .

# Lancer le conteneur :
# podman run --name="$(grep name package.json | cut --delimiter='"' --fields=4)" --detach --interactive --tty --mount type=bind,source=.,destination=/home/node/app --publish=8080:80/tcp --publish=8000:8000/tcp devnodesqlhttpd

# Pour résumer :
#               nodejs est lancé sur le port 8080
#               httpd fait le proxy et redirige le 8080 vers le 80
#               le container redirige le 80 vers le 8080 (car pb la machine locale ne veut pas du port 80 pour les containers)
# adminer sera disponible par : 127.0.0.1:8000 (grace à la configuration apache)

# Entrer dans le conteneur :
# podman exec --user=root --interactive --tty $(grep name package.json | cut --delimiter='"' --fields=4) /bin/bash
