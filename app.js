const express = require('express');
const app = express();
const cors = require('cors');
const asyncMiddleware = require('./helpers/asyncMiddleware');
const port = process.env.PORT || 1234;

//controllers
const sprintsController = require('./controllers/sprintsController');
const contributionsController = require('./controllers/contributionsController');
const teamsController = require('./controllers/teamsController');

//check sprints for pairing phase
app.get('/ghostbuster/sprints/:sprintNames', cors(), asyncMiddleware(sprintsController));

//check lifetime contributions for projects
app.get('/ghostbuster/teams/contributions', cors(), asyncMiddleware(contributionsController));

//check last week's team status for thesis phase
app.get('/ghostbuster/teams/projects', cors(), asyncMiddleware(teamsController));

app.listen(port, () => console.log(`listening on port ${port}`));
