'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Training, {
        as: 'trainingGiven',
        foreignKey: 'trainerId',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      });
      User.belongsToMany(models.Training, {
        as: 'trainingsAttended',
        through: models.UserTraining,
        foreignKey: 'userId',
        otherKey: 'trainingId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('trainer', 'participant'),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      underscored: true,
    }
  );
  return User;
};
