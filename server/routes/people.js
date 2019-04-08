const People = require('../lib/people')

module.exports = async (req, res) => {
  const query = `WHERE archived = FALSE`
  const results = await People.getPeople(query)
  const breadcrumb = { route: '/people/archive', text: 'archive' }
  res.render('people.ejs', { people: results, user: req.session.user, breadcrumb: breadcrumb })
}
