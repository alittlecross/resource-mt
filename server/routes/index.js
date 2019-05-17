module.exports = (_, res) => {
  res.render('index.ejs', {
    flash: res.locals.flash
  })
}
