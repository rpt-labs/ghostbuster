const express = require('express');
const app = express();
const cors = require('cors');
const asyncMiddleware = require('./helpers/asyncMiddleware');
const port = process.env.PORT || 1234;

app.get('/ghostbuster/sprints/:sprintNames', cors(), asyncMiddleware(async(req, res) => {
  let { sprintNames } = req.params;
  sprintNames = sprintNames.split('+');
  const { cohort } = req.query;
  res.send({'successory': cohort });
}));

app.get('/ghostbuster/teams/:cohorts', cors(), asyncMiddleware(async(req, res) => {
  let { cohorts } = req.params;
  cohorts = cohorts.split('+');
  res.send({"hoooooray": cohorts});
}));

app.listen(process.env.PORT || 1234, () => {
  console.log(`listening on port ${port}`);
})