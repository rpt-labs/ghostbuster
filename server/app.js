const express = require('express');
const app = express();
const cors = require('cors');
const asyncMiddleware = require('./helpers/asyncMiddleware');
const port = process.env.PORT || 1234;
const path = require('path');

//controllers
const sprintsController = require('./controllers/sprintsController');
const contributionsController = require('./controllers/contributionsController');
const teamsController = require('./controllers/teamsController');
const cohortsController = require('./controllers/cohortsController');

//static files
app.use('/', express.static(path.join(__dirname, '../public')));
app.use(cors());

//cohort information
app.route('/ghostbuster/cohorts')
  .get(asyncMiddleware(cohortsController.getCohorts))
  .post(asyncMiddleware(cohortsController.createCohort))
  .put(asyncMiddleware(cohortsController.updateCohort))
  .delete(asyncMiddleware(cohortsController.deleteCohort));

//student information
app.route('/ghostbuster/cohorts/students')
  .get(asyncMiddleware(cohortsController.getStudents))
  .post(asyncMiddleware(cohortsController.createStudent))
  .put(asyncMiddleware(cohortsController.updateStudent))
  .delete(asyncMiddleware(cohortsController.deleteStudent));

//check sprints for pairing phase
app.get('/ghostbuster/sprints/:sprintNames', asyncMiddleware(sprintsController));

//check lifetime contributions for projects
app.get('/ghostbuster/teams/contributions/:cohort/:teamType', asyncMiddleware(contributionsController));

//check last week's team status for thesis phase
app.get('/ghostbuster/teams/projects/:cohort', asyncMiddleware(teamsController));

app.listen(port, () => console.log(`listening on port ${port}`));
