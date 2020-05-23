// TODO: refactor to use database instead of config files.  May need to refactor student helper.

const Student = require('./student');
const { allCohorts } = require('../config/cohorts');
const { allSprints } = require('../config/sprints');

const checkStudentFork = async (student, repoName) => {
  let commits = await student.checkFork(repoName);
  const branches = await student.getBranches(repoName);
  if (branches) {
    const notMaster = branches.slice(1);
    for (const branch of notMaster) {
      const newCommits = await student.checkBranch(repoName, branch.name);
      commits = commits.concat(newCommits);
    }
  }

  const commitMessages = student.commitMessages(commits);
  const BMR = student.passBMR(commitMessages);
  const AdvancedContent = student.passAdvancedContent(commitMessages)
  const percentComplete = student.percentComplete(allSprints[repoName].messages, commitMessages);
  const summary = {
    name: student.fullName,
    BMR,
    AdvancedContent,
    percentComplete,
    commitMessages,
    github: student.github,
    cohort: student.cohort
  };
  return summary;
};

const checkCohort = async (cohort, sprints = []) => {
  const report = {};
  for (const student of cohort.students) {
    const currentStudent = new Student(
      student.firstName,
      student.lastName,
      student.github,
      cohort.name
    );
    for (const repo of sprints) {
      const summary = await checkStudentFork(currentStudent, repo);
      if (report[repo]) {
        report[repo].push(summary);
      } else {
        report[repo] = [summary];
      }
    }
  }

  return report;
};

const sortReport = report => {
  for (const repo in report) {
    report[repo] = report[repo].sort((a, b) => {
      if (a.percentComplete < b.percentComplete) {
        return -1;
      }
      if (a.percentComplete === b.percentComplete) {
        return 0;
      }
      return 1;
    });
  }
  return report;
};

const getSprintGithubData = async (cohortName, sprintNames) => {
  const matching = allCohorts.filter(x => x.name === cohortName)[0];
  const report = await checkCohort(matching, sprintNames);
  const sorted = sortReport(report);
  return sorted;
};

module.exports = getSprintGithubData;
