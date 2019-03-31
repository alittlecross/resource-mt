const people = require('../lib/people')

module.exports = async (req, res) => {
  let query = `WHERE managerid = ${req.session.user.personId} AND personid != ${req.session.user.personId} AND archived = FALSE`
  let results = await people.getPeople(query)
  res.render('dashboard.ejs', { people: results, user: req.session.user })
}
