const express = require('express');
const graphqlHTTP = require('express-graphql');
const OktaJwtVerifier = require('@okta/jwt-verifier');
const cors = require('cors');
const path = require('path');

const app = express();
const asyncMiddleware = require('./helpers/asyncMiddleware');
const apiHelper = require('./helpers/api');

const port = process.env.PORT || 1234;
const { OKTA_URL, OKTA_CLIENT_ID } = process.env;

// okta authentication
const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: OKTA_URL,
  clientId: OKTA_CLIENT_ID,
  assertClaims: {
    aud: 'api://default'
  }
});

// graphql
const schema = require('./schema/schema');

// controllers (other controllers are used in routes)
const seedersController = require('./controllers/seedersController');

// routes
const cohorts = require('./routes/cohorts');
const students = require('./routes/students');
const teams = require('./routes/teams');
const sprints = require('./routes/sprints');
const toyproblems = require('./routes/toyproblems');
const projects = require('./routes/projects');

// use this as middleware on any routes you need to protect
// be sure to include the authorization header on the request from client
function authenticationRequired(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);

  if (!match) {
    res.status(401);
    return next('Unauthorized');
  }

  const accessToken = match[1];

  return oktaJwtVerifier
    .verifyAccessToken(accessToken)
    .then(jwt => {
      req.jwt = jwt;
      next();
    })
    .catch(err => {
      res.status(401).send(err.message);
    });
}

function logger(req, res, next) {
  console.log('url', req.url, 'path', req.path, 'method: ', req.method, 'query: ', req.query);
  next();
}

// cors
app.use(cors());

// //logging
app.use(logger);

// static files
app.use('/', express.static(path.join(__dirname, '../public')));

// graphql
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

// sprints
app.use('/ghostbuster/sprints', sprints);

// cohorts
app.use('/ghostbuster/cohorts', cohorts);

// students
app.use('/ghostbuster/students', students);

// teams
app.use('/ghostbuster/teams', teams);

// toyproblems
app.use('/ghostbuster/toyproblems', toyproblems);

// projects
app.use('/ghostbuster/projects', projects);

// to seed DB with current student/cohort/team information
app.get('/ghostbuster/seed/:seedType', asyncMiddleware(seedersController));

app.get('/api/cohorts/current', async (req, res) => {
  const data = await apiHelper.getCurrentCohorts();
  res.send(data.data);
});

app.get('/api/sprints', async (req, res) => {
  const data = await apiHelper.getSprints();
  res.send(data.data);
});

// wildcard
app.get('/*', (req, res) => {
  console.log(req.method, 'url', req.url, 'path', req.path);
  res.sendFile(path.join(__dirname, '../public/index.html'), err => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(port, () => console.log(`ghostbuster server listening on port ${port}`));
