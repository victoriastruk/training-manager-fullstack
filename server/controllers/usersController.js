const createHttpError = require('http-errors');
const { User, Training, UserTraining } = require('../models');

module.exports.getTrainers = async (req, res, next) => {
  try {
    const foundTrainers = await User.findAll({
      where: {
        role: 'trainer',
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
    return res.status(200).send(foundTrainers);
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
        attributes: ['id', 'title', 'description', 'date', 'location'],
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

module.exports.deleteUserFromTraining = async (req, res, next) => {
  const { userId } = req.params;
  const { trainingId } = req.body;
  try {
    const deletedCount = await UserTraining.destroy({
      where: { userId, trainingId },
    });
    if (!deletedCount) {
      return next(createHttpError(404, 'User not found'));
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
