const bodyParser = require('body-parser')
const express = require('express')
const session = require('express-session')

const app = express()
const port = process.env.PORT || 3000

const user = require('./lib/user')
const manager = require('./lib/manager')

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

app.post('/log-in', async (req, res) => {
  let result = await user.logIn(req.body)
  if (result.status) {
    req.session.user = result.user[0]
    res.redirect('/dashboard')
  } else {
    req.session.sessionFlash = { message: result.message }
    res.redirect('/')
  }
})

app.get('/dashboard', async (req, res) => {
  let results = await manager.getTeam(req.session.user)
  res.render('dashboard.ejs', { data: results })
})

app.listen(port)

module.exports = app
