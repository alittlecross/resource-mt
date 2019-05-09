const bodyParser = require('body-parser')
const express = require('express')
const session = require('express-session')

const app = express()
const port = process.env.PORT

app.set('views', './server/views')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('./server/public'))
app.use(session(require('./server/plugins/session')))
app.use(require('./server/plugins/flash'))

app.get('/', require('./server/routes/index'))
app.post('/log-in', require('./server/routes/log-in'))
app.get('/dashboard', require('./server/routes/dashboard'))
app.get('/log-out', require('./server/routes/log-out'))

app.get('/people', require('./server/routes/people'))
app.get('/people/archive', require('./server/routes/people/archive'))

app.get('/person/add', require('./server/routes/person/add').get)
app.post('/person/add', require('./server/routes/person/add').post)

app.get('/:personId/person', require('./server/routes/person'))
app.get('/:personId/person/edit', require('./server/routes/person/edit').get)
app.post('/:personId/person/edit', require('./server/routes/person/edit').post)

app.get('/:personId/person/archive/:archived', require('./server/routes/person/archive'))

app.get('/forgot-password', require('./server/routes/forgot-password').get)
app.post('/forgot-password', require('./server/routes/forgot-password').post)

app.get('/:hash/forgot-password', require('./server/routes/forgot-password/reset').get)
app.post('/:hash/forgot-password', require('./server/routes/forgot-password/reset').post)

app.get('/leave', require('./server/routes/leave').get)
app.post('/leave', require('./server/routes/leave').post)

app.get('/:leaveId/leave/:action', require('./server/routes/leave/action'))

app.get('/:leaveId/leave-cancel', require('./server/routes/leave/cancel'))
app.get('/:leaveId/leave-remove/:personId', require('./server/routes/leave/remove'))

app.listen(port)

module.exports = app
