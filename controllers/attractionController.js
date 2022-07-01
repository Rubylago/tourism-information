const { Attraction } = require('../models')

const attractionController = {
  getAttractions: async (req, res) => {
    const attractions = await Attraction.findAll({
      order: [['id', 'DESC']],
      raw: true
    })
    const data = attractions.map(data => ({
      ...data,
      introduction: data.introduction.substring(0, 50)
    }))
    return res.render('attractions', { attractions: data })
  }
}
module.exports = attractionController
