const DatabaseLeave = require('../services/leave')
const Leave = require('../lib/leave')

module.exports = {
  get: async (req, res) => {
    const bankHolidayRecords = await DatabaseLeave.bankHolidays()
    const bankHolidayDates = bankHolidayRecords.rows.map(row => row.holidaydate)
    const leave = await DatabaseLeave.getRequest(req.session.user)
    res.render('leave.ejs', { bankHolidays: bankHolidayDates, leave: leave, user: req.session.user })
  },
  post: async (req, res) => {
    if (parseInt(req.body.personId) === req.session.user.personId) {
      await Leave.submitRequest(req.body)
      res.redirect('/leave')
    }
  }
}
