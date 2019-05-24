const githubQuery = require('./githubQuery');
const { allCohorts } = require('../config/cohorts');
const { allToyProblems } = require('../config/toyproblems');

// so node won't throw an error and crash when a student doesn't have a fork
process.on('uncaughtException', err => {
  console.log('Caught exception: ', err);
});

const getStudentsList = cohortName => {
  return allCohorts.filter(x => x.name === cohortName)[0].students;
};

const checkIfPrTitleMatches = prTitle => {
  return allToyProblems.some(substring => prTitle.toLowerCase().includes(substring));
};

const AllPrsWithMatchingTitles = studentPrList => {
  const allMatchedPrs = studentPrList.filter(e => checkIfPrTitleMatches(e.toLowerCase()));
  console.log(allMatchedPrs);
  return allMatchedPrs;
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
      const matchedPrs = AllPrsWithMatchingTitles(pullRequests) || [];
      return { cohort, studentName, matchedPrs };
    }
  } catch (error) {
    console.log(error);
    return [{ commit: { message: 'no pr!' } }];
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
