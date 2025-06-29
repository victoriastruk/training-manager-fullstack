'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Training extends Model {
    static associate(models) {
      Training.belongsTo(models.User, {
        as: 'trainer',
        foreignKey: 'trainerId',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      });
      Training.belongsToMany(models.User, {
        as: 'participants',
        through: models.Registration,
        foreignKey: 'trainingId',
        otherKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Training.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        isAfter: new Date().toISOString(),
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Training',
      tableName: 'trainings',
      underscored: true,
    }
  );
  return Training;
};
