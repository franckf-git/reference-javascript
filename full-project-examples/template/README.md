# template

```
git clone https://gitlab.com/franckf/template.git
cd template
cp config/index.js.example config/index.js
vim config/index.js
```

Lancer en utilisant le compose :

`podman-compose up`

Lancer en utilisant directement le Dockerfile :

```
podman build --tag=template .
podman run --detach --interactive --tty --publish=3000:3000/tcp template
```