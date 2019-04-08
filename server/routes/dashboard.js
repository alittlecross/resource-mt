const People = require('../lib/people')

module.exports = async (req, res) => {
  const query = `WHERE managerid = ${req.session.user.personId} AND personid != ${req.session.user.personId} AND archived = FALSE`
  const results = await People.getPeople(query)
  res.render('dashboard.ejs', { people: results, user: req.session.user })
}
