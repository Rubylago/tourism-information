'use strict'
const faker = require('faker')
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Attractions',
      Array.from({ length: 50 }, () => ({
        name: faker.name.findName(),
        tel: faker.phone.phoneNumber(),
        introduction: faker.lorem.text(),
        photo: `https://loremflickr.com/320/240/nature/?lock=${Math.random() * 100}`,
        city: faker.address.cityName(),
        town: faker.address.county(),
        address: faker.address.streetAddress(),
        created_at: new Date(),
        updated_at: new Date()
      }))
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Attractions', null, {})
  }
}
