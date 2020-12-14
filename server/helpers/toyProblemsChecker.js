const githubQuery = require('./githubQuery');
const { allCohorts } = require('../config/cohorts');

// so node won't throw an error and crash when a student doesn't have a fork
process.on('uncaughtException', err => {
  console.log('Caught exception: ', err);
});

const getStudentsList = cohortName => {
  const studentsList = allCohorts.filter(cohort => cohort.name === cohortName);
  return studentsList && studentsList.length ? studentsList[0].students : [];
};

const getReleasedFolderNames = async cohort => {
  const response = await githubQuery(
    `https://api.github.com/repos/hackreactor/${cohort}-toy-problems/git/trees/master?recursive=1`
  );
  if (!response.tree || !response.tree.length) {
    return [];
  }
  return response.tree.filter(res => res.path.includes('/')).map(res => res.path.split('/')[0]);
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
      .filter(
        problem =>
          problem.name.includes('(problem)') &&
          problem.name.split(' ')[1] &&
          problem.name.split(' ')[1].length
      )
      // eslint-disable-next-line no-return-assign
      .map(problem => ({
        name: problem.name.split(' ')[1],
        date: problem.date
      }))
      .sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
  }
  // check and remove if there are duplicate releases
  releasedProblems = releasedProblems.reduce((accumulator, current) => {
    const isAlreadyExist = () => accumulator.some(item => item.name === current.name);

    return isAlreadyExist(current) ? accumulator : [...accumulator, current];
  }, []);
  const releasedProblemNames = releasedProblems.map(problem => problem.name);
  const releasedFolderNames = await getReleasedFolderNames(cohort);

  const additionalReleases = releasedFolderNames.filter(
    item => !releasedProblemNames.includes(item)
  );
  additionalReleases.forEach(release => {
    releasedProblems.push({
      name: release,
      date: '-'
    });
  });
  return releasedProblems.filter(problem => !!problem.name);
};

const checkIfPrTitleMatches = async (prTitle, allProblems) => {
  const allReleasedProblemsList = allProblems.map(item => item.name.toLowerCase());
  return allReleasedProblemsList.some(substring => prTitle.toLowerCase().includes(substring));
};

const AllPrsWithMatchingTitles = async (allProblems, studentPrList, cohort) => {
  const allMatchedFileNames = studentPrList.filter(e =>
    checkIfPrTitleMatches(e.toLowerCase(), allProblems, cohort)
  );
  return allMatchedFileNames;
};

const numberOfUniquePrsWithMatchingTitles = async (allProblems, prList) => {
  const allReleasedProblemsList = allProblems.map(item => item.name.toLowerCase());
  const allMatchedStrings = prList.map(pr => {
    const prArray = pr
      .toLowerCase()
      .replace('.js', '')
      .replace(/[^a-z ]/g, '')
      .split(' ');

    return prArray.filter(str => allReleasedProblemsList.indexOf(str) > -1);
  });

  const flattenedMatchedStrings = [];
  allMatchedStrings.forEach(item => flattenedMatchedStrings.push(...item));
  const uniqueMatchedFileNamesArray = Array.from(new Set(flattenedMatchedStrings));
  return uniqueMatchedFileNamesArray.length;
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

const getPrListForStudent = async (allProblems, cohort, student) => {
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
      matchedFileNames = (await AllPrsWithMatchingTitles(allProblems, filesChanged, cohort)) || [];
      // remove duplicates
      matchedFileNames = [...new Set(matchedFileNames.map(pr => pr.toLowerCase().trim()))];
      matchedFilesCount = await numberOfUniquePrsWithMatchingTitles(
        allProblems,
        matchedFileNames,
        cohort
      );
    }
  } catch (error) {
    console.log(error);
    return [{ commit: { message: 'no pr!' } }];
  }
  return { cohort, studentName, studentGithubHandle, matchedFileNames, matchedFilesCount };
};

const checkToyProblems = async cohort => {
  const allProblems = await getReleasedToyProblems(cohort);
  const studentsList = await getStudentsList(cohort);
  const getAllprs = async () => {
    return Promise.all(
      studentsList.map(async student => getPrListForStudent(allProblems, cohort, student))
    );
  };
  const allPrs = await getAllprs();
  return allPrs;
};

module.exports = {
  getStudentsList,
  checkIfPrTitleMatches,
  AllPrsWithMatchingTitles,
  numberOfUniquePrsWithMatchingTitles,
  getFilesChanged,
  getPrListForStudent,
  checkToyProblems,
  getReleasedToyProblems
};
