const Dashboard = require('../lib/dashboard')

module.exports = async (req, res) => {
  const user = req.session.user
  const week = Dashboard.getWeek(req.session.week.date)
  const leave = await Dashboard.getLeave(user.personId, week)
  const requests = await Dashboard.getRequests(user.personId)
  res.render('dashboard.ejs', { current: req.session.week.current, leave: leave, requests: requests, user: user, week: week })
}
