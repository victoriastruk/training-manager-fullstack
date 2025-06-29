const { Router } = require('express');
const usersRouter = require('./usersRouter');
const trainigsRouter = require('./trainingsRouter');
const registersRouter = require('./registersRouter');

const router = Router();

router.use('/users', usersRouter);
router.use('/trainings', trainigsRouter);
router.use('/registers', registersRouter);

module.exports = router;
