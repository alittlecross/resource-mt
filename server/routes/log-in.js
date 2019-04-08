const LogIn = require('../lib/log-in')

module.exports = async (req, res) => {
  const result = await LogIn.authenticate(req.body)
  if (result.status && result.message === undefined) {
    req.session.user = result.user
    res.redirect('/dashboard')
  } else {
    req.session.flash = { message: result.message }
    res.redirect('/')
  }
}
