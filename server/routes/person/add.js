const add = require('../../lib/person/add')
const addEdit = require('../../lib/person/add-edit')
const form = require('../../lib/person/form')

module.exports = {
  get: async (req, res) => {
    if (req.session.user.role === 'Resource Manager') {
      let results = await form.options()
      res.render('./person/add.ejs', { flash: res.locals.flash, options: results })
    } else {
      res.redirect('/people')
    }
  },
  post: async (req, res) => {
    let result = await addEdit.personExists(req.body)
    if (!result.status) {
      let person = await add.person(req.body)
      res.redirect(`/${person.rows[0].personid}/person`)
    } else {
      req.session.flash = { message: result.message }
      res.redirect('/person/add')
    }
  }
}
