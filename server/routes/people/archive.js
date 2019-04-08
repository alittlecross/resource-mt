const People = require('../../lib/people')

module.exports = async (req, res) => {
  const query = `WHERE archived = TRUE`
  const results = await People.getPeople(query)
  const breadcrumb = { route: '/people', text: 'people' }
  res.render('people.ejs', { people: results, user: req.session.user, breadcrumb: breadcrumb })
}
