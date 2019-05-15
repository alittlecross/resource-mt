const Dashboard = require('../lib/dashboard')

module.exports = async (req, res) => {
  const user = req.session.user
  const leave = await Dashboard.getLeave(user.personId)
  const requests = await Dashboard.getRequests(user.personId)
  res.render('dashboard.ejs', { leave: leave, requests: requests, user: user })
}
