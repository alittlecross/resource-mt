const Form = require('../lib/person/form')
const Person = require('../lib/person')

module.exports = async (req, res) => {
  const results = await Form.options()
  const result = await Person.getPerson(req.params.personId)
  res.render('person.ejs', { options: results, person: result, user: req.session.user })
}
