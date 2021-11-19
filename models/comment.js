'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define(
    "comment",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    username: {
      type: DataTypes.STRING
    },
    comment: {
      type: DataTypes.STRING
    },
  });
  comment.associate = function (models) {
  
  
  };

  return comment;
};