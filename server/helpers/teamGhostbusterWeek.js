// TODO: refactor to use DB instead of team config files. May need to refactor team helper

const { thesisTeams } = require('../config/teams');
const Team = require('./team');

const daysAgo = 7;

const countTotalCommitsAndChanges = sortedCommits => {
  let totalCommits = 0;
  let totalChanges = 0;
  for (const student in sortedCommits) {
    totalCommits += sortedCommits[student].length;
    totalChanges += sortedCommits[student].map(commit => commit.changes).reduce((a, b) => a + b);
  }
  return { totalCommits, totalChanges };
};

const countStudentChanges = studentCommits => studentCommits.reduce((a, b) => (a += b.changes), 0);

// calculate number of commits/code changes and percentage of commits/code changes by team member
const analyzeCommits = (sortedCommits, students) => {
  const { totalChanges, totalCommits } = countTotalCommitsAndChanges(sortedCommits);
  const allHandles = students.map(student => student.github);
  const commitHandles = Object.keys(sortedCommits);
  const studentData = {};

  for (const student in sortedCommits) {
    const currentStudent = students.filter(x => x.github === student)[0];
    const { github } = currentStudent;
    const numCommits = sortedCommits[student].length;
    const numChanges = countStudentChanges(sortedCommits[student]);
    const commitPercentage = Math.floor((numCommits / totalCommits) * 100);
    const changesPercentage = Math.floor((numChanges / totalChanges) * 100);

    studentData[currentStudent.firstName] = {
      github,
      numCommits,
      numChanges,
      commitPercentage,
      changesPercentage
    };
  }
  // check for students who made no commits in the last week
  if (allHandles.length !== commitHandles.length) {
    const missingHandle = allHandles.filter(handle => commitHandles.includes(handle) === false);
    const missingStudents = students.filter(student => missingHandle.includes(student.github));
    missingStudents.forEach(student => {
      studentData[student.firstName] = {
        github: student.github,
        numCommits: 0,
        numChanges: 0,
        commitPercentage: 0,
        changesPercentage: 0
      };
    });
  }

  return studentData;
};

const ghostBustByTeam = async (teamType, teamName) => {
  const orgName = teamType[teamName].github;
  const { students } = teamType[teamName];
  const team = new Team(teamName, orgName, students);
  const allCommits = await team.getAllCommits(daysAgo);
  const sorted = await team.sortCommitsByStudent(allCommits, team.students);
  const analyzed = analyzeCommits(sorted, students);
  return analyzed;
};

const ghostBustAllTeams = async cohort => {
  const thesisReport = {};
  for (const team in thesisTeams) {
    if (thesisTeams[team].cohort === cohort.toUpperCase()) {
      const report = await ghostBustByTeam(thesisTeams, team);
      thesisReport[team] = report;
    }
  }

  return {
    results: thesisReport
  };
};

module.exports = ghostBustAllTeams;
