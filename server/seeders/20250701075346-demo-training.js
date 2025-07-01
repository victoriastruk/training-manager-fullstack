'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'trainings',
      [
        {
          title: 'JS Basics',
          description: 'Learn JS',
          date: new Date(),
          location: 'Room 1',
          trainer_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'React Intro',
          description: 'Learn React',
          date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
          location: 'Room 2',
          trainer_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Node.js Workshop',
          description: 'Learn Node.js basics',
          date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
          location: 'Room 3',
          trainer_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'TypeScript Essentials',
          description: 'Master TypeScript for scalable JS',
          date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
          location: 'Room 4',
          trainer_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Fullstack Crash Course',
          description: 'Overview of frontend and backend integration',
          date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
          location: 'Room 5',
          trainer_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Advanced Git',
          description: 'Learn branching, rebasing, cherry-pick, etc.',
          date: new Date(new Date().setMonth(new Date().getMonth() + 1)),
          location: 'Room 6',
          trainer_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Debugging JavaScript',
          description: 'Techniques for finding and fixing bugs',
          date: new Date(),
          location: 'Room 7',
          trainer_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('trainings', null, {});
  },
};
