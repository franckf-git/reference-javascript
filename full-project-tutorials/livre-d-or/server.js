let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let session = require('express-session')

// moteur de template
app.set('view engine', 'ejs')

// middleware
app.use('/assets', express.static('public'))
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.use(session({
  secret: 'securepassword',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false
  }
}))
// creation de middleware
app.use(require('./middlewares/flash'))

// routes
app.get('/', (request, response) => {
  console.log(process.env.NODE_ENV)
  let Message = require('./models/message')
  Message.all(function (messages) {
    response.render('pages/index', {
      messages: messages
    })
  })
})

app.post('/', (request, response) => {
  if (request.body.message === undefined || request.body.message === '') {
    request.flash('error', 'Aïe ! Vous n\'avez pas entré de message.')
    response.redirect('/')
  } else {
    let Message = require('./models/message')
    Message.create(request.body.message, function () {
      request.flash('success', 'Votre message est posté.')
      response.redirect('/')
    })
  }
})

app.get('/comment/:id', (request, response) => {
  //response.send(request.params.id)
  let Message = require('./models/message')
  Message.find(request.params.id, function () {
    //message = ''
    response.render('comment/show', {
      message: message
    })
  })
})

app.listen(8080)