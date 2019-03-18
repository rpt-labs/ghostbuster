// right now, to add or edit team information, you'll use a file named teams.js in the root of the project
// TODO: (maybe? not sure if it's worth the effort) integrate with Google Sheets to automate the team information

const { thesisTeams, greenfieldTeams, legacyTeams } = require('../server/config/teams');
const Team = require('../server/helpers/team');

let ghostMessages = [];
let potentialGhostMessages = [];
let reportMessagesCommits = [];
let reportMessagesChanges = [];
/*
  7 daysAgo will fetch the last week's worth of changes.  change to 14 for two weeks, 30 for a month, etc.
  future iteration, put a start date and end date, if github api allows
*/
const daysAgo = 37;

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
const analyzeCommits = sortedCommits => {
  const { totalChanges, totalCommits } = countTotalCommitsAndChanges(sortedCommits);
  const studentData = {};
  for (const student in sortedCommits) {
    const numCommits = sortedCommits[student].length;
    const numChanges = countStudentChanges(sortedCommits[student]);
    const commitPercentage = Math.floor((numCommits / totalCommits) * 100);
    const changesPercentage = Math.floor((numChanges / totalChanges) * 100);

    studentData[student] = {
      numCommits,
      numChanges,
      commitPercentage,
      changesPercentage
    };
  }
  return studentData;
};

// check for students who have made no commits in the specified time
const checkForGhosts = (studentCommitData, students) => {
  const allHandles = students.map(student => student.github);
  const commitHandles = Object.keys(studentCommitData);

  if (allHandles.length !== commitHandles.length) {
    const missingHandle = allHandles.filter(handle => commitHandles.includes(handle) === false);
    const missingStudents = students.filter(student => missingHandle.includes(student.github));
    missingStudents.forEach(student => {
      const ghostMessage = `${
        student.firstName
      } has not made any commits in the last ${daysAgo} days`;
      ghostMessages.push(ghostMessage);
      const reportMessage1 = `${
        student.firstName
      } has made 0 commits in the last ${daysAgo} days, 0% of all commits`;
      reportMessagesCommits.push(reportMessage1);
      const reportMessage2 = `${
        student.firstName
      } has made 0 code changes in the last ${daysAgo} days, 0% of all code changes`;
      reportMessagesChanges.push(reportMessage2);
    });
  }
};

// check for students who have made less commits/code changes than their peers
const checkForPotentialGhosts = (studentCommitData, students) => {
  const commitHandles = Object.keys(studentCommitData);
  const fairPercent = 100 / commitHandles.length;

  for (const handle in studentCommitData) {
    const currentStudent = students.filter(student => student.github === handle);
    const currentStudentData = studentCommitData[handle];

    if (currentStudent.length) {
      if (studentCommitData[handle].commitPercentage < fairPercent * 0.8) {
        const potentialGhostMessage = `⚠️ ${
          currentStudent[0].firstName
        } has made less commits than their teammates`;
        potentialGhostMessages.push(potentialGhostMessage);
      }
      if (studentCommitData[handle].changesPercentage < fairPercent * 0.8) {
        const potentialGhostMessage2 = `⚠️ ${
          currentStudent[0].firstName
        } has made less code changes than their teammates`;
        potentialGhostMessages.push(potentialGhostMessage2);
      }

      reportMessagesCommits.push(
        `${currentStudent[0].firstName} has made ${
          currentStudentData.numCommits
        } commits in the last ${daysAgo} days, ${
          currentStudentData.commitPercentage
        }% of all commits.`
      );
      reportMessagesChanges.push(
        `${currentStudent[0].firstName} has made ${
          currentStudentData.numChanges
        } code changes in the last ${daysAgo} days, ${
          currentStudentData.changesPercentage
        }% of all code changes.`
      );
    } else {
      console.log(handle);
    }
  }
};

const printReports = teamName => {
  console.log('******************', teamName, '***********************');
  ghostMessages.forEach(message => console.log('\x1b[31m', '👻', message));
  ghostMessages = [];
  // print potential ghosts
  potentialGhostMessages.forEach(message => console.log('\x1b[33m', message));
  potentialGhostMessages = [];
  // print week's status report for commits
  reportMessagesCommits.forEach(message => console.log('\x1b[36m%s\x1b[0m', message));
  reportMessagesCommits = [];
  // print week's status report for code changes
  reportMessagesChanges.forEach(message => console.log('\x1b[32m', message));
  reportMessagesChanges = [];

  // put back to white
  console.log('\x1b[37m');
};

const ghostBustByTeam = async (teamType, teamName) => {
  const orgName = teamType[teamName].github;
  const { students } = teamType[teamName];
  const team = new Team(teamName, orgName, students);
  const allCommits = await team.getAllCommits(daysAgo);
  const sorted = await team.sortCommitsByStudent(allCommits, team.students);
  const analyzed = analyzeCommits(sorted);

  checkForGhosts(analyzed, team.students);
  checkForPotentialGhosts(analyzed, team.students);
  printReports(teamName);
};

const ghostBustAllTeams = async () => {
  console.log('*******************************');
  console.log('***** THESIS TEAMS ************');
  console.log('*******************************\n');
  for (const team in thesisTeams) {
    await ghostBustByTeam(thesisTeams, team);
  }
  console.log('*******************************');
  console.log('***** GREENFIELD TEAMS ********');
  console.log('*******************************\n');
  for (const group in greenfieldTeams) {
    await ghostBustByTeam(greenfieldTeams, group);
  }
  console.log('*******************************');
  console.log('***** LEGACY TEAMS ************');
  console.log('*******************************\n');
  for (const gaggle in legacyTeams) {
    await ghostBustByTeam(legacyTeams, gaggle);
  }
};

ghostBustAllTeams();
