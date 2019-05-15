module.exports = (req, res) => {
  const last = new Date(req.session.week.date)

  req.session.week.date = new Date(last.getFullYear(), last.getMonth(), last.getDate() + 7)

  const currentSessionDate = `${new Date(req.session.week.date).getFullYear()}/${new Date(req.session.week.date).getMonth() + 1}/${new Date(req.session.week.date).getDate()}`
  const currentDate = `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`

  req.session.week.current = currentSessionDate === currentDate

  res.redirect(`/dashboard`)
}
