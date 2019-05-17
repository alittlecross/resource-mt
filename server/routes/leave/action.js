const LeaveAction = require('../../lib/leave/action')

module.exports = async (req, res) => {
  if (!req.session.user) {
    res.redirect('/')
  } else if (req.session.user.role === 'Resource Manager') {
    await LeaveAction.changeStatus(req.params)
  }
  res.redirect('/dashboard')
}
