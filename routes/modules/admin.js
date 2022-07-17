const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/adminController')

router.get('/attractions/create', adminController.createAttraction)
router.get('/attractions/:id/edit', adminController.editAttraction)
router.put('/attractions/:id', adminController.putAttraction)
router.delete('/attractions/:id', adminController.deleteAttraction)
router.get('/attractions/:id', adminController.getAttraction)
router.get('/attractions', adminController.getAttractions)
router.post('/attractions', adminController.postAttraction)

router.get('/users', adminController.getUsers)

// fallback 路由
router.get('', (req, res) => res.redirect('/admin/attractions'))

module.exports = router
