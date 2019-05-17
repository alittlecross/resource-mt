const LeaveDelete = require('../../lib/leave/delete')

module.exports = async (req, res) => {
  if (!req.session.user) {
    res.redirect('/')
  } else if (req.session.user.role === 'Resource Manager') {
    await LeaveDelete.deleteLeave(req.params.leaveId)
  }
  res.redirect(`/${req.params.personId}/person`)
}
