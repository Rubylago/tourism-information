const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/adminController')

router.get('/attractions', adminController.getAttractions)

// fallback 路由
router.use('/', (req, res) => res.redirect('/admin/attractions'))

module.exports = router
