'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserTraining extends Model {
    static associate(models) {
      UserTraining.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      UserTraining.belongsTo(models.Training, {
        foreignKey: 'trainingId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  UserTraining.init(
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
      modelName: 'UserTraining',
      tableName: 'users_trainings',
      underscored: true,
    }
  );
  return UserTraining;
};
