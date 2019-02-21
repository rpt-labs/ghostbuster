const { Router } = require('express');

const teamsRouter = Router();
const teamsController = require('../controllers/teamsController');

// teams TODO: delete functionality
teamsRouter.get('/', teamsController.getTeams);
teamsRouter.post('/', teamsController.createTeam);
teamsRouter.put('/', teamsController.updateTeam);
teamsRouter.delete('/', teamsController.deleteTeam);

// team_student

// add a student to a team
teamsRouter.post('/:teamId/students/:studentId', teamsController.addStudentsToTeam);

// remove a student from a team
teamsRouter.delete('/:teamId/students/:studentId', teamsController.removeStudentFromTeam);

// retrieve students for a particular team
teamsRouter.get('/:teamId/students', teamsController.getTeamStudents);

// check on weekly team engagement for projects
teamsRouter.get('/projects/:cohort', teamsController.getTeamGithubData);

// check on lifetime contributions for projects
teamsRouter.get(
  '/projects/:cohort/:teamType/lifetime',
  teamsController.getLifetimeContributionData
);

module.exports = teamsRouter;
