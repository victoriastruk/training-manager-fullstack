const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { sequelize, User, Training, UserTraining } = require('../models');
const { users, trainings, usersTrainings } = require('./helpers/testData');
const app = require('./../app');

chai.use(chaiAsPromised);
const { expect } = chai;

describe('Users API Endpoints', () => {
  before(async () => {
    await sequelize.sync({ force: true });
    await User.bulkCreate(users);
    await Training.bulkCreate(trainings);
    await UserTraining.bulkCreate(usersTrainings);
  });
  describe('POST /api/users/:userId/trainings', () => {
    it('should register user to training successfully', async () => {
      const userId = 4;
      const trainingId = 1;
      const res = await request(app)
        .post(`/api/users/${userId}/trainings`)
        .send({
          userId,
          trainingId,
        })
        .expect(200);

      expect(res.text).to.equal('Participant registered successfully');

      const updatedUser = await User.findByPk(userId, {
        include: {
          model: Training,
          as: 'trainingsAttended',
          through: { attributes: [] },
        },
      });

      const trainingIds = updatedUser.trainingsAttended.map((t) => t.id);
      expect(trainingIds).to.include(trainingId);
    });

    it('should return 404 if user does not exist', async () => {
      const userId = 99999;
      const trainingId = 1;
      const res = await request(app)
        .post(`/api/users/${userId}/trainings`)
        .send({
          userId,
          trainingId,
        })
        .expect(404);

      expect(res.body.errors).to.be.an('array');
      expect(res.body.errors[0]).to.have.property('title', 'User not found');
    });
  });

  describe('GET /api/users/:userId/trainings', () => {
    it('should return trainings attended by user', async () => {
      const userId = 4;
      const res = await request(app)
        .get(`/api/users/${userId}/trainings`)
        .expect(200);

      expect(res.body).to.be.an('array');
      expect(res.body.length).to.equal(2);
      const expectedTitles = ['JS Basics', 'Fullstack Crash Course'];
      const returnedTitles = res.body.map((t) => t.title);

      for (const title of expectedTitles) {
        expect(returnedTitles).to.include(title);
      }
    });

    it('should return 404 if user does not exist', async () => {
      const userId = 9999;
      const res = await request(app)
        .get(`/api/users/${userId}/trainings`)
        .expect(404);

      expect(res.body.errors).to.be.an('array');
      expect(res.body.errors[0]).to.have.property('title', 'User not found');
    });
  });

  after(async () => {
    await UserTraining.destroy({ where: {} });
    await Training.destroy({ where: {} });
    await User.destroy({ where: {} });
  });
});
