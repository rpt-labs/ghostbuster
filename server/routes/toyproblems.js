const { Router } = require('express');

const toyproblemsRouter = Router();
const toyproblemsController = require('../controllers/toyProblemsController');

toyproblemsRouter.get('/', toyproblemsController.getToyProblemsData);

module.exports = toyproblemsRouter;
