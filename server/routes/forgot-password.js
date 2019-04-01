const forgotPassword = require('../lib/forgot-password')
const logIn = require('../lib/log-in')

module.exports = {
  get: (_, res) => {
    res.render('forgot-password.ejs', { flash: res.locals.flash })
  },
  post: async (req, res) => {
    let result = await logIn.authenticate(req.body)
    if (result.message === 'password incorrect') {
      await forgotPassword.sendReset(req.body)
      res.redirect('/')
    } else {
      req.session.flash = { message: result.message }
      res.redirect('/forgot-password')
    }
  }
}
