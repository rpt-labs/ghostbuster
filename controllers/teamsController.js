const { thesisTeams } = require('../config/teams');
const Team = require('../helpers/team');
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
const analyzeCommits = (sortedCommits, students) => {
  let { totalChanges, totalCommits } = countTotalCommitsAndChanges(sortedCommits);
  let allHandles = students.map(student => student.github);
  let commitHandles = Object.keys(sortedCommits);
  let studentData = {};

  for (let student in sortedCommits) {
    let currentStudent = students.filter(x => x.github === student)[0];
    let numCommits = sortedCommits[student].length;
    let numChanges = countStudentChanges(sortedCommits[student]);
    let commitPercentage = Math.floor((numCommits / totalCommits)*100);
    let changesPercentage = Math.floor((numChanges / totalChanges)*100);

    studentData[currentStudent.firstName] = { numCommits, numChanges, commitPercentage, changesPercentage };
  }
  //check for students who made no commits in the last week
  if (allHandles.length !== commitHandles.length) {
    let missingHandle = allHandles.filter(handle => commitHandles.includes(handle) === false);
    let missingStudents = students.filter(student => missingHandle.includes(student.github));
    missingStudents.forEach(student => {
      studentData[student.firstName] = { numCommits: 0, numChanges: 0, commitPercentage: 0, changesPercentage: 0};
    });
  }

  return studentData;
};

const ghostBustByTeam = async (teamType, teamName) => {
  let orgName = teamType[teamName].github;
  let students = teamType[teamName].students;
  let team = new Team(teamName, orgName, students);
  const allCommits = await team.getAllCommits(daysAgo);
  let sorted = await team.sortCommitsByStudent(allCommits, team.students);
  let analyzed = analyzeCommits(sorted, students);

  return analyzed;
}

const ghostBustAllTeams = async() => {
  let thesisReport = {};
  for (let team in thesisTeams) {
    let report = await ghostBustByTeam(thesisTeams, team);
    thesisReport[team] = report;
  }
  return {
    results: thesisReport
  };
}

module.exports = async function getTeamGithubData(req, res, next) {
  let report = await ghostBustAllTeams();
  res.send(report);
}






