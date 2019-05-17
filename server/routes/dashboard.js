const Dashboard = require('../lib/dashboard')

module.exports = async (req, res) => {
  if (!req.session.user) {
    res.redirect('/')
  } else {
    const week = Dashboard.getWeek(req.session.week.date)
    const leave = await Dashboard.getLeave(req.session.user.personId, week)
    const requests = await Dashboard.getRequests(req.session.user.personId)

    res.render('dashboard.ejs', {
      current: req.session.week.current,
      leave: leave,
      requests: requests,
      user: req.session.user,
      week: week
    })
  }
}
