const { Attraction } = require('../models')

const adminController = {
  getAttractions: async (req, res, next) => {
    try {
      const attractions = await Attraction.findAll({
        raw: true
      })
      return res.render('admin/attractions', { attractions })
    } catch (err) {
      next(err)
    }
  },
  createAttraction: async (req, res, next) => {
    try {
      res.render('admin/create-attraction')
    } catch (err) {
      next(err)
    }
  },
  postAttraction: async (req, res, next) => {
    try {
      const { name, tel, introduction, photo, city, town, address } = req.body
      if (!name) throw new Error('name is required')
      await Attraction.create({
        name,
        tel,
        introduction,
        photo,
        city,
        town,
        address
      })
      req.flash('success_messages', 'attraction successfully created')
      res.redirect('/admin/attractions')
    } catch (err) {
      next(err)
    }
  }
}
module.exports = adminController
