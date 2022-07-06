'use strict'
// const faker = require('faker')
const attractions = require('../openData_ODwsvAttractions.json')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Attractions',
      Array.from(attractions, (_, i) => ({
        name: attractions[i].Name,
        tel: attractions[i].Tel,
        introduction: attractions[i].Introduction,
        photo: attractions[i].Photo,
        city: attractions[i].City,
        town: attractions[i].Town,
        address: attractions[i].Address,
        created_at: new Date(),
        updated_at: new Date()
      }))
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Attractions', null, {})
  }
}
