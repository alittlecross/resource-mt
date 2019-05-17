const Add = require('../../lib/person/add')
const AddEdit = require('../../lib/person/add-edit')
const Form = require('../../lib/person/form')

module.exports = {
  get: async (req, res) => {
    if (!req.session.user) {
      res.redirect('/')
    } else if (req.session.user.role === 'Resource Manager') {
      const options = await Form.options()

      res.render('./person/add.ejs', {
        flash: res.locals.flash,
        options: options
      })
    } else {
      res.redirect('/people')
    }
  },

  post: async (req, res) => {
    if (req.session.user.role === 'Resource Manager') {
      const result = await AddEdit.personExists(req.body)

      if (!result.status) {
        const personId = await Add.person(req.body)

        res.redirect(`/${personId}/person`)
      } else {
        req.session.flash = {
          message: 'staff number or email already in use'
        }

        res.redirect('/person/add')
      }
    }
  }
}
