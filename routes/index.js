const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const admin = require('./modules/admin')
const attractionController = require('../controllers/attractionController')
const userController = require('../controllers/userController')
const commentController = require('../controllers/comment-controller')
const { authenticated, authenticatedAdmin } = require('../middleware/auth')
const { generalErrorHandler } = require('../middleware/error-handler')

router.use('/admin', authenticatedAdmin, admin)

router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)

router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)
router.get('/logout', userController.logout)

router.get('/attractions/news', authenticated, attractionController.getNews)
router.get('/attractions/:id', authenticated, attractionController.getAttraction)
router.get('/attractions', authenticated, attractionController.getAttractions)

router.post('/comments/:id', authenticated, commentController.postComment)
router.delete('/comments/:id', authenticated, commentController.deleteComment)

router.get('/users/:userId', authenticated, userController.getUser)
router.put('/users/:userId', authenticated, userController.putUser)
router.get('/users/:userId/edit', authenticated, userController.editUser)

// fallback 路由
router.get('/', (req, res) => res.redirect('/attractions'))

router.use('/', generalErrorHandler)

module.exports = router
