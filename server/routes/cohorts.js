const { Router } = require('express');
const cohortsRouter = Router();
const cohortsController = require('../controllers/cohortsController');

//cohort information TODO: delete functionality
cohortsRouter.get('/', cohortsController.getCohorts);
cohortsRouter.post('/', cohortsController.createCohort)
cohortsRouter.put('/', cohortsController.updateCohort)
cohortsRouter.delete('/', cohortsController.deleteCohort);

module.exports = cohortsRouter;
