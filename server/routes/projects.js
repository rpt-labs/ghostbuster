const { Router } = require('express');

const projectsRouter = Router();
const projectsController = require('../controllers/projectsController');

projectsRouter.get('/', projectsController.getStudentsList);

module.exports = projectsRouter;
