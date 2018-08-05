const { thesisTeams } = require('./helpers/teams');
const Team = require('./helpers/team');

const sortCommitsByStudent = (commits, students) => {
  let commitsByStudent = {};
  for (let commit of commits) {

    let studentEmail = commit.commit.author.email;

    if (commitsByStudent[studentEmail]) {
      let commitIds = commitsByStudent[studentEmail];
      if (!commitIds.includes(commit.sha)) {
        commitsByStudent[studentEmail].push(commit.sha)
      }
    } else {
      commitsByStudent[studentEmail] = [commit.sha];
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

const checkForGhosts = (studentCommitData, students) => {

  let allEmails = students.map(student => student.email);
  let commitEmails = Object.keys(studentCommitData);

  let fairPercent = 100 / commitEmails.length;

  if (allEmails.length !== commitEmails.length) {
    let missing = allEmails.filter(email => commitEmails.includes(email) === false);
    console.log('\x1b[31m', '👻', missing, "has not made any commits in the last week");
    console.log('\x1b[37m');
  }

  for (const student in studentCommitData) {

    if (studentCommitData[student].percentage < fairPercent) {
      console.log('\x1b[33m',student, "has made less commits than their teammates");
    }
  }

  for (const student in studentCommitData) {
    console.log('\x1b[36m%s\x1b[0m', student, studentCommitData[student]);
  }

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
}

ghostBustByTeam('ASTA');
//ghostBustByTeam('crows');
//ghostBustByTeam('giraffes');




