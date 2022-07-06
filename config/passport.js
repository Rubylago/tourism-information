require('dotenv').config()
const passport = require('passport')
const LocalStrategy = require('passport-local')
const FacebookStrategy = require('passport-facebook').Strategy
const bcrypt = require('bcryptjs')
const { User, Attraction } = require('../models')

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  (req, email, password, done) => {
    User.findOne({ where: { email } })
      .then(user => {
        if (!user) {
          return done(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤'))
        }
        bcrypt.compare(password, user.password).then(res => {
          if (!res) {
            return done(null, false, req.flash('error_messages', '密碼輸入錯誤'))
          }
          return done(null, user)
        })
      }).catch(err => done(err))
  }
))

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK,
  profileFields: ['email', 'displayName']
}, (accessToken, refreshToken, profile, done) => {
  const { name, email } = profile._json
  User.findOne({ where: { email } })
    .then(user => {
      if (user) return done(null, user)
      const randomPassword = Math.random().toString(36).slice(-8)
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(randomPassword, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash,
          avatar: 'https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg'
        }))
        .then(user => done(null, user))
        .catch(err => done(err, false))
    })
}))

passport.serializeUser((user, cb) => {
  cb(null, user.id)
})
passport.deserializeUser((id, cb) => {
  User.findByPk(id, {
    include: [
      { model: Attraction, as: 'LikedAttraction', attributes: ['id'] },
      { model: User, as: 'Followers', attributes: ['id'] },
      { model: User, as: 'Followings', attributes: ['id'] }
    ]
  })
    .then(user => {
      return cb(null, user.toJSON())
    })
    .catch(err => cb(err))
})
module.exports = passport
