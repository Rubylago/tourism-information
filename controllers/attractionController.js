const { Attraction } = require('../models')
const { getOffset, getPagination } = require('../helpers/pagination-helper')

const attractionController = {
  getAttractions: async (req, res) => {
    const DEFAULT_LIMIT = 9
    const page = Number(req.query.page) || 1
    const limit = DEFAULT_LIMIT
    const offset = getOffset(limit, page)

    const attractions = await Attraction.findAndCountAll({
      order: [['id', 'DESC']],
      limit,
      offset,
      raw: true
    })
    const data = attractions.rows.map(data => ({
      ...data,
      introduction: data.introduction.substring(0, 50)
    }))
    return res.render('attractions', {
      attractions: data,
      pagination: getPagination(limit, page, attractions.count)
    })
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
