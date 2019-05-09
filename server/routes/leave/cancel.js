const LeaveDelete = require('../../lib/leave/delete')

module.exports = async (req, res) => {
  await LeaveDelete.deleteLeave(req.params.leaveId)
  res.redirect('/leave')
}
