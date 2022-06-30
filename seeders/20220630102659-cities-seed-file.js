'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Cities',
      ['臺北市', '新北市', '桃園市', '新竹市', '新竹縣', '基隆市', '臺中市', '苗栗縣', '彰化縣', '南投縣', '雲林縣', '嘉義縣', '嘉義市', '臺南市', '高雄市', '屏東縣', '宜蘭縣', '花蓮縣', '臺東縣', '澎湖縣', '金門縣', '連江縣']
        .map(item => {
          return {
            name: item,
            created_at: new Date(),
            updated_at: new Date()
          }
        }
        ), {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cities', null, {})
  }
}
