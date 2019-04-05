const people = require('../lib/people')

module.exports = async (req, res) => {
  let query = `WHERE archived = FALSE`
  let results = await people.getPeople(query)
  let breadcrumb = { route: '/people/archive', text: 'archive' }
  res.render('people.ejs', { people: results, user: req.session.user, breadcrumb: breadcrumb })
}
