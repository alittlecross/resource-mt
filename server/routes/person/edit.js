const addEdit = require('../../lib/person/add-edit')
const edit = require('../../lib/person/edit')
const form = require('../../lib/person/form')
const person = require('../../lib/person')

module.exports = {
  get: async (req, res) => {
    if (req.session.user.role === 'Resource Manager') {
      const result = await person.getPerson(req.params.personId)
      const results = await form.options()
      res.render('./person/edit.ejs', { flash: res.locals.flash, options: results, person: result, user: req.session.user })
    } else {
      res.redirect(`/${req.params.personId}/person`)
    }
  },
  post: async (req, res) => {
    const personId = `AND personid != ${req.body.personId}`
    const result = await addEdit.personExists(req.body, personId)
    if (!result.status) {
      await edit.person(req.body)
      res.redirect(`/${req.body.personId}/person`)
    } else {
      req.session.flash = { message: result.message }
      res.redirect(`/${req.body.personId}/person/edit`)
    }
  }
}
