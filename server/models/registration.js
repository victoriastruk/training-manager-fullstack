'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Registration extends Model {
    static associate(models) {
      Registration.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      Registration.belongsTo(models.Training, {
        foreignKey: 'trainingId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Registration.init(
    {
      trainingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Registration',
      tableName: 'registrations',
      underscored: true,
    }
  );
  return Registration;
};
