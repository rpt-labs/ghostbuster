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

//static files
app.use('/', express.static(path.join(__dirname, '../public')));
app.use(cors());

//check sprints for pairing phase
app.get('/ghostbuster/sprints/:sprintNames', asyncMiddleware(sprintsController));

//check lifetime contributions for projects
app.get('/ghostbuster/teams/contributions/:cohort/:teamType', asyncMiddleware(contributionsController));

//check last week's team status for thesis phase
app.get('/ghostbuster/teams/projects/:cohort', asyncMiddleware(teamsController));

app.listen(port, () => console.log(`listening on port ${port}`));
