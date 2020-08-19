# playground-api

## Installation

## Utilisation CRUD simple

### Enregistrement operateur
```bash
curl --location --request POST 'http://127.0.0.1:1337/operateurs' \
--header 'Content-Type: application/json' \
--data-raw '{"email": "login@email.me","mot_de_passe":"motdepasse"}'
```

### Génération du token
```bash
curl --location --request POST 'http://127.0.0.1:1337/authentification' \
--header 'Content-Type: application/json' \
--data-raw '{"email": "login@email.me","mot_de_passe":"motdepasse"}'
```

### Voir tous les opérateurs (token obligatoire)
```bash
curl --location --request GET 'http://127.0.0.1:1337/operateurs/' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.TOKEN._YX4-uPvsIQ8NlL4DY1aTAuR0fxB284csSkU4MIR0d8'
```

### Voir un opérateur (token obligatoire)
```bash
curl --location --request GET 'http://127.0.0.1:1337/operateurs/2' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.TOKEN._YX4-uPvsIQ8NlL4DY1aTAuR0fxB284csSkU4MIR0d8'
```

### Mettre à jour l'email ou le mot de passe d'un opérateur (token obligatoire)
```bash
curl --location --request PUT 'http://127.0.0.1:1337/operateurs/7' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.TOKEN_DE_7.EKvWvZGpoOdTq_vE-iXwcPPMYmdMg1pmdC-3nCxv2Vk' \
--data-raw '{"email": "sept","mot_de_passe":"septbis"}'
```

### Suppression d'un opérateur (token obligatoire)
```bash
curl --location --request DELETE 'http://127.0.0.1:1337/operateurs/3' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.TOKEN._YX4-uPvsIQ8NlL4DY1aTAuR0fxB284csSkU4MIR0d8'
```

### Voir toutes les données (token obligatoire)
```bash
curl --location --request GET 'http://127.0.0.1:1337/datas/' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.TOKEN.Ic37MSjQmUNjlN4dR3BXiK9KtlzrFkrqD-4knyIBpIQ'
```

### Voir une donnée particulière (token obligatoire)
```bash
curl --location --request GET 'http://127.0.0.1:1337/datas/7' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.TOKEN.Ic37MSjQmUNjlN4dR3BXiK9KtlzrFkrqD-4knyIBpIQ'
```

### Ajouter une donnée (token obligatoire)
```bash
curl --location --request POST 'http://127.0.0.1:1337/datas' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.TOKEN.Ic37MSjQmUNjlN4dR3BXiK9KtlzrFkrqD-4knyIBpIQ' \
--data-raw '{"message": "hello"}'
```

### Mettre à jour une donnée (token obligatoire)
```bash
curl --location --request PUT 'http://127.0.0.1:1337/datas/3' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.TOKEN.Ic37MSjQmUNjlN4dR3BXiK9KtlzrFkrqD-4knyIBpIQ' \
--data-raw '{"message": "hello", "complement": "ceci"}'
```

### Supprimer une donnée (token obligatoire)
```bash
curl --location --request DELETE 'http://127.0.0.1:1337/datas/9' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.TOKEN.Ic37MSjQmUNjlN4dR3BXiK9KtlzrFkrqD-4knyIBpIQ'
```