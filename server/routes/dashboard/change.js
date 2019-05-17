module.exports = (req, res) => {
  if (!req.session.user) {
    res.redirect('/')
  } else {
    const change = req.params.change

    if (change === 'past' || change === 'next') {
      const days = change === 'past' ? -7 : change === 'next' ? 7 : 0
      const last = new Date(req.session.week.date)

      req.session.week.date = new Date(last.getFullYear(), last.getMonth(), last.getDate() + days)

      const currentDate = `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`
      const currentSessionDate = `${new Date(req.session.week.date).getFullYear()}/${new Date(req.session.week.date).getMonth() + 1}/${new Date(req.session.week.date).getDate()}`

      req.session.week.current = currentDate === currentSessionDate
    } else {
      req.session.week.date = new Date()
      req.session.week.current = true
    }

    res.redirect(`/dashboard`)
  }
}
