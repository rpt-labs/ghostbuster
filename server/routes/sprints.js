const { Router } = require('express');
const sprintsRouter = Router();
const sprintsController = require('../controllers/sprintsController');

//sprints TODO: delete functionality
sprintsRouter.get('/', sprintsController.getSprints)
sprintsRouter.post('/', sprintsController.createSprint)
sprintsRouter.put('/', sprintsController.updateSprint)
sprintsRouter.delete('/', sprintsController.deleteSprint);

//milesone messages TODO: delete functionality
sprintsRouter.get('/messages/:sprintId', sprintsController.getMessagesBySprintId);
sprintsRouter.post('/messages', sprintsController.createMessage);
sprintsRouter.put('/messages', sprintsController.updateMessage);
sprintsRouter.delete('/messages', sprintsController.deleteMessage);

//get cohort progress with github checker
sprintsRouter.get('/:sprintNames', sprintsController.getSprintGithubData);

module.exports = sprintsRouter;
