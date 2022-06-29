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
  }
}
module.exports = adminController
