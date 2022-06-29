const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/adminController')

router.get('/attractions', adminController.getAttractions)
router.get('/attractions/create', adminController.createAttraction)
router.post('/attractions', adminController.postAttraction)

// fallback 路由
router.get('', (req, res) => res.redirect('/admin/attractions'))

module.exports = router
