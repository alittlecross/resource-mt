const Archive = require('../../lib/people/archive')

module.exports = async (req, res) => {
  const results = await Archive.getPeople()
  const breadcrumb = { route: '/people', text: 'people' }
  res.render('people.ejs', { people: results, user: req.session.user, breadcrumb: breadcrumb })
}
