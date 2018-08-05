const { thesisTeams } = require('./teams');
const Team = require('./helpers/team');

let ghostMessages = [];
let potentialGhostMessages = [];
let reportMessages = [];

//excluding commits that are merging pull requests, sort commits by author (student)
//TODO: write another function that analyzes the quality of each commit
const sortCommitsByStudent = (commits, students) => {
  let commitsByStudent = {};
  for (let commit of commits) {

    let studentGithub = commit.author.login;
    let message = commit.commit.message;

    if (commitsByStudent[studentGithub]) {
      let commitIds = commitsByStudent[studentGithub];

      if (!commitIds.includes(commit.sha) && !message.includes("Merge pull request") ) {
        commitsByStudent[studentGithub].push(commit.sha)
      }
    } else {
      commitsByStudent[studentGithub] = [commit.sha];
    }
  }

  return commitsByStudent;
}

const countTotalCommits = (sortedCommits) => {
  let total = 0;
  for (let student in sortedCommits) {
    total += sortedCommits[student].length;
  }
  return total;
}

//calculate number of commits and percentage of commits by team member
const analyzeCommits = (sortedCommits) => {
  let total = countTotalCommits(sortedCommits);

  let studentData = {};
  for (let student in sortedCommits) {
    let numCommits = sortedCommits[student].length;
    let percentage = (numCommits / total)*100;

    studentData[student] = { numCommits, percentage };
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
      let reportMessage = `${student.firstName} has made 0 commits in the last week, 0 percent of all commits`;
      reportMessages.push(reportMessage);
    });
  }
}

//check for students who have made less commits than their peers
const checkForPotentialGhosts = (studentCommitData, students) => {
  let commitHandles = Object.keys(studentCommitData);
  let fairPercent = 100 / commitHandles.length;

  for (let handle in studentCommitData) {
    if (studentCommitData[handle].percentage < fairPercent) {
      let potentialGhost = students.filter(student => student.github === handle);
      let potentialGhostMessage = `⚠️ ${potentialGhost[0].firstName} has made less commits than their teammates`;
      potentialGhostMessages.push(potentialGhostMessage);
    }
    let currentStudent = students.filter(student => student.github === handle);
    let currentStudentData = studentCommitData[handle];
    reportMessages.push(`${currentStudent[0].firstName} has made ${currentStudentData.numCommits} commits in the last week, ${currentStudentData.percentage} percent of all commits.`);
  }
}

const printReports = (teamName) => {
  console.log('******************', teamName, '***********************');
  ghostMessages.forEach(message => console.log('\x1b[31m', '👻', message));
  ghostMessages = [];
  //print potential ghosts
  potentialGhostMessages.forEach(message => console.log('\x1b[33m', message));
  potentialGhostMessages = [];
  //print week's status report
  reportMessages.forEach(message => console.log('\x1b[36m%s\x1b[0m', message));
  reportMessages = [];
  //put back to white
  console.log('\x1b[37m');
}

const ghostBustByTeam = async (teamName) => {
  let orgName = thesisTeams[teamName].github;
  let students = thesisTeams[teamName].students;
  let team = new Team(teamName, orgName, students);
  const allCommits = await team.getAllCommits();
  let sorted = sortCommitsByStudent(allCommits, team.students);
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




