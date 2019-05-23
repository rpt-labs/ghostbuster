const githubQuery = require('./githubQuery');
const { allCohorts } = require('../config/cohorts');

// so node won't throw an error and crash when a student doesn't have a fork
process.on('uncaughtException', err => {
  console.log('Caught exception: ', err);
});

const getStudentsList = cohortName => {
  return allCohorts.filter(x => x.name === cohortName)[0].students;
};

const getPrListForStudent = async (cohort, student) => {
  const studentName = `${student.firstName} ${student.lastName}`;
  try {
    const response = await githubQuery(`
      https://api.github.com/search/issues?q=is:pr+repo:hackreactor/${cohort}-toy-problems+author:${
      student.github
    }`);
    if (response && response.items.length) {
      const pullRequests = response.items.map(item => {
        return item.title;
      });
      return { cohort, studentName, pullRequests };
    }
  } catch (error) {
    console.log(error);
    return [{ commit: { message: 'no fork' } }];
  }
  return [];
};

const checkToyProblems = async cohort => {
  const studentsList = getStudentsList(cohort);
  const getAllprs = async () => {
    return Promise.all(studentsList.map(student => getPrListForStudent(cohort, student)));
  };
  const allPrs = getAllprs();
  return allPrs;
};

module.exports = checkToyProblems;
