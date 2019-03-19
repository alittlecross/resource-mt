const bodyParser = require('body-parser')
const express = require('express')
const session = require('express-session')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'not-secret'
}))

app.use((req, res, next) => {
  res.locals.sessionFlash = req.session.sessionFlash
  delete req.session.sessionFlash
  next()
})

app.get('/', (req, res) => {
  res.render('index.ejs', { sessionFlash: res.locals.sessionFlash })
})

app.listen(port)

module.exports = app
