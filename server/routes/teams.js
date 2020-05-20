const { Router } = require('express');

const teamsRouter = Router();
const teamsController = require('../controllers/teamsController');

// teams TODO: delete functionality
teamsRouter.get('/', teamsController.getTeams);
teamsRouter.post('/', teamsController.createTeam);
teamsRouter.put('/', teamsController.updateTeam);
teamsRouter.delete('/:teamId', teamsController.deleteTeamById);

// team_student

// add a student to a team
teamsRouter.post('/:teamId/students/:studentId', teamsController.addStudentsToTeam);

// remove a student from a team
teamsRouter.delete('/:teamId/students/:studentId', teamsController.removeStudentFromTeam);

// remove all students from a team
teamsRouter.delete('/:teamId/students', teamsController.removeAllStudentsFromTeam);

// retrieve students for a particular team
teamsRouter.get('/:teamId/students', teamsController.getTeamStudents);

// get teams by cohort id
teamsRouter.get('/cohort/:cohortId', teamsController.getTeamsByCohortId);

module.exports = teamsRouter;
