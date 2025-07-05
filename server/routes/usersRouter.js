const { Router } = require('express');
const { usersController } = require('../controllers');
const usersRouter = Router();

usersRouter.route('/:userId/trainings').get(usersController.getUserTrainings);
module.exports = usersRouter;
