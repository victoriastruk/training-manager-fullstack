const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { sequelize, User, Training, Registration } = require('../models');

chai.use(chaiAsPromised);

const expect = chai.expect;

describe('Model Associations', function () {
  before(async () => {
    await sequelize.sync({ force: true });
  });

  it('should associate a trainer with many trainings', async () => {
    const trainer = await User.create({
      firstName: 'Alice',
      lastName: 'Trainer',
      email: 'alice@example.com',
      role: 'trainer',
    });

    await Training.create({
      title: 'JS Basics',
      description: 'Learn JS',
      date: new Date(Date.now() + 86400000),
      location: 'Room 1',
      trainerId: trainer.id,
    });

    await Training.create({
      title: 'React Intro',
      description: 'Learn React',
      date: new Date(Date.now() + 172800000),
      location: 'Room 2',
      trainerId: trainer.id,
    });

    const trainings = await trainer.getTrainingGiven();
    expect(trainings).to.have.lengthOf(2);
  });

  it('should associate a participant with a training through registration', async () => {
    const participant = await User.create({
      firstName: 'Bob',
      lastName: 'Participant',
      email: 'bob@example.com',
      role: 'participant',
    });
    const training = await Training.findOne({
      where: { title: 'JS Basics' },
    });
    await participant.addTrainingsAttended(training);

    const userTrainigs = await participant.getTrainingsAttended();
    expect(userTrainigs).to.have.lengthOf(1);
    expect(userTrainigs[0].title).to.equal('JS Basics');
  });

  it('should find users for a training via registration', async () => {
    const training = await Training.findOne({
      where: { title: 'JS Basics' },
    });
    const users = await training.getParticipants();

    expect(users).to.have.lengthOf(1);
    expect(users[0].email).to.equal('bob@example.com');
  });
});
