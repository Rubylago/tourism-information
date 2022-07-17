const { Attraction, City, User } = require('../models')

const adminController = {
  signInPage: (req, res) => {
    res.render('admin/signin')
  },
  signIn: (req, res) => {
    req.flash('success_messages', '成功登入')
    res.redirect('/admin/attractions')
  },
  getAttractions: async (req, res, next) => {
    try {
      const attractions = await Attraction.findAll({
        order: [['id', 'DESC']],
        raw: true
      })
      return res.render('admin/attractions', { attractions })
    } catch (err) {
      next(err)
    }
  },
  createAttraction: async (req, res, next) => {
    try {
      const cities = await City.findAll({
        attributes: ['name'],
        raw: true
      })
      res.render('admin/create-attraction', { cities })
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
  },
  getAttraction: async (req, res, next) => {
    try {
      const attraction = await Attraction.findByPk(req.params.id, {
        raw: true
      })
      if (!attraction) throw new Error('attraction not found')
      res.render('admin/attraction', { attraction })
    } catch (err) {
      next(err)
    }
  },
  editAttraction: async (req, res, next) => {
    try {
      const attraction = await Attraction.findByPk(req.params.id, {
        raw: true
      })
      const cities = await City.findAll({
        attributes: ['name'],
        raw: true
      })
      if (!attraction) throw new Error('attraction not found')
      res.render('admin/edit-attraction', { attraction, cities })
    } catch (err) {
      next(err)
    }
  },
  putAttraction: async (req, res, next) => {
    try {
      const { name, tel, introduction, photo, city, town, address } = req.body
      const attraction = await Attraction.findByPk(req.params.id)
      if (!attraction) throw new Error('attraction not found')
      await attraction.update({
        name,
        tel,
        introduction,
        photo,
        city,
        town,
        address
      })
      res.redirect('/admin/attractions')
    } catch (err) {
      next(err)
    }
  },
  deleteAttraction: async (req, res, next) => {
    try {
      const attraction = Attraction.findByPk(req.params.id)
      if (!attraction) throw new Error('attraction not found')
      await Attraction.destroy({
        where: {
          id: req.params.id
        }
      })
      return res.redirect('/admin/attractions')
    } catch (err) {
      next(err)
    }
  },
  getUsers: async (req, res, next) => {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password'] },
        raw: true,
        nest: true
      })
      console.log('users:', users)
      return res.render('admin/users', { users })
    } catch (err) {
      next(err)
    }
  }
}
module.exports = adminController
