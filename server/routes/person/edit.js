const AddEdit = require('../../lib/person/add-edit')
const Edit = require('../../lib/person/edit')
const Form = require('../../lib/person/form')
const Person = require('../../lib/person')

module.exports = {
  get: async (req, res) => {
    if (req.session.user.role === 'Resource Manager') {
      const result = await Person.getPerson(req.params.personId)
      const results = await Form.options()
      res.render('./person/edit.ejs', { flash: res.locals.flash, options: results, person: result, user: req.session.user })
    } else {
      res.redirect(`/${req.params.personId}/person`)
    }
  },
  post: async (req, res) => {
    const personId = `AND personid != ${req.body.personId}`
    const result = await AddEdit.personExists(req.body, personId)
    if (!result.status) {
      await Edit.person(req.body)
      res.redirect(`/${req.body.personId}/person`)
    } else {
      req.session.flash = { message: result.message }
      res.redirect(`/${req.body.personId}/person/edit`)
    }
  }
}
