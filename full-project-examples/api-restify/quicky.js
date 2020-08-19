// necessite express - bodyParser et le fichier dbconnect (pour se connecter à la base sqlite)
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const db = require('./dbconnect')

// activer bodyParser
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

// défini le port - 8080 par défaut
const port = process.env.PORT || 8080

// utilisation des router de express
const router = express.Router()

// definir les routes pour l API ------------------------------------------------------------------

// chaque action est affiché coté serveur (facultatif)
router.use(function (req, res, next) {
    console.log('Appel à l\'api')
    next()
})

// a la racine - message de bienvenue
router.get('/', function (req, res) {
    res.json({
        message: 'Bienvenue les détails de l\'api sont disponibles à https://framagit.org/efydd/apis/blob/master/README.md'
    })
})

// pour les appels généraux
router.route('/quick')
    // les request en POST avec les data name sont enregistrés
    .post(function (req, res) {
        db.run('INSERT INTO quicky (name, created_at) VALUES (?, ?)', [req.body.name, new Date()])
        res.json({
            message: 'Ajouté'
        })
    })
    // les request en GET affiche tout
    .get(function (req, res) {
        fullquery = db.all('SELECT * FROM quicky', (err, row) => {
            if (err)
                res.send(err)
            res.json(row)
        })
    })

// pour les appels spécifiques à un item
router.route('/quick/:_id')
    // les request en GET n'affiche que l item concerné
    .get(function (req, res) {
        db.all('SELECT * FROM quicky where id = ?', [req.params._id], (err, row) => {
            if (err)
                res.send(err)
            //console.log(req.params._id)
            //console.log(row[0].name)
            res.json(row)
        })
    })
    // les request en PUT mettent à jour l item concerné avec les data name envoyés
    .put(function (req, res) {
        db.run('UPDATE quicky set name = ? where id = ?', [req.body.name, req.params._id], (err, row) => {
            if (err)
                res.send(err)
            res.json({
                message: `${req.params._id} mis à jour`
            })
        })
    })
    // les request en DELETE suppriment l item concerné
    .delete(function (req, res) {
        db.run('DELETE FROM quicky where id = ?', [req.params._id], (err, row) => {
            if (err)
                res.send(err)
            res.json({
                message: `${req.params._id} supprimé`
            })
        })
    })
// fin des routes ---------------------------------------------------------------------------------

// toutes les routes précédentes passeront cette méthode pour être envoyées au router de express
app.use('/api', router)

// demarrage du serveur
app.listen(port)
console.log('Serveur en ligne - port ' + port)