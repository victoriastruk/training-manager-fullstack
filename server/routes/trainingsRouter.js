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
  .patch(trainingsController.updateTraining)
  .delete(trainingsController.deleteTraining);
module.exports = trainingsRouter;
