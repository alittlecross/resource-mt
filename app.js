const bodyParser = require('body-parser')
const express = require('express')
const session = require('express-session')

const app = express()
const port = process.env.PORT || 3000

const manager = require('./lib/manager')
const options = require('./lib/options')
const person = require('./lib/person')
const user = require('./lib/user')

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

app.get('/people', async (req, res) => {
  res.render('people.ejs')
})

app.get('/person/add', async (req, res) => {
  let results = await options.addPerson()
  res.render('./person/add.ejs', { data: results })
})

app.post('/person/add', async (req, res) => {
  await person.add(req.body)
  res.redirect('/people')
})

app.get('/log-out', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

app.listen(port)

module.exports = app
