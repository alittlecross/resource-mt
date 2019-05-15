module.exports = (req, res) => {
  req.session.week = {
    date: new Date(),
    current: true
  }
  res.redirect(`/dashboard`)
}
