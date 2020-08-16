# lite-api-crud

## Installation

```bash
git clone https://gitlab.com/franckf/lite-api-crud.git
cd lite-api-crud
sed "s/qbvrjkj42545kqzervhj442wrgkfhws5f4ze/$(echo $RANDOM | sha256sum)/g" config/config.js # en production changez le TOKEN_SECRET
podman build --tag=litecrud .
podman run --name=litecrud1 --detach --interactive --tty --publish=3000:3000/tcp litecrud
# pour un accès direct à la base de donnée
podman exec --interactive --tty litecrud1 sqlite3 production.sqlite
```

## Utilisation CRUD simple

### Enregistrement operateur
```bash
curl --location --request POST 'http://127.0.0.1:3000/operateurs' \
--header 'Content-Type: application/json' \
--data-raw '{"email": "login@email.me","mot_de_passe":"motdepasse"}'
```

### Génération du token
```bash
curl --location --request POST 'http://127.0.0.1:3000/authentification' \
--header 'Content-Type: application/json' \
--data-raw '{"email": "login@email.me","mot_de_passe":"motdepasse"}'
```

### Voir tous les opérateurs (token obligatoire)
```bash
curl --location --request GET 'http://127.0.0.1:3000/operateurs/' \
--header 'x-api-key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.TOKEN._YX4-uPvsIQ8NlL4DY1aTAuR0fxB284csSkU4MIR0d8'
```

### Voir un opérateur (token obligatoire)
```bash
curl --location --request GET 'http://127.0.0.1:3000/operateurs/2' \
--header 'x-api-key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.TOKEN._YX4-uPvsIQ8NlL4DY1aTAuR0fxB284csSkU4MIR0d8'
```

### Mettre à jour l'email ou le mot de passe d'un opérateur (token obligatoire)
```bash
curl --location --request PUT 'http://127.0.0.1:3000/operateurs/7' \
--header 'Content-Type: application/json' \
--header 'x-api-key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.TOKEN_DE_7.EKvWvZGpoOdTq_vE-iXwcPPMYmdMg1pmdC-3nCxv2Vk' \
--data-raw '{"email": "sept","mot_de_passe":"septbis"}'
```

### Suppression d'un opérateur (token obligatoire)
```bash
curl --location --request DELETE 'http://127.0.0.1:3000/operateurs/3' \
--header 'x-api-key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.TOKEN._YX4-uPvsIQ8NlL4DY1aTAuR0fxB284csSkU4MIR0d8'
```

### Voir toutes les données (token obligatoire)
```bash
curl --location --request GET 'http://127.0.0.1:3000/datas/' \
--header 'x-api-key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.TOKEN.Ic37MSjQmUNjlN4dR3BXiK9KtlzrFkrqD-4knyIBpIQ'
```

### Voir une donnée particulière (token obligatoire)
```bash
curl --location --request GET 'http://127.0.0.1:3000/datas/7' \
--header 'x-api-key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.TOKEN.Ic37MSjQmUNjlN4dR3BXiK9KtlzrFkrqD-4knyIBpIQ'
```

### Ajouter une donnée (token obligatoire)
```bash
curl --location --request POST 'http://127.0.0.1:3000/datas' \
--header 'Content-Type: application/json' \
--header 'x-api-key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.TOKEN.Ic37MSjQmUNjlN4dR3BXiK9KtlzrFkrqD-4knyIBpIQ' \
--data-raw '{"message": "hello"}'
```

### Mettre à jour une donnée (token obligatoire)
```bash
curl --location --request PUT 'http://127.0.0.1:3000/datas/3' \
--header 'Content-Type: application/json' \
--header 'x-api-key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.TOKEN.Ic37MSjQmUNjlN4dR3BXiK9KtlzrFkrqD-4knyIBpIQ' \
--data-raw '{"message": "hello", "complement": "ceci"}'
```

### Supprimer une donnée (token obligatoire)
```bash
curl --location --request DELETE 'http://127.0.0.1:3000/datas/9' \
--header 'x-api-key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.TOKEN.Ic37MSjQmUNjlN4dR3BXiK9KtlzrFkrqD-4knyIBpIQ'
```