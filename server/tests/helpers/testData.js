const users = [
  {
    firstName: 'Alice',
    lastName: 'Brown',
    email: 'alice.trainer@example.com',
    role: 'trainer',
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.trainer@example.com',
    role: 'trainer',
  },
  {
    firstName: 'Diana',
    lastName: 'Smith',
    email: 'diana.trainer@example.com',
    role: 'trainer',
  },
  {
    firstName: 'Charlie',
    lastName: 'Miller',
    email: 'charlie.participant@example.com',
    role: 'participant',
  },
  {
    firstName: 'Eva',
    lastName: 'White',
    email: 'eva.participant@example.com',
    role: 'participant',
  },
  {
    firstName: 'Bob',
    lastName: 'Gray',
    email: 'bob.participant@example.com',
    role: 'participant',
  },
  {
    firstName: 'Frank',
    lastName: 'Green',
    email: 'frank.participant@example.com',
    role: 'participant',
  },
  {
    firstName: 'Grace',
    lastName: 'Taylor',
    email: 'grace.participant@example.com',
    role: 'participant',
  },
];

const trainings = [
  {
    title: 'JS Basics',
    description: 'Learn JS',
    date: new Date(),
    location: 'Room 1',
    trainerId: 3,
  },
  {
    title: 'React Intro',
    description: 'Learn React',
    date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    location: 'Room 2',
    trainerId: 3,
  },
  {
    title: 'Node.js Workshop',
    description: 'Learn Node.js basics',
    date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    location: 'Room 3',
    trainerId: 2,
  },
  {
    title: 'TypeScript Essentials',
    description: 'Master TypeScript for scalable JS',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    location: 'Room 4',
    trainerId: 1,
  },
  {
    title: 'Fullstack Crash Course',
    description: 'Overview of frontend and backend integration',
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    location: 'Room 5',
    trainerId: 1,
  },
  {
    title: 'Advanced Git',
    description: 'Learn branching, rebasing, cherry-pick, etc.',
    date: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    location: 'Room 6',
    trainerId: 2,
  },
  {
    title: 'Debugging JavaScript',
    description: 'Techniques for finding and fixing bugs',
    date: new Date(),
    location: 'Room 7',
    trainerId: 2,
  },
];

const usersTrainings = [
  {
    userId: 4,
    trainingId: 1,
  },
  {
    userId: 5,
    trainingId: 2,
  },
  {
    userId: 6,
    trainingId: 1,
  },
  {
    userId: 7,
    trainingId: 3,
  },
  {
    userId: 8,
    trainingId: 4,
  },
  {
    userId: 4,
    trainingId: 5,
  },
  {
    userId: 5,
    trainingId: 6,
  },
  {
    userId: 6,
    trainingId: 7,
  },
];

module.exports = {
  users,
  trainings,
  usersTrainings,
};
