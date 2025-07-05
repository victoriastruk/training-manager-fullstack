const createHttpError = require('http-errors');
const { User, Training } = require('../models');

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
