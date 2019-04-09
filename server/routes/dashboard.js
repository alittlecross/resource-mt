const Dashboard = require('../lib/dashboard')

module.exports = async (req, res) => {
  const results = await Dashboard.getPeople(req.session.user.personId)
  res.render('dashboard.ejs', { people: results, user: req.session.user })
}
