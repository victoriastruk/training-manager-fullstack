'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          first_name: 'Alice',
          last_name: 'Brown',
          email: 'alice.trainer@example.com',
          role: 'trainer',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.trainer@example.com',
          role: 'trainer',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          first_name: 'Diana',
          last_name: 'Smith',
          email: 'diana.trainer@example.com',
          role: 'trainer',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          first_name: 'Charlie',
          last_name: 'Miller',
          email: 'charlie.participant@example.com',
          role: 'participant',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          first_name: 'Eva',
          last_name: 'White',
          email: 'eva.participant@example.com',
          role: 'participant',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          first_name: 'Bob',
          last_name: 'Gray',
          email: 'bob.participant@example.com',
          role: 'participant',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          first_name: 'Frank',
          last_name: 'Green',
          email: 'frank.participant@example.com',
          role: 'participant',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          first_name: 'Grace',
          last_name: 'Taylor',
          email: 'grace.participant@example.com',
          role: 'participant',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
