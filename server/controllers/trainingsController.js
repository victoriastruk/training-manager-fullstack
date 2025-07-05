const createHttpError = require('http-errors');
const { Training, User } = require('./../models');

module.exports.createTraining = async (req, res, next) => {
  const { body } = req;
  try {
    const createdTraining = await Training.create(body);

    const preparedTraining = await Training.findByPk(createdTraining.id, {
      include: [
        {
          model: User,
          as: 'trainer',
          attributes: ['firstName', 'lastName', 'email'],
        },
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    res.status(201).send({ data: preparedTraining });
  } catch (err) {
    next(err);
  }
};

module.exports.getTraining = async (req, res, next) => {
  const {
    dateFilter,
    pagination: { limit, offset },
  } = req;

  try {
    const foundTrainings = await Training.findAll({
      where: dateFilter || {},
      limit,
      offset,
      include: [
        {
          model: User,
          as: 'trainer',
          attributes: ['firstName', 'lastName', 'email'],
        },
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    res.status(200).send({ data: foundTrainings });
  } catch (err) {
    next(err);
  }
};

module.exports.getTrainingById = async (req, res, next) => {
  const { trainingId } = req.params;

  try {
    const foundTraining = await Training.findByPk(trainingId, {
      include: [
        {
          model: User,
          as: 'trainer',
          attributes: ['firstName', 'lastName', 'email'],
        },
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    res.status(200).send({ data: foundTraining });
  } catch (err) {
    next(err);
  }
};

module.exports.updateTraining = async (req, res, next) => {
  const {
    body,
    params: { trainingId },
  } = req;
  try {
    const training = await Training.findByPk(trainingId);
    if (!training) {
      return next(createHttpError(404, 'Training not found'));
    }
    await training.update(body);

    const updatedTraining = await Training.findByPk(trainingId, {
      include: [
        {
          model: User,
          as: 'trainer',
          attributes: ['firstName', 'lastName', 'email'],
        },
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    res.status(200).send({ data: updatedTraining });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteTraining = async (req, res, next) => {
  const { trainingId } = req.params;
  try {
    const deletedTraningsCount = await Training.destroy({
      where: { id: trainingId },
    });
    if (!deletedTraningsCount) {
      return next(createHttpError(404, 'Training not found'));
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports.registerUserToTraining = async (req, res, next) => {
  const { trainingId } = req.params;
  const { firstName, lastName, email } = req.body;
  try {
    const [user] = await User.findOrCreate({
      where: { email },
      defaults: {
        firstName,
        lastName,
        email,
        role: 'participant',
      },
    });

    const existing = await user.getTrainingsAttended({
      where: { id: trainingId },
    });

    if (existing.length > 0) {
      return res.status(409).send({
        message: 'You are already registered for this training',
      });
    }
    await user.addTrainingsAttended(trainingId);

    return res.status(201).send({
      message: 'Successfully registered for the training',
      userId: user.id,
    });
  } catch (err) {
    next(err);
  }
};

