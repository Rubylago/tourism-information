const express = require('express')
const router = express.Router()
const attractionController = require('../controllers/attractionController')

router.get('/attractions', attractionController.getAttractions)

// fallback 路由
router.use('/', (req, res) => res.redirect('/attractions'))

module.exports = router
