const bodyParser = require('body-parser')
const express = require('express')
const session = require('express-session')

const Manager = require('./lib/manager')
const Options = require('./lib/options')
const Person = require('./lib/person')
const User = require('./lib/user')

const app = express()
const port = process.env.PORT

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: process.env.SESSIONSECRET
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
  let result = await User.logIn(req.body)
  if (result.status) {
    req.session.user = result.user[0]
    res.redirect('/dashboard')
  } else {
    req.session.sessionFlash = { message: result.message }
    res.redirect('/')
  }
})

app.get('/dashboard', async (req, res) => {
  let results = await Manager.getTeam(req.session.user)
  res.render('dashboard.ejs', { data: results })
})

app.get('/people', async (req, res) => {
  let results = await Person.getEveryone()
  res.render('people.ejs', { data: results })
})

app.get('/person/add', async (req, res) => {
  let results = await Options.addPerson()
  res.render('./person/add.ejs', { data: results, sessionFlash: res.locals.sessionFlash })
})

app.post('/person/add', async (req, res) => {
  let result = await Person.alreadyExists(req.body)
  if (!result.status) {
    await Person.add(req.body)
    res.redirect('/people')
  } else {
    req.session.sessionFlash = { message: result.message }
    res.redirect('/person/add')
  }
})

app.get('/log-out', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

app.listen(port)

module.exports = app
