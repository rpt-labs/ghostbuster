const express = require('express');
const app = express();
const cors = require('cors');
const asyncMiddleware = require('./helpers/asyncMiddleware');
const port = process.env.PORT || 1234;

//controllers
const sprintsController = require('./controllers/sprintsController');
const teamsController = require('./controllers/teamsController');
console.log(sprintsController);

//check sprints for pairing phase
app.get('/ghostbuster/sprints/:sprintNames', cors(), asyncMiddleware(sprintsController));

//check teams for project phase
app.get('/ghostbuster/teams/:cohorts', cors(), asyncMiddleware(teamsController));

app.listen(process.env.PORT || 1234, () => {
  console.log(`listening on port ${port}`);
})