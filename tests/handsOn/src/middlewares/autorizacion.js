export function onlyLogueadosRest(req, res, next) {
  if (!req.session['user']) {
    return res
      .status(403)
      .json({
        status: 'error',
        message: 'no estas logueado! Login y vuelva a intentar.'
      })
  }
  next()
}

export function onlyLogueadosWeb(req, res, next) {
  if (!req.session['user']) {
    return res.redirect('/login')
  }
  next()
}