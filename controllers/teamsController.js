const { thesisTeams, greenfieldTeams, legacyTeams } = require('../config/teams');
const Team = require('../helpers/team');

let ghostMessages = [];
let potentialGhostMessages = [];
let reportMessagesCommits = [];
let reportMessagesChanges = [];
/*
  7 daysAgo will fetch the last week's worth of changes.  change to 14 for two weeks, 30 for a month, etc.
  future iteration, put a start date and end date, if github api allows
*/
const daysAgo = 7;

const countTotalCommitsAndChanges = (sortedCommits) => {
  let totalCommits = 0;
  let totalChanges = 0;
  for (let student in sortedCommits) {
    totalCommits += sortedCommits[student].length;
    totalChanges += sortedCommits[student].map(commit => commit.changes).reduce((a, b) => a + b);
  }
  return { totalCommits, totalChanges };
}

const countStudentChanges = (studentCommits) => {
  return studentCommits.reduce((a, b) => { return a += b.changes; }, 0);
}

//calculate number of commits/code changes and percentage of commits/code changes by team member
const analyzeCommits = (sortedCommits) => {
  let { totalChanges, totalCommits } = countTotalCommitsAndChanges(sortedCommits);
  let studentData = {};
  for (let student in sortedCommits) {
    let numCommits = sortedCommits[student].length;
    let numChanges = countStudentChanges(sortedCommits[student]);
    let commitPercentage = Math.floor((numCommits / totalCommits)*100);
    let changesPercentage = Math.floor((numChanges / totalChanges)*100);

    studentData[student] = { numCommits, numChanges, commitPercentage, changesPercentage };
  }
  return studentData;
};

//check for students who have made no commits in the specified time
const checkForGhosts = (studentCommitData, students) => {
  let allHandles = students.map(student => student.github);
  let commitHandles = Object.keys(studentCommitData);

  if (allHandles.length !== commitHandles.length) {
    let missingHandle = allHandles.filter(handle => commitHandles.includes(handle) === false);
    let missingStudents = students.filter(student => missingHandle.includes(student.github));
    missingStudents.forEach(student => {
      let ghostMessage = `${student.firstName} has not made any commits in the last ${daysAgo} days`;
      ghostMessages.push(ghostMessage);
      let reportMessage1 = `${student.firstName} has made 0 commits in the last ${daysAgo} days, 0% of all commits`;
      reportMessagesCommits.push(reportMessage1);
      let reportMessage2 = `${student.firstName} has made 0 code changes in the last ${daysAgo} days, 0% of all code changes`;
      reportMessagesChanges.push(reportMessage2);
    });
  }
}

//check for students who have made less commits/code changes than their peers
const checkForPotentialGhosts = (studentCommitData, students) => {
  let commitHandles = Object.keys(studentCommitData);
  let fairPercent = 100 / commitHandles.length;

  for (let handle in studentCommitData) {
    let currentStudent = students.filter(student => student.github === handle);
    let currentStudentData = studentCommitData[handle];

    if (currentStudent.length) {
      if (studentCommitData[handle].commitPercentage < fairPercent*.8) {
        let potentialGhostMessage = `⚠️ ${currentStudent[0].firstName} has made less commits than their teammates`;
        potentialGhostMessages.push(potentialGhostMessage);
      }
      if (studentCommitData[handle].changesPercentage < fairPercent*.8) {
        let potentialGhostMessage2 = `⚠️ ${currentStudent[0].firstName} has made less code changes than their teammates`;
        potentialGhostMessages.push(potentialGhostMessage2);
      }

      reportMessagesCommits.push(`${currentStudent[0].firstName} has made ${currentStudentData.numCommits} commits in the last ${daysAgo} days, ${currentStudentData.commitPercentage}% of all commits.`);
      reportMessagesChanges.push(`${currentStudent[0].firstName} has made ${currentStudentData.numChanges} code changes in the last ${daysAgo} days, ${currentStudentData.changesPercentage}% of all code changes.`)
    } else {
      console.log(handle);
    }
  }
}

const ghostBustByTeam = async (teamType, teamName) => {
  let orgName = teamType[teamName].github;
  let students = teamType[teamName].students;
  let team = new Team(teamName, orgName, students);
  const allCommits = await team.getAllCommits(daysAgo);
  let sorted = await team.sortCommitsByStudent(allCommits, team.students);
  let analyzed = analyzeCommits(sorted);

  return analyzed;
}

const ghostBustAllTeams = async() => {
  let thesisReport = {};
  for (let team in thesisTeams) {
    let report = await ghostBustByTeam(thesisTeams, team);
    thesisReport[team] = report;
  }
  let greenFieldReport = {};
  for (let group in greenfieldTeams) {
    let report2 = await ghostBustByTeam(greenfieldTeams, group);
    greenFieldReport[group] = report2;
  }
  let legacyReport = {};
  for (let gaggle in legacyTeams) {
    let report3 = await ghostBustByTeam(legacyTeams, gaggle);
    legacyReportp[gaggle] = report3;
  }
  return {
    thesis: thesisReport,
    greenfield: greenFieldReport,
    legacy: legacyReport
  };
}

module.exports = async function getTeamGithubData(req, res, next) {
  let report = await ghostBustAllTeams();
  res.send(report);
}






