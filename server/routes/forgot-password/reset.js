const reset = require('../../lib/forgot-password/reset')

module.exports = {
  get: (req, res) => {
    res.render('./forgot-password/reset.ejs', { flash: res.locals.flash, hash: req.params.hash })
  },
  post: async (req, res) => {
    if (req.body.password === req.body.repassword) {
      await reset.password(req.body.password, req.params.hash)
      res.redirect('/')
    } else {
      req.session.flash = { message: 'passwords did not match' }
      res.redirect(`/${req.params.hash}/forgot-password`)
    }
  }
}
