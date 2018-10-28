const Student = require('../helpers/student');
const Cohorts = require('../config/cohorts');
const { allSprints } = require('../config/sprints');

const checkStudentFork = async(student, repoName) => {
  let commits = await student.checkFork(repoName);
  let branches = await student.getBranches(repoName);
  if (branches) {
    let notMaster = branches.slice(1);
    for (let branch of notMaster) {
      let newCommits = await student.checkBranch(repoName, branch.name);
      commits = commits.concat(newCommits);
   }
  }

  let commitMessages = student.commitMessages(commits);
  let BMR = student.passBMR(commitMessages);
  let percentComplete = student.percentComplete(allSprints[repoName], commitMessages);
  let summary = {
    name: student.fullName,
    BMR,
    percentComplete,
    commitMessages,
    github: student.github,
    cohort: student.cohort
  };
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

const sortReport = (report) => {
  for (let repo in report) {
    report[repo] = report[repo].sort((a, b) => {
      if (a.percentComplete < b.percentComplete) {
        return -1;
      } else if (a.percentComplete === b.percentComplete) {
        return 0;
      } else {
        return 1;
      }
    });
  }
  return report;
}

module.exports = async function getSprintGithubData(req, res, next) {
  let { sprintNames } = req.params;
  sprintNames = sprintNames.split('+');
  const { cohort } = req.query;

  const report = await checkCohort(Cohorts[cohort], sprintNames);
  const sorted = sortReport(report);
  res.send(sorted);
};
