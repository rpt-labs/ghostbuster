const express = require('express');
const app = express();
const cors = require('cors');
const asyncMiddleware = require('./server/helpers/asyncMiddleware');
const port = process.env.PORT || 1234;

//controllers
const sprintsController = require('./server/controllers/sprintsController');
const contributionsController = require('./server/controllers/contributionsController');
const teamsController = require('./server/controllers/teamsController');

//check sprints for pairing phase
app.get('/ghostbuster/sprints/:sprintNames', cors(), asyncMiddleware(sprintsController));

//check lifetime contributions for projects
app.get('/ghostbuster/teams/contributions', cors(), asyncMiddleware(contributionsController));

//check last week's team status for thesis phase
app.get('/ghostbuster/teams/projects', cors(), asyncMiddleware(teamsController));

app.listen(port, () => console.log(`listening on port ${port}`));