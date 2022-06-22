const express = require('express')
const router = express.Router()
const admin = require('./modules/admin')
const attractionController = require('../controllers/attractionController')

router.use('/admin', admin)

router.get('/attractions', attractionController.getAttractions)

// fallback 路由
router.use('/', (req, res) => res.redirect('/attractions'))

module.exports = router
