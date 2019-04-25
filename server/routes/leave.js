const DatabaseLeave = require('../services/leave')
const Leave = require('../lib/leave')

module.exports = {
  get: async (req, res) => {
    const user = req.session.user
    const bankHolidayRecords = await DatabaseLeave.bankHolidays()
    const bankHolidays = bankHolidayRecords.rows.map(row => row.holidaydate)
    const leave = await Leave.getLeave(user.personId)
    const balance = Leave.getBalance(leave)
    res.render('leave.ejs', { balance: balance, bankHolidays: bankHolidays, leave: leave, user: user })
  },
  post: async (req, res) => {
    if (parseInt(req.body.personId) === req.session.user.personId) {
      await Leave.submitRequest(req.body)
      res.redirect('/leave')
    }
  }
}
