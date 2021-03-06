const Archive = require('../../lib/person/archive')

module.exports = async (req, res) => {
  if (!req.session.user) {
    res.redirect('/')
  } else if (req.session.user.role === 'Resource Manager') {
    await Archive.person(req.params)
  }
  res.redirect(`/${req.params.personId}/person`)
}
