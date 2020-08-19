# apis

> Conseil :  
> pour les appels à l'api utiliser `curl -X POST http://localhost:8080/api/user/register`

## Documentations

### Enregistrement des utilisateurs **api/user/register**

name: 3 caractères - obligatoire
email: 6 caractères - forme email - obligatoire
password: 6 caractères - obligatoire

```bash
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"name":"coucou cest moi","email":"coucou@cest.moi","password":"123456798"}' \
  http://localhost:8080/api/user/register
```

### Connexion des utilisateurs **api/user/login**

email: 6 caractères - forme email - obligatoire
password: 6 caractères - obligatoire

```bash
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"email":"coucou@cest.moi","password":"123456798"}' \
  http://localhost:8080/api/user/login
```

## MongoDB sur fedora

### Installation

```bash
vi /etc/yum.repos.d/mongodb-org-4.0.repo
```

```cfg
[mongodb-org-4.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/7/mongodb-org/4.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.0.asc
```

```bash
yum install -y mongodb-org
```

### Connexion

```bash
# lancer le serveur
mongod &
systemctl start mongod
# connexion
mongo
```

```mongodb
> use my_database
switched to db my_database
> db.users.find().pretty()
{
	"_id" : ObjectId("5d4c2eaa6e45f30af02e2fb9"),
	"name" : "coucou cest moi",
	"email" : "coucou@cest.moi",
	"password" : "$HASH",
	"__v" : 0
}
>
```

### To do list

| http://localhost:8080/tasks |  |
| --- | --- |
| get | liste toutes les tâches |
| post | ajout d'une nouvelle tâche |

| http://localhost:8080/tasks/XX (XX est l'id de la tâche) |  |
| --- | --- |
| get | détail d'une tâche |
| post | mise à jour d'une tâche |
| delete | supprimer une tâche |

Pour exemple pour une nouvelle entrée :

```bash
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"name":"faire des trucs");}' \
  http://localhost:8080/api/todo/tasks
```