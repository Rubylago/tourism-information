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
      const attraction = await Attraction.findByPk(req.params.id)
      if (!attraction) throw new Error('attraction not found')
      await attraction.increment('views')
      await attraction.reload()
      res.render('attraction', { attraction: attraction.toJSON() })
    } catch (err) {
      next(err)
    }
  }
}
module.exports = attractionController
