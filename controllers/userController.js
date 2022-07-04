const bcrypt = require('bcryptjs')
const { User, Attraction, Like } = require('../models')
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
    res.redirect('/attractions/news')
  },
  logout: (req, res) => {
    req.flash('success_messages', '登出成功！')
    req.logout()
    res.redirect('/signin')
  },
  getUser: async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.userId)
      if (!user) throw new Error('user not found')
      res.render('users/profile', { user: user.toJSON() })
    } catch (err) {
      next(err)
    }
  },
  editUser: (req, res, next) => {
    try {
      const logInUserId = req.user.id
      if (logInUserId !== Number(req.params.userId)) throw new Error('can\'t do that shit')
      res.render('users/edit')
    } catch (err) {
      next(err)
    }
  },
  putUser: async (req, res, next) => {
    try {
      const logInUserId = req.user.id
      const errors = []
      const { name, introduction } = req.body
      let { avatar } = req.body
      if (logInUserId !== Number(req.params.userId)) throw new Error('can\'t do that shit')
      const user = await User.findByPk(req.params.userId)
      if (!user) {
        errors.push({ message: 'user not found' })
      }
      if (!name || !introduction) {
        errors.push({ message: '所有欄位都是必填' })
      }
      if (name.length > 50) {
        errors.push({ message: '名稱上限為50字' })
      }
      if (!avatar) {
        avatar = 'https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg'
      }
      if (errors.length) {
        return res.render('edit', {
          errors,
          name,
          avatar,
          introduction
        })
      }
      await user.update({
        name,
        avatar,
        introduction
      })
      res.redirect(`/users/${logInUserId}`)
    } catch (err) {
      next(err)
    }
  },
  addLike: async (req, res, next) => {
    try {
      const attraction = await Attraction.findByPk(req.params.id)
      if (!attraction) throw new Error('attraction not found')
      const like = await Like.findOne({
        where: {
          userId: req.user.id,
          attractionId: req.params.id
        }
      })
      if (like) throw new Error('already liked')
      await Like.create({
        userId: req.user.id,
        attractionId: req.params.id
      })
      req.flash('success_messages', 'liked successfully')
      res.redirect('back')
    } catch (err) {
      next(err)
    }
  },
  deleteLike: async (req, res, next) => {
    try {
      // if !like if !attraction
      const attraction = await Attraction.findByPk(req.params.id)
      if (!attraction) throw new Error('attraction not found')
      const like = await Like.findOne({
        where: {
          userId: req.user.id,
          attractionId: req.params.id
        }
      })
      if (!like) throw new Error('did\'t liked before')
      await like.destroy()
      req.flash('success_messages', 'unlike successfully')
      res.redirect('back')
    } catch (err) {
      next(err)
    }
  }
}
module.exports = userController
