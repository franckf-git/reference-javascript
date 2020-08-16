'use strict'

const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const compression = require('compression')
const logger = require('morgan')
const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash')
const { startCron } = require('./helpers/cron')
require('dotenv')
  .config()

startCron()

const app = express()

require('./middlewares/authentification/passport')(passport)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev', { skip: function (req, res) { return res.statusCode < 400 } }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(helmet())
app.use(compression())
app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
  secret: process.env.SECRET_SESSION,
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

const indexRouter = require('./routes/index')
app.use('/', indexRouter)

const baseRouter = require('./routes/base')
app.use('/base', baseRouter)

const mailRouter = require('./routes/mail')
app.use('/mail', mailRouter)

const spacexRouter = require('./routes/spacex')
app.use('/spacex', spacexRouter)

const uuidRouter = require('./routes/uuid')
app.use('/uuid', uuidRouter)

const radcheckRouter = require('./routes/radcheck')
app.use('/radcheck', radcheckRouter)

const utilisateursRouter = require('./routes/utilisateurs')
app.use('/utilisateurs', utilisateursRouter)

app.use('/authentificationsession', require('./routes/authentificationsession'))

app.use('/envoiimages', require('./routes/envoiimages'))

app.use('/mailtemplate', require('./routes/mailtemplate'))

app.use('/flasheur', require('./routes/flasheur'))

app.use('/listeneur', require('./routes/listeneur'))

app.use('/validation-mail', require('./app/validation-mail/routes'))

app.use('/action-serveur', require('./app/action-serveur/routes'))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error', { title: 'ERROR' })
})

module.exports = app
