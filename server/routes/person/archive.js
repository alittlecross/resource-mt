const archive = require('../../lib/person/archive')

module.exports = async (req, res) => {
  if (req.session.user.role === 'Resource Manager') {
    await archive.person(req.params.archived, req.params.personId)
    res.redirect('/people')
  } else {
    res.redirect(`/${req.params.personId}/person`)
  }
}
