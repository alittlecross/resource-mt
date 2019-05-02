const Leave = require('../lib/leave')

module.exports = {
  get: async (req, res) => {
    const user = req.session.user
    const bankHolidays = await Leave.bankHolidays()
    const leave = await Leave.getLeave(user.personId)
    res.render('leave.ejs', { balance: leave.balance, bankHolidays: bankHolidays, requests: leave.requests, user: user })
  },
  post: async (req, res) => {
    if (parseInt(req.body.personId) === req.session.user.personId) {
      await Leave.submitRequest(req.body)
      res.redirect('/leave')
    }
  }
}
