//right now, to add or edit thesis team information, you'll use a file named teams.js in the root of the project
//TODO: (maybe? not sure if it's worth the effort) integrate with Google Sheets to automate the team information

const { thesisTeams } = require('./teams');
const Team = require('./helpers/team');

let ghostMessages = [];
let potentialGhostMessages = [];
let reportMessagesCommits = [];
let reportMessagesChanges = [];

const countTotalCommitsAndChanges = (sortedCommits) => {
  let totalCommits = 0;
  let totalChanges = 0;
  for (let student in sortedCommits) {
    totalCommits += sortedCommits[student].length;
    totalChanges += sortedCommits[student].map(commit => commit.changes).reduce((a, b) => a + b);
  }
  return { totalCommits, totalChanges };
}

const countStudnetChanges = (studentCommits) => {
  let total = 0;
  for (let commit of studentCommits){
    total += commit.changes;
  }
  return total;
}

//calculate number of commits/code changes and percentage of commits/code changes by team member
const analyzeCommits = (sortedCommits) => {
  let { totalChanges, totalCommits } = countTotalCommitsAndChanges(sortedCommits);
  let studentData = {};
  for (let student in sortedCommits) {
    let numCommits = sortedCommits[student].length;
    let numChanges = countStudnetChanges(sortedCommits[student]);
    let commitPercentage = (numCommits / totalCommits)*100;
    let changesPercentage = (numChanges / totalChanges)*100;

    studentData[student] = { numCommits, numChanges, commitPercentage, changesPercentage };
  }
  return studentData;
};

//check for students who have made no commits in the last week
const checkForGhosts = (studentCommitData, students) => {
  let allHandles = students.map(student => student.github);
  let commitHandles = Object.keys(studentCommitData);

  if (allHandles.length !== commitHandles.length) {
    let missingHandle = allHandles.filter(handle => commitHandles.includes(handle) === false);
    let missingStudents = students.filter(student => missingHandle.includes(student.github));
    missingStudents.forEach(student => {
      let ghostMessage = `${student.firstName} has not made any commits in the last week`;
      ghostMessages.push(ghostMessage);
      let reportMessage1 = `${student.firstName} has made 0 commits in the last week, 0 percent of all commits`;
      reportMessagesCommits.push(reportMessage1);
      let reportMessage2 = `${student.firstName} has made 0 code changes in the last week, 0 percent of all code changes`;
      reportMessagesChanges.push(reportMessage2);
    });
  }
}

//check for students who have made less commits/code changes than their peers
const checkForPotentialGhosts = (studentCommitData, students) => {
  let commitHandles = Object.keys(studentCommitData);
  let fairPercent = 100 / commitHandles.length;

  for (let handle in studentCommitData) {
    let potentialGhost = students.filter(student => student.github === handle);

    if (studentCommitData[handle].commitPercentage < fairPercent*.8) {
      let potentialGhostMessage = `⚠️ ${potentialGhost[0].firstName} has made less commits than their teammates`;
      potentialGhostMessages.push(potentialGhostMessage);
    }
    if (studentCommitData[handle].changesPercentage < fairPercent*.8) {
      let potentialGhostMessage2 = `⚠️ ${potentialGhost[0].firstName} has made less code changes than their teammates`;
      potentialGhostMessages.push(potentialGhostMessage2);
    }
    let currentStudent = students.filter(student => student.github === handle);
    let currentStudentData = studentCommitData[handle];
    reportMessagesCommits.push(`${currentStudent[0].firstName} has made ${currentStudentData.numCommits} commits in the last week, ${currentStudentData.commitPercentage} percent of all commits.`);
    reportMessagesChanges.push(`${currentStudent[0].firstName} has made ${currentStudentData.numChanges} code changes in the last week, ${currentStudentData.changesPercentage} percent of all code changes.`)
  }
}

const printReports = (teamName) => {
  console.log('******************', teamName, '***********************');
  ghostMessages.forEach(message => console.log('\x1b[31m', '👻', message));
  ghostMessages = [];
  //print potential ghosts
  potentialGhostMessages.forEach(message => console.log('\x1b[33m', message));
  potentialGhostMessages = [];
  //print week's status report for commits
  reportMessagesCommits.forEach(message => console.log('\x1b[36m%s\x1b[0m', message));
  reportMessagesCommits = [];
  //print week's status report for code changes
  reportMessagesChanges.forEach(message => console.log('\x1b[32m', message));
  reportMessagesChanges = [];

  //put back to white
  console.log('\x1b[37m');
}

const ghostBustByTeam = async (teamName) => {
  let orgName = thesisTeams[teamName].github;
  let students = thesisTeams[teamName].students;
  let team = new Team(teamName, orgName, students);
  const allCommits = await team.getAllCommits();
  let sorted = await team.sortCommitsByStudent(allCommits, team.students);
  let analyzed = analyzeCommits(sorted);

  checkForGhosts(analyzed, team.students);
  checkForPotentialGhosts(analyzed, team.students);
  printReports(teamName);
}

const ghostBustAllTeams = async() => {
  for (let team in thesisTeams) {
    await ghostBustByTeam(team);
  }
}

ghostBustAllTeams();




