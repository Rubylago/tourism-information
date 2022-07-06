'use strict'
const bcrypt = require('bcryptjs')
require('dotenv').config()
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      name: 'root',
      email: 'root@example.com',
      password: await bcrypt.hash(process.env.ROOT_SECRET, 10),
      is_admin: true,
      avatar: 'https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg',
      cover: 'https://dummyimage.com/639x200/000/fff.jpg&text=%E9%A0%90%E8%A8%AD',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: 'user1',
      email: 'user1@example.com',
      password: await bcrypt.hash('12345678', 10),
      is_admin: false,
      avatar: 'https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg',
      cover: 'https://dummyimage.com/639x200/000/fff.jpg&text=%E9%A0%90%E8%A8%AD',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: 'user2',
      email: 'user2@example.com',
      password: await bcrypt.hash('12345678', 10),
      is_admin: false,
      avatar: 'https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg',
      cover: 'https://dummyimage.com/639x200/000/fff.jpg&text=%E9%A0%90%E8%A8%AD',
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
}
