const Add = require('../../lib/person/add')
const AddEdit = require('../../lib/person/add-edit')
const Form = require('../../lib/person/form')

module.exports = {
  get: async (req, res) => {
    if (req.session.user.role === 'Resource Manager') {
      const results = await Form.options()
      res.render('./person/add.ejs', { flash: res.locals.flash, options: results })
    } else {
      res.redirect('/people')
    }
  },
  post: async (req, res) => {
    const result = await AddEdit.personExists(req.body)
    if (!result.status) {
      const person = await Add.person(req.body)
      res.redirect(`/${person.rows[0].personid}/person`)
    } else {
      req.session.flash = { message: result.message }
      res.redirect('/person/add')
    }
  }
}
