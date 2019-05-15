const Leave = require('../lib/leave')

module.exports = {
  get: async (req, res) => {
    const user = req.session.user
    const results = await Leave.bankHolidays()
    const bankHolidays = results.map(row => row.holidaydate)
    const leave = await Leave.getLeave(user.personId)
    res.render('leave.ejs', { balance: leave.balance, bankHolidays: bankHolidays, flash: res.locals.flash, requests: leave.requests, user: user, view: 'leave' })
  },
  post: async (req, res) => {
    if (parseInt(req.body.personId) === req.session.user.personId) {
      let result = await Leave.submitRequest(req.body)
      if (!result.status) req.session.flash = { message_1: result.message_1, message_2: result.message_2 }
      res.redirect('/leave')
    }
  }
}
