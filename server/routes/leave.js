const DatabaseLeave = require('../services/leave')
const Leave = require('../lib/leave')

module.exports = {
  get: async (req, res) => {
    const result = await DatabaseLeave.bankHolidays()
    const bankHolidays = result.rows.map(row => row.holidaydate)
    res.render('leave.ejs', { bankHolidays: bankHolidays, user: req.session.user })
  },
  post: async (req, res) => {
    if (parseInt(req.body.personId) === req.session.user.personId) {
      await Leave.submitRequest(req.body)
      res.redirect('/leave')
    }
  }
}
