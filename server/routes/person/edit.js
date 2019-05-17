const AddEdit = require('../../lib/person/add-edit')
const Edit = require('../../lib/person/edit')
const Form = require('../../lib/person/form')
const Person = require('../../lib/person')

module.exports = {
  get: async (req, res) => {
    if (!req.session.user) {
      res.redirect('/')
    } else if (req.session.user.role === 'Resource Manager') {
      const options = await Form.options()
      const person = await Person.getPerson(req.params.personId)

      res.render('./person/edit.ejs', {
        flash: res.locals.flash,
        options: options,
        person: person,
        user: req.session.user
      })
    } else {
      res.redirect(`/${req.params.personId}/person`)
    }
  },

  post: async (req, res) => {
    if (req.session.user.role === 'Resource Manager') {
      const result = await AddEdit.personExists(req.body, true)

      if (!result.status) {
        await Edit.person(req.body)

        res.redirect(`/${req.body.personId}/person`)
      } else {
        req.session.flash = {
          message: 'staff number or email already in use'
        }

        res.redirect(`/${req.body.personId}/person/edit`)
      }
    }
  }
}
