const
    express = require('express')
app = express()

const
    path = require('path')
helmet = require('helmet')
compression = require('compression')

const { core } = require('./database/config')
const
    session = require('express-session')
KnexSessionStore = require('connect-session-knex')(session)
store = new KnexSessionStore({ knex: core })

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(helmet())
app.use(compression())
app.use(express.static(path.join(__dirname, 'public')))

// cookies sessions
app.use(session({
    key: `cookies`,
    secret: `123456789`,
    // store: https://www.npmjs.com/package/express-session#compatible-session-stores,
    store,
    resave: false,
    saveUninitialized: true,
    cookie: {
        sameSite: true,
        httpOnly: true,
        // secure: true, if domain with https
        expires: 6000000,
        maxAge: 6000000
    }
}))
app.set('trust proxy', true)

// middleware
const ifNotAuthGoLogin = (req, res, next) => {
    if (req.session.iduser) {
        return next()
    } else {
        res.redirect('/login')
    }
}
const ifAuthSkipLogin = (req, res, next) => {
    if (req.session.iduser) {
        res.redirect('/dashboard')
    } else {
        return next()
    }
}

// views engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// routes
app.use('/login', ifAuthSkipLogin, require('./routes/login'))
app.use('/dashboard', ifNotAuthGoLogin, require('./routes/dashboard'))
app.use('/photo', ifNotAuthGoLogin, require('./routes/photo'))
app.use('/gallery', ifNotAuthGoLogin, require('./routes/gallery'))
app.use('/logout', (req, res) => {
    res.clearCookie(`cookies`)
    res.redirect('/')
})

module.exports = app
