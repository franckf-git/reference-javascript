exports.verificationAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  const nonConnecté = [{ msg: 'il faut vous connecter pour accèder à la suite' }]
  res.render('authentificationsession/login', {
    title: 'Page de connexion',
    nonConnecté
  })
}
exports.dejaAuthentifie = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next()
  }
  res.redirect('/authentificationsession/test')
}
