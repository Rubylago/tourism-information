'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Attraction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Attraction.hasMany(models.Comment, { foreignKey: 'attractionId' })
      Attraction.belongsToMany(models.User, {
        through: models.Like, // 透過 Like 表來建立關聯
        foreignKey: 'attractionId', // 對 Like 表設定 FK
        as: 'LikedUsers'
      })
    }
  }
  Attraction.init({
    name: DataTypes.STRING,
    tel: DataTypes.STRING,
    introduction: DataTypes.TEXT,
    photo: DataTypes.STRING,
    city: DataTypes.STRING,
    town: DataTypes.STRING,
    address: DataTypes.STRING,
    views: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Attraction',
    tableName: 'Attractions',
    underscored: true
  })
  return Attraction
}
