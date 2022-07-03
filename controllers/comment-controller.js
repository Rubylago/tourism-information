const { Comment, Attraction } = require('../models')

const commentController = {
  postComment: async (req, res, next) => {
    try {
      const { text } = req.body
      const attractionId = req.params.id
      const attraction = await Attraction.findByPk(attractionId)
      if (!attraction) throw new Error('attraction not found')
      if (text.trim().length === 0) throw new Error('text is required')
      if (/[~!@#$%^&*()_+<>?:"{},.\\/;'[\]]/im.test(text)) throw new Error('don\'t use special characters')
      if (text.length > 150) throw new Error('max length 150')
      await Comment.create({
        text,
        attractionId,
        userId: req.user.id
      })
      res.redirect(`/attractions/${attractionId}`)
    } catch (err) {
      next(err)
    }
  },
  deleteComment: async (req, res, next) => {
    try {
      const comment = await Comment.findByPk(req.params.id)
      if (!comment) throw new Error('comment not found')
      await Comment.destroy({
        where: { id: req.params.id }
      })
      res.redirect(`/attractions/${comment.attractionId}`)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = commentController
