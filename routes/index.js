const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const admin = require('./modules/admin')
const attractionController = require('../controllers/attractionController')
const userController = require('../controllers/userController')
const commentController = require('../controllers/comment-controller')
const auth = require('./modules/auth')
const upload = require('../middleware/multer')
const { authenticated, authenticatedAdmin } = require('../middleware/auth')
const { generalErrorHandler } = require('../middleware/error-handler')

router.use('/admin', authenticatedAdmin, admin)
router.use('/auth', auth)
router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)

router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)
router.get('/logout', userController.logout)

router.get('/attractions/news', authenticated, attractionController.getNews)
router.get('/attractions/top', authenticated, attractionController.topRated)
router.get('/attractions/:id', authenticated, attractionController.getAttraction)
router.get('/attractions', authenticated, attractionController.getAttractions)
router.get('/search', authenticated, attractionController.getAttractions)

router.post('/comments/:id', authenticated, commentController.postComment)
router.delete('/comments/:id', authenticated, commentController.deleteComment)

router.post('/following/:userId', authenticated, userController.addFollowing)
router.delete('/following/:userId', authenticated, userController.deleteFollowing)

router.get('/users/influencers', authenticated, userController.getInfluencers)
router.get('/users/:userId', authenticated, userController.getUser)
router.put('/users/:userId', authenticated, upload.single('avatar'), userController.putUser)
router.get('/users/:userId/edit', authenticated, userController.editUser)

router.post('/like/:id', authenticated, userController.addLike)
router.delete('/like/:id', authenticated, userController.deleteLike)

// fallback 路由
router.get('/', (req, res) => res.redirect('/attractions/news'))

router.use('/', generalErrorHandler)

module.exports = router
