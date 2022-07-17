const { getUser, ensureAuthenticated } = require('../helpers/auth-helpers')

module.exports = {
  authenticated: (req, res, next) => {
    if (ensureAuthenticated(req)) return next()
    req.flash('error_messages', '請先登入才能使用')
    res.redirect('/signin')
  },
  authenticatedAdmin: (req, res, next) => {
    if (ensureAuthenticated(req)) {
      if (getUser(req).isAdmin) return next()
      req.flash('error_messages', '請以管理員身分登入')
      res.redirect('/admin/signin')
    } else {
      req.flash('error_messages', '請先登入才能使用')
      res.redirect('/admin/signin')
    }
  }
}
