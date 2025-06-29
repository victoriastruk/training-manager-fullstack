'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      first_name: {
        type: Sequelize.STRING(32),
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING(32),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(64),
        allowNull: false,
        unique: true,
      },
      role: {
        type: Sequelize.ENUM('trainer', 'participant'),
        allowNull: false,
        defaultValue: 'participant',
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  },
};
