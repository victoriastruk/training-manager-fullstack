'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users_trainings',
      [
        {
          user_id: 4,
          training_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 5,
          training_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 6,
          training_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 7,
          training_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 8,
          training_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 4,
          training_id: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 5,
          training_id: 6,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 6,
          training_id: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users_trainings', null, {});
  },
};
