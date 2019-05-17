const LogIn = require('../lib/log-in')

module.exports = async (req, res) => {
  const result = await LogIn.authenticate(req.body)
  if (result.user) {
    req.session.week = {
      date: new Date(),
      current: true
    }
    req.session.user = result.user
    res.redirect(`/dashboard`)
  } else {
    req.session.flash = {
      message: 'email or password incorrect'
    }

    res.redirect('/')
  }
}
