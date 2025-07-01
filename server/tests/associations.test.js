const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { sequelize, User, Training, UserTraining } = require('../models');
const { users, trainings, usersTrainings } = require('./helpers/testData');

chai.use(chaiAsPromised);

const expect = chai.expect;

describe('Model Associations', function () {
  before(async () => {
    await sequelize.sync({ force: true });
    await User.bulkCreate(users);
    await Training.bulkCreate(trainings);
    await UserTraining.bulkCreate(usersTrainings);
  });

  describe('Trainer -> Trainings (hasMany)', () => {
    it('should associate a trainer with many trainings', async () => {
      const trainer = await User.findOne({
        where: { email: 'diana.trainer@example.com' },
      });
      const trainingsGiven = await trainer.getTrainingGiven();
      expect(trainingsGiven).to.have.lengthOf(2);
    });
  });

  describe('Participant -> Trainings (many-to-many via UserTraining', () => {
    it('should associate a participant with a training through users_trainings', async () => {
      const participant = await User.findOne({
        where: { email: 'charlie.participant@example.com' },
      });

      const trainingsAttended = await participant.getTrainingsAttended();
      expect(trainingsAttended).to.be.an('array').that.is.not.empty;
      const titles = trainingsAttended.map((t) => t.title);
      expect(titles).to.include('JS Basics');
    });
  });

  it('should find participants for a training', async () => {
    const training = await Training.findOne({
      where: { title: 'JS Basics' },
    });
    const participants = await training.getParticipants();

    expect(participants).to.have.an('array').that.is.not.empty;

    const emails = participants.map((p) => p.email);
    expect(emails).to.include('charlie.participant@example.com');
  });

  after(async () => {
    await UserTraining.destroy({ where: {} });
    await Training.destroy({ where: {} });
    await User.destroy({ where: {} });
  });
});
