// const githubQuery = require('./githubQuery');
const { allCohorts } = require('../config/cohorts');

// so node won't throw an error and crash when a student doesn't have a fork
process.on('uncaughtException', err => {
  console.log('Caught exception: ', err);
});

const getStudentsList = cohortName => {
  const studentsList = allCohorts.filter(x => x.name === cohortName);
  return studentsList && studentsList.length ? studentsList[0].students : [];
};

module.exports = {
  getStudentsList
};
