const { Attraction, Comment, User } = require('../models')
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
      const attraction = await Attraction.findOne(
        {
          where: { id: req.params.id },
          include: [
            {
              model: Comment,
              include: [
                { model: User, attributes: ['id', 'name', 'avatar'] }]
            }
          ],
          order: [[Comment, 'createdAt', 'DESC']]
        })
      if (!attraction) throw new Error('attraction not found')
      await attraction.increment('views')
      res.render('attraction', { attraction: attraction.toJSON(), comments: attraction.toJSON().Comments })
    } catch (err) {
      next(err)
    }
  },
  getNews: async (req, res, next) => {
    try {
      // order newest 10 attractions & comments
      const attractions = await Attraction.findAll({
        limit: 6,
        order: [
          ['createdAt', 'DESC']
        ],
        raw: true
      })
      const comments = await Comment.findAll({
        limit: 5,
        include: [
          { model: User, attributes: ['id', 'name', 'avatar', 'createdAt'] },
          { model: Attraction, attributes: ['id', 'name', 'introduction', 'photo', 'city', 'createdAt'] }],
        order: [
          ['createdAt', 'DESC']
        ],
        raw: true,
        nest: true
      })
      // console.log('comments', comments)
      res.render('news', { attractions, comments })
    } catch (err) {
      next(err)
    }
  }
}
module.exports = attractionController
