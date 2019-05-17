const LeaveDelete = require('../../lib/leave/delete')

module.exports = async (req, res) => {
  if (!req.session.user) {
    res.redirect('/')
  } else if (parseInt(req.params.personId) === req.session.user.personId) {
    await LeaveDelete.deleteLeave(req.params.leaveId)
  }
  res.redirect('/leave')
}
