const Leave = require('../lib/leave')

module.exports = {
  get: async (req, res) => {
    if (!req.session.user) {
      res.redirect('/')
    } else {
      const results = await Leave.bankHolidays()
      const bankHolidays = results.rows.map(row => row.holidaydate)
      const leave = await Leave.getLeave(req.session.user.personId)

      res.render('leave.ejs', {
        balance: leave.balance,
        bankHolidays: bankHolidays,
        flash: res.locals.flash,
        requests: leave.requests,
        user: req.session.user,
        view: 'leave'
      })
    }
  },

  post: async (req, res) => {
    if (parseInt(req.body.personId) === req.session.user.personId) {
      const s = await Leave.submitRequest(req.body)

      if (s.s === '' || s.s === 's') {
        req.session.flash = {
          message_1: `date${s.s} already requested.`,
          message_2: 'cancel and resubmit to amend.'
        }
      }

      res.redirect('/leave')
    }
  }
}
