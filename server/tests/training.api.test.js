const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { startOfDay, startOfToday, isEqual, addDays } = require('date-fns');
const { sequelize, User, Training } = require('./../models');
const { users, trainings } = require('./helpers/testData');
const app = require('./../app');

chai.use(chaiAsPromised);
const { expect } = chai;

describe('Training API Endpoints', () => {
  before(async () => {
    await sequelize.sync({ force: true });
    await User.bulkCreate(users);
    await Training.bulkCreate(trainings);
  });

  describe('GET /api/trainings', () => {
    it('should return trainings for today with dateFilter=today', async () => {
      const dateFilter = 'today';
      const res = await request(app)
        .get(`/api/trainings?dateFilter=${dateFilter}`)
        .expect(200);
      expect(res.body.data).to.be.an('array');
      expect(res.body.data.length).to.be.greaterThan(0);
      const today = startOfDay(new Date());
      for (const training of res.body.data) {
        const trainingDate = startOfDay(training.date);
        expect(isEqual(trainingDate, today)).to.be.true;
      }
    });

    it('should support pagination with limit and offset', async () => {
      const page = 1;
      const results = 1;
      const res = await request(app)
        .get(`/api/trainings?page=${page}&results=${results}`)
        .expect(200);

      expect(res.body.data).to.be.an('array');
      expect(res.body.data.length).to.be.at.most(1);
    });

    it('should return trainings between two dates', async () => {
      const startDate = addDays(startOfToday(), 3).toISOString();
      const endDate = addDays(startOfToday(), 8).toISOString();

      const res = await request(app)
        .get(`/api/trainings?startDate=${startDate}&endDate=${endDate}`)
        .expect(200);

      expect(res.body.data).to.be.an('array');
      expect(res.body.data.length).to.be.equals(1);
    });
  });

  describe('POST /api/trainings', () => {
    it('should return 201 when training is created successfully', async () => {
      const training = {
        title: 'New training',
        description: 'Learn tecnology',
        date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        location: 'Room 9',
        trainerId: 1,
      };

      const res = await request(app)
        .post('/api/trainings')
        .send(training)
        .expect(201);

      expect(res.body).to.be.an('object');
      expect(res.body.data).to.have.property('id');
    });
  });

  describe('PATCH /api/trainings/:trainingId', () => {
    it('should return 200 when training is updated successfully', async () => {
      const trainerId = 1;
      const updatedData = {
        title: 'Updated Title',
        trainerId,
      };

      const res = await request(app)
        .patch(`/api/trainings/${trainerId}`)
        .send(updatedData)
        .expect(200);

      expect(res.body).to.be.an('object');
      expect(res.body.data).to.include({
        title: 'Updated Title',
        trainerId,
      });

      expect(res.body.data.trainer).to.include({
        firstName: 'Alice',
        lastName: 'Brown',
      });
    });
  });

  describe('DELETE /api/training/:trainingId', () => {
    it('should return 204 when training is deleted successfully', async () => {
      const trainerId = 1;
      await request(app).delete(`/api/trainings/${trainerId}`).expect(204);

      const deleted = await Training.findByPk(1);
      expect(deleted).to.be.null;
    });
  });

  after(async () => {
    await Training.destroy({ where: {} });
    await User.destroy({ where: {} });
  });
});
