const Archive = require('../../lib/person/archive')

module.exports = async (req, res) => {
  if (req.session.user.role === 'Resource Manager') {
    await Archive.person(req.params.archived, req.params.personId)
    res.redirect('/people')
  } else {
    res.redirect(`/${req.params.personId}/person`)
  }
}
