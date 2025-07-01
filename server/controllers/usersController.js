const createHttpError = require('http-errors');
const { User, Training } = require('../models');

module.exports.registerTraining = async (req, res, next) => {
  const { userId } = req.params;
  const { trainingId } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return next(createHttpError(404, 'User not found'));
    }
    const training = await Training.findByPk(trainingId);

    await user.addTrainingsAttended(training);

    return res.status(200).send('Participant registered successfully');
  } catch (err) {
    next(err);
  }
};

module.exports.getUserTrainings = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findByPk(userId, {
      include: {
        model: Training,
        as: 'trainingsAttended',
        through: { attributes: [] },
        attributes: ['title', 'description', 'date', 'location'],
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    if (!user) {
      return next(createHttpError(404, 'User not found'));
    }

    return res.status(200).send(user.trainingsAttended);
  } catch (err) {
    next(err);
  }
};
