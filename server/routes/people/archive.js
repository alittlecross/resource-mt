const people = require('../../lib/people')

module.exports = async (req, res) => {
  let query = `WHERE archived = TRUE`
  let results = await people.getPeople(query)
  let breadcrumb = { route: '/people', text: 'people' }
  res.render('people.ejs', { people: results, user: req.session.user, breadcrumb: breadcrumb })
}
