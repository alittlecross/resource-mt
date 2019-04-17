const LeaveAction = require('../../lib/leave/action')

module.exports = async (req, res) => {
  await LeaveAction.changeStatus(req.params)
  res.redirect('/dashboard')
}
