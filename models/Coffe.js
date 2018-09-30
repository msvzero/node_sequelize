'use strict';
module.exports = (sequelize, DataTypes) => {
  const Coffe = sequelize.define('Coffe', {
    name: DataTypes.STRING,
    type: DataTypes.STRING
  }, {});
  Coffe.associate = function(models) {
    // associations can be defined here
    // Coffe hasOne//belongsTo Shop
    Coffe.belongsTo(models.Shop,{ foreignKey: 'shopId'});
  };
  return Coffe;
};