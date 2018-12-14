const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const path = require('path');

const app = express();
const asyncMiddleware = require('./helpers/asyncMiddleware');

const port = process.env.PORT || 1234;

// graphql
const schema = require('./schema/schema');

// controllers (other controllers are used in routes)
const seedersController = require('./controllers/seedersController');

// routes
const cohorts = require('./routes/cohorts');
const students = require('./routes/students');
const teams = require('./routes/teams');
const sprints = require('./routes/sprints');

// static files
app.use('/', express.static(path.join(__dirname, '../public')));

// cors
app.use(cors());

// graphql
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

// sprints
app.use('/ghostbuster/sprints', sprints);

// cohorts
app.use('/ghostbuster/cohorts', cohorts);

// students
app.use('/ghostbuster/students', students);

// teams
app.use('/ghostbuster/teams', teams);

// to seed DB with current student/cohort/team information
app.get('/ghostbuster/seed/:seedType', asyncMiddleware(seedersController));

app.listen(port, () => console.log(`listening on port ${port}`));
