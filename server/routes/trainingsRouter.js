const { Router } = require('express');
const { trainingsController } = require('../controllers');
const { paginate, filter } = require('../middleware');
const trainingsRouter = Router();

trainingsRouter
  .route('/')
  .get(
    filter.filterDate,
    paginate.paginateTrainings,
    trainingsController.getTraining
  )
  .post(trainingsController.createTraining);

trainingsRouter
  .route('/:trainingId')
  .get(trainingsController.getTrainingById)
  .patch(trainingsController.updateTraining)
  .delete(trainingsController.deleteTraining);

trainingsRouter
  .route('/:trainingId/registration')
  .post(trainingsController.registerUserToTraining);

module.exports = trainingsRouter;
