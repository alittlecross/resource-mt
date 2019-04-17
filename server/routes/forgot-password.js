const ForgotPassword = require('../lib/forgot-password')
const LogIn = require('../lib/log-in')

module.exports = {
  get: (_, res) => {
    res.render('forgot-password.ejs')
  },
  post: async (req, res) => {
    const result = await LogIn.authenticate(req.body)
    if (result.status) {
      ForgotPassword.sendReset(req.body.email)
      res.redirect('/')
    } else {
      res.redirect('/')
    }
  }
}
