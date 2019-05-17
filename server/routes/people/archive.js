const Archive = require('../../lib/people/archive')

module.exports = async (req, res) => {
  if (!req.session.user) {
    res.redirect('/')
  } else if (req.session.user.role === 'Resource Manager') {
    const breadcrumb = {
      route: '/people',
      text: 'people'
    }
    const people = await Archive.getPeople()

    res.render('people.ejs', {
      breadcrumb: breadcrumb,
      people: people,
      user: req.session.user
    })
  } else {
    res.redirect('/people')
  }
}
