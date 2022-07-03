const { User, Comment, Attraction } = require('../models')

const commentController = {
  postComment: async (req, res, next) => {
    try {
      const { text } = req.body
      const attractionId = req.params.id
      // comment.create
      const attraction = await Attraction.findByPk(attractionId)
      if (!attraction) throw new Error('attraction not found')
      if (text.trim().length === 0) throw new Error('text is required')
      if (/[~!@#$%^&*()_+<>?:"{},.\\/;'[\]]/im.test(text)) throw new Error('don\'t use special characters')
      await Comment.create({
        text,
        attractionId,
        userId: req.user.id
      })
      res.redirect(`/attractions/${attractionId}`)
    } catch (err) {
      next(err)
    }
  }

}

module.exports = commentController
