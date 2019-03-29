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
    req.session.user = result.user
    res.redirect('/dashboard')
  } else {
    req.session.sessionFlash = { message: result.message }
    res.redirect('/')
  }
})

app.get('/dashboard', async (req, res) => {
  let results = await Manager.getTeam(req.session.user)
  res.render('dashboard.ejs', { people: results, user: req.session.user })
})

app.get('/people', async (req, res) => {
  let results = await Person.getEveryone()
  res.render('people.ejs', { people: results, user: req.session.user })
})

app.get('/person/add', async (req, res) => {
  if (req.session.user.role === 'Resource Manager') {
    let results = await Options.person()
    res.render('./person/add.ejs', { options: results, sessionFlash: res.locals.sessionFlash })
  } else {
    res.redirect('/people')
  }
})

app.post('/person/add', async (req, res) => {
  let result = await Person.alreadyExists(req.body)
  if (!result.status) {
    let person = await Person.add(req.body)
    res.redirect(`/${person[0].rows[0].personid}/person`)
  } else {
    req.session.sessionFlash = { message: result.message }
    res.redirect('/person/add')
  }
})

app.get('/:personId/person', async (req, res) => {
  let result = await Person.getOne(req.params.personId)
  let results = await Options.person()
  res.render('./person/view.ejs', { person: result, options: results, user: req.session.user })
})

app.get('/:personId/person/edit', async (req, res) => {
  if (req.session.user.role === 'Resource Manager') {
    let result = await Person.getOne(req.params.personId)
    let results = await Options.person()
    res.render('./person/edit.ejs', { person: result, options: results, sessionFlash: res.locals.sessionFlash })
  } else {
    res.redirect(`/${req.params.personId}/person`)
  }
})

app.post('/person/edit', async (req, res) => {
  let extra = `personid != ${req.body.personId} AND`
  let result = await Person.alreadyExists(req.body, extra)
  if (!result.status) {
    await Person.update(req.body)
    res.redirect(`/${req.body.personId}/person`)
  } else {
    req.session.sessionFlash = { message: result.message }
    res.redirect(`/${req.body.personId}/person/edit`)
  }
})

app.get('/log-out', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

app.listen(port)

module.exports = app
