module.exports = (req, res) => {
  const d = new Date(req.session.week.date)
  req.session.week = {
    date: new Date(d.getFullYear(), d.getMonth(), d.getDate() - 7),
    current: false
  }
  res.redirect(`/dashboard`)
}
