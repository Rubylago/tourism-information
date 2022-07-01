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
  },
  getAttraction: async (req, res, next) => {
    try {
      const attraction = await Attraction.findByPk(req.params.id, {
        raw: true
      })
      if (!attraction) throw new Error('attraction not found')
      res.render('attraction', { attraction })
    } catch (err) {
      next(err)
    }
  }
}
module.exports = attractionController
