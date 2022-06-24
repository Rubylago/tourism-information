const bcrypt = require('bcryptjs')
const { User } = require('../models')
const userController = {
  signUpPage: (req, res) => {
    res.render('signup')
  },
  signUp: async (req, res, next) => {
    try {
      const { name, email, password, passwordCheck } = req.body
      const errors = []
      if (!name || !email || !password || !passwordCheck) {
        errors.push({ message: '所有欄位都是必填' })
      }
      if (password !== passwordCheck) {
        errors.push({ message: '密碼與確認密碼不同' })
      }
      if (name.length > 50) {
        errors.push({ message: '名稱上限為50字' })
      }
      const userEmail = await User.findOne({ where: { email } })
      if (userEmail) {
        errors.push({ message: 'email 已註冊' })
      }
      if (errors.length) {
        return res.render('signup', {
          errors,
          name,
          email,
          password,
          passwordCheck
        })
      }
      await User.create({
        name,
        email,
        isAdmin: 0,
        password: bcrypt.hashSync(
          req.body.password,
          bcrypt.genSaltSync(10),
          null
        ),
        avatar:
          'https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg',
        cover:
          'https://dummyimage.com/639x200/000/fff.jpg&text=%E9%A0%90%E8%A8%AD'
      })
      req.flash('success_messages', '成功註冊帳號')
      return res.redirect('/signin')
    } catch (err) {
      next(err)
    }
  },
  signInPage: (req, res) => {
    res.render('signin')
  },
  signIn: (req, res) => {
    req.flash('success_messages', '成功登入！')
    res.redirect('/attractions')
  },
  logout: (req, res) => {
    req.flash('success_messages', '登出成功！')
    req.logout()
    res.redirect('/signin')
  }
}
module.exports = userController
