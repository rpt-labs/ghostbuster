const githubQuery = require('./githubQuery');
const { allCohorts } = require('../config/cohorts');
const { allToyProblems } = require('../config/toyproblems');

// so node won't throw an error and crash when a student doesn't have a fork
process.on('uncaughtException', err => {
  console.log('Caught exception: ', err);
});

const getStudentsList = cohortName => {
  const studentsList = allCohorts.filter(x => x.name === cohortName);
  return studentsList && studentsList.length ? studentsList[0].students : [];
};

const checkIfPrTitleMatches = prTitle => {
  return allToyProblems.some(substring => prTitle.toLowerCase().includes(substring));
};

const AllPrsWithMatchingTitles = async studentPrList => {
  const allmatchedFileNames = studentPrList.filter(e => checkIfPrTitleMatches(e.toLowerCase()));

  return allmatchedFileNames;
};

const numberOfUniquePrsWithMatchingTitles = prList => {
  const allMatchedStrings = prList.map(pr => {
    const prArray = pr
      .toLowerCase()
      .replace('.js', '')
      .replace(/[^a-z ]/g, '')
      .split(' ');

    return prArray.filter(str => allToyProblems.indexOf(str) > -1);
  });

  const flattenedMatchedStrings = [];
  allMatchedStrings.forEach(item => flattenedMatchedStrings.push(...item));
  const uniquematchedFileNamesArray = Array.from(new Set(flattenedMatchedStrings));
  return uniquematchedFileNamesArray.length;
};

const getFilesChanged = async urls => {
  return Promise.all(
    urls.map(async url => {
      return githubQuery(`${url}/files`).then(response => {
        const items = [];
        response.map(item => items.push(item.filename.split('/')[0]));
        return items;
      });
    })
  );
};

const getPrListForStudent = async (cohort, student) => {
  const studentName = `${student.firstName} ${student.lastName}`;
  const studentGithubHandle = student.github;
  let matchedFileNames = [];
  let matchedFilesCount = 0;
  try {
    const response = await githubQuery(`
      https://api.github.com/search/issues?q=is:pr+repo:hackreactor/${cohort}-toy-problems+author:${
      student.github
    }&per_page=100`);
    if (response && response.items && response.items.length) {
      const pullRequestUrls = response.items.map(item => {
        return item.pull_request.url;
      });
      let filesChanged = await getFilesChanged(pullRequestUrls);
      filesChanged = [].concat(...filesChanged);
      matchedFileNames = (await AllPrsWithMatchingTitles(filesChanged)) || [];
      // remove duplicates
      matchedFileNames = [...new Set(matchedFileNames.map(pr => pr.toLowerCase().trim()))];
      matchedFilesCount = await numberOfUniquePrsWithMatchingTitles(matchedFileNames);
    }
  } catch (error) {
    console.log(error);
    return [{ commit: { message: 'no pr!' } }];
  }
  return { cohort, studentName, studentGithubHandle, matchedFileNames, matchedFilesCount };
};

const checkToyProblems = async cohort => {
  const studentsList = await getStudentsList(cohort);
  const getAllprs = async () => {
    return Promise.all(studentsList.map(async student => getPrListForStudent(cohort, student)));
  };
  const allPrs = await getAllprs();
  return allPrs;
};

const getReleasedToyProblems = async cohort => {
  const response = await githubQuery(
    `https://api.github.com/repos/hackreactor/${cohort}-toy-problems/commits?per_page=100`
  );

  let releasedProblems = [];
  if (response && response.length) {
    releasedProblems = response
      .map(res => ({
        name: res.commit.message,
        date: res.commit.author.date
      }))
      .filter(problem => problem.name.includes('(problem)'))
      // eslint-disable-next-line no-return-assign
      .map(problem => ({ name: problem.name.split(' ')[1], date: problem.date }))
      .sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
  }
  // check and remove if there are duplicate releases
  releasedProblems = releasedProblems.reduce((accumulator, current) => {
    const isAlreadyExist = () => accumulator.some(item => item.name === current.name);

    return isAlreadyExist(current) ? accumulator : [...accumulator, current];
  }, []);

  return releasedProblems;
};

module.exports = { checkToyProblems, getReleasedToyProblems };
