const form = require('../lib/person/form')
const person = require('../lib/person')

module.exports = async (req, res) => {
  const results = await form.options()
  const result = await person.getPerson(req.params.personId)
  res.render('person.ejs', { options: results, person: result, user: req.session.user })
}
