const githubQuery = require('./githubQuery');
const { allCohorts } = require('../config/cohorts');

// so node won't throw an error and crash when a student doesn't have a fork
process.on('uncaughtException', err => {
  console.log('Caught exception: ', err);
});

const getStudentsList = cohortName => {
  const studentsList = allCohorts.filter(x => x.name === cohortName);
  return studentsList && studentsList.length ? studentsList[0].students : [];
};

const getCommits = async repoWithAuthor => {
  // @note currently fetches last 100 commits for the author
  const url = `http://api.github.com/repos/${repoWithAuthor}&page=1&per_page=100`;
  const response = await githubQuery(url);
  const commits = response.map(res => ({
    name: res.commit.message,
    date: res.commit.author.date,
    author: res.author && res.author.login
  }));
  return commits || [];
};

const getRepoListWithCommits = async urls => {
  const repoList = urls.split(',').map(url => url.replace('https://github.com/', '').trim());
  const commitsMap = {};
  const promises = repoList.map(async repo => {
    commitsMap[repo.split('/commits')[0]] = await getCommits(repo);
  });
  await Promise.all(promises);
  return commitsMap;
};

module.exports = {
  getStudentsList,
  getCommits,
  getRepoListWithCommits
};
