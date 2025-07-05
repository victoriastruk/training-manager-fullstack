const { Router } = require('express');
const { usersController } = require('../controllers');
const usersRouter = Router();

usersRouter.route('/').get(usersController.getTrainers);

usersRouter
  .route('/:userId/trainings')
  .get(usersController.getUserTrainings)
  .delete(usersController.deleteUserFromTraining);
module.exports = usersRouter;
