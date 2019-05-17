const Form = require('../lib/person/form')
const Leave = require('../lib/leave')
const Person = require('../lib/person')

module.exports = async (req, res) => {
  if (!req.session.user) {
    res.redirect('/')
  } else {
    const leave = await Leave.getLeave(req.params.personId)
    const options = await Form.options()
    const person = await Person.getPerson(req.params.personId)

    res.render('person.ejs', {
      balance: leave.balance,
      options: options,
      person: person,
      requests: leave.requests,
      user: req.session.user,
      view: 'person'
    })
  }
}
