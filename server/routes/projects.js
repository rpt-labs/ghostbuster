const { Router } = require('express');

const projectsRouter = Router();
const projectsController = require('../controllers/projectsController');

projectsRouter.get('/', projectsController.getStudentsList);
projectsRouter.get('/commits', projectsController.getCommits);
projectsRouter.get('/repolist', projectsController.getRepoListWithCommits);

module.exports = projectsRouter;
