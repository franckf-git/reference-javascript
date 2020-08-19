#! /bin/sh
wget git@framagit.org:efydd/livre-d-or.git

podman build --tag fedora-nodejs:podman .
podman run --name livre-d-or --detach --interactive --tty --volume ~/livre-d-or:/home:Z --publish 8080:8080/tcp localhost/fedora-nodejs:podman
podman exec --user=root --interactive --tty livre-d-or /bin/bash

#dans le container

npm install
npm run start
sqlite3 database.sqlite3 'CREATE TABLE messages (id INTEGER PRIMARY KEY AUTOINCREMENT, content VARCHAR(255), created_at DATETIME);'
