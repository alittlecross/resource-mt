const People = require('../lib/people')

module.exports = async (req, res) => {
  if (!req.session.user) {
    res.redirect('/')
  } else {
    const breadcrumb = {
      route: '/people/archive',
      text: 'archive'
    }
    const people = await People.getPeople()

    res.render('people.ejs', {
      breadcrumb: breadcrumb,
      people: people,
      user: req.session.user
    })
  }
}
