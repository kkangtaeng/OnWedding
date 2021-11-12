'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article_Hashtag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Article_Hashtag.init({
    hashtag_id: DataTypes.INTEGER,
    article_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Article_Hashtag',
  });
  return Article_Hashtag;
};