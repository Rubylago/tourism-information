'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await Promise.all([
      queryInterface.addColumn('Users', 'avatar', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Users', 'cover', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Users', 'isAdmin', {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }),
      queryInterface.addColumn('Users', 'introduction', {
        type: Sequelize.TEXT
      })
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await Promise.all([
      queryInterface.removeColumn('Users', 'avatar'),
      queryInterface.removeColumn('Users', 'cover'),
      queryInterface.removeColumn('Users', 'isAdmin'),
      queryInterface.removeColumn('Users', 'introduction')
    ])
  }
}
