const forgotPassword = require('../lib/forgot-password')
const logIn = require('../lib/log-in')

module.exports = {
  get: (_, res) => {
    res.render('forgot-password.ejs')
  },
  post: async (req, res) => {
    const result = await logIn.authenticate(req.body)
    if (result.status) {
      forgotPassword.sendReset(req.body)
      res.redirect('/')
    } else {
      res.redirect('/')
    }
  }
}
