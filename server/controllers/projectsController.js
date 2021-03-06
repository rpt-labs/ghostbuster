const projectsChecker = require('../helpers/projectsChecker');

exports.getStudentsList = async (req, res) => {
  const { cohort } = req.query;
  const studentsList = await projectsChecker.getStudentsList(cohort);
  res.json({ studentsList });
};

exports.getCommits = async (req, res) => {
  const { repoName } = req.query;
  const commits = await projectsChecker.getCommits(repoName);
  res.json({ commits });
};

exports.getRepoListWithCommits = async (req, res) => {
  const { urls } = req.query;
  const commits = await projectsChecker.getRepoListWithCommits(urls);
  res.json({ commits });
};
