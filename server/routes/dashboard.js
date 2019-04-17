const Dashboard = require('../lib/dashboard')

module.exports = async (req, res) => {
  const user = req.session.user
  const people = await Dashboard.getPeople(user.personId)
  const requests = await Dashboard.getRequests(user.personId)
  res.render('dashboard.ejs', { people: people, requests: requests, user: user })
}
