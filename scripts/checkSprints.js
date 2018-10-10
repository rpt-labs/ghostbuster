const cohorts = require('../config/cohorts.js');
const Student = require('../helpers/student.js');
const { allSprints } = require('../config/sprints.js');

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

const printReports = (report, includeMessages) => {
  for (let sprint in report) {
    let noForks = [];
    let passedBMR = [];
    let inProgress = [];
    for (let student of report[sprint]) {
      if (student.commitMessages.includes('no fork')) {
        noForks.push(student.name);
      } else if (student.BMR) {
        passedBMR.push(student.name);
      } else {
        inProgress.push(`${student.name} is ${student.percentComplete}% complete with ${sprint}`);
        if (includeMessages) {
          inProgress.push(student.commitMessages);
        }
      }
    }

    console.log('*******************************');
    console.log(`******* ${sprint} *******`);
    console.log('*******************************\n');
    noForks.forEach(name=> console.log('\x1b[31m', '👻 ', name, "has no fork."));
    console.log('\x1b[37m','\n******************************\n');
    inProgress.forEach(message => {
      //get just the number
      if (Array.isArray(message)) {
        message.forEach(commit => console.log('\x1b[37m', commit));
      } else {
        let beforeNumber = message.split('%')[0].split(' ');
        let afterNumber = message.split('%')[1];
        let number = parseInt(beforeNumber.pop());

        //color code the percent complete green, yellow, or red
        let numberColor = number < 50 ? '\x1b[31m'
          : number < 75 ? '\x1b[33m'
          : '\x1b[32m'
        console.log('\x1b[36m%s\x1b[0m', beforeNumber.join(' '), numberColor, number + '%', '\x1b[36m', afterNumber )
      }

    });
    console.log('\x1b[37m','\n******************************\n');
    passedBMR.forEach(name => console.log('\x1b[32m', '💯 ', name + ' has completed bare minimum requirements'));
    //put back to white
    console.log('\x1b[37m');
  }
}

const printForCohort = async(cohort, sprints, includeMessages) => {
  let report = await checkCohort(cohort, sprints);
  printReports(report, includeMessages);
}

//when you call printForCohort, pass true as the last argument if you want a detailed list of each student's commits.  Pass false if you just want the colorful report















