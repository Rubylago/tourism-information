const express = require('express')
const router = express.Router()
const admin = require('./modules/admin')
const attractionController = require('../controllers/attractionController')
const userController = require('../controllers/userController')

router.use('/admin', admin)

router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)

router.get('/attractions', attractionController.getAttractions)

// fallback 路由
router.get('/', (req, res) => res.redirect('/attractions'))

module.exports = router
