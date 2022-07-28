const { Attraction, Comment, User, Like } = require('../models')
const { getOffset, getPagination } = require('../helpers/pagination-helper')
const { Op } = require('sequelize')
const sequelize = require('sequelize')
const attractionController = {
  getAttractions: async (req, res, next) => {
    try {
      const DEFAULT_LIMIT = 12
      const page = Number(req.query.page) || 1
      const limit = DEFAULT_LIMIT
      const offset = getOffset(limit, page)
      const LikedAttractionsId = req.user && req.user.LikedAttraction.map(liked => liked.id)
      const keyword = req.query.keyword || ''
      if (/[@#$%^&*()_+<>:"{},.\\/;'[\]]/im.test(keyword)) throw new Error('don\'t use special characters')
      const where = {}
      if (keyword) where.name = { [Op.substring]: keyword || {} }
      const attractions = await Attraction.findAndCountAll({
        where,
        order: [['id', 'DESC']],
        limit,
        offset,
        raw: true
      })
      if (!attractions.count) throw new Error('no records found for the search criteria entered')
      const data = attractions.rows.map(data => ({
        ...data,
        introduction: data.introduction.substring(0, 50),
        isLiked: LikedAttractionsId.includes(data.id)
      }))
      return res.render('attractions', {
        attractions: data,
        pagination: getPagination(limit, page, attractions.count),
        keyword
      })
    } catch (err) {
      next(err)
    }
  },
  getAttraction: async (req, res, next) => {
    try {
      const LikedAttractionsId = req.user && req.user.LikedAttraction.map(liked => liked.id)
      const attraction = await Attraction.findByPk(req.params.id,
        {
          include: [
            { model: Comment, include: [{ model: User, attributes: ['id', 'name', 'avatar'] }] }
          ],
          order: [[Comment, 'createdAt', 'DESC']]
        })
      if (!attraction) throw new Error('attraction not found')
      const likes = await Like.findAndCountAll({
        where: {
          attractionId: req.params.id
        }
      })
      await attraction.increment('views')
      res.render('attraction', {
        attraction: attraction.toJSON(),
        comments: attraction.toJSON().Comments,
        isLiked: LikedAttractionsId.includes(Number(req.params.id)),
        likes: likes.count
      })
    } catch (err) {
      next(err)
    }
  },
  getNews: async (req, res, next) => {
    try {
      const attractions = await Attraction.findAll({
        limit: 4,
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
      res.render('news', { attractions, comments })
    } catch (err) {
      next(err)
    }
  },
  topRated: async (req, res, next) => {
    try {
      const top = await Attraction.findAll({
        include: [
          { model: User, as: 'LikedUsers', attributes: ['id'], duplicating: false }
        ],
        attributes: ['id', 'name', 'photo',
          [sequelize.fn('COUNT', sequelize.col('LikedUsers.id')), 'likeCount']
        ],
        group: 'id',
        order: [[sequelize.col('likeCount'), 'DESC']],
        limit: 8
      })
      const attractions = top.map(top => ({
        ...top.toJSON()
      }))
      res.render('top-rated', { attractions })
    } catch (err) {
      next(err)
    }
  }
}
module.exports = attractionController
