const Student = require('../helpers/student');
const Cohorts = require('../config/cohorts');
const { allSprints } = require('../config/sprints');

const checkStudentFork = async(student, repoName) => {
  let commits = await student.checkFork(repoName);
  let commitMessages = student.commitMessages(commits);
  let BMR = student.passBMR(commitMessages);
  let percentComplete = student.percentComplete(allSprints[repoName], commitMessages);
  let summary = {name: student.fullName, BMR, percentComplete, commitMessages };
  return summary;
}

const checkCohort = async(cohort, sprints=[]) => {
  let report = {};
  for (let student of cohort.students) {
    var currentStudent = new Student(student.firstName, student.lastName, student.github, cohort.name);
    for (let repo of sprints) {
      let summary = await checkStudentFork(currentStudent, repo);
      if (report[repo]) {
        report[repo].push(summary);
      } else {
        report[repo] = [summary]
      }
    }
  }

  return report;
}

module.exports = async function getSprintGithubData(req, res, next) {
  let { sprintNames } = req.params;
  sprintNames = sprintNames.split('+');
  const { cohort } = req.query;

  const report = await checkCohort(Cohorts[cohort], sprintNames);
  res.send(report);
};
