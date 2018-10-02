const { RPT10, RPT11 } = require('./cohorts.js');
const Student = require('./helpers/student');
const axios = require('axios');
const { GITHUB_TOKEN, AUTH_GITHUB_TOKEN } = require('./config/config');

let allSprints = {
  "underbar-review": [
    {message:"complete through indexof", percent: 25},
    {message:"complete part 1", percent:50},
    {message:"complete through defaults", percent:75},
    {message:"complete bare minimum requirements", percent:100}
  ],
  "recursion-review": [
    {message:"complete stringifyjson", percent: 50},
    {message:"complete getelementsbyclassname", percent: 100},
    {message:"complete bare minimum requirements", percent:100}
  ],
  "data-structures": ["Complete functional stack and queue","Complete functional-shared stack and queue","Complete prototypal stack and queue","Complete pseudoclassical stack and queue","Complete sprint one","Complete Linked List","Complete Tree","Complete Graph","Complete Set","Complete Hash Table","Complete Binary Search Tree","Complete Bare Minimum Requirements",
  ],
  "beesBeesBees": ["Complete Grub","Complete Bee","Complete HoneyMakerBee","Complete ForagerBee","Complete Bare Minimum Requirements"],
  "subclass-dance-party": ["Complete pseudoclassical refactor","Complete two new dancers","Complete adding css","Complete line up button","Complete background image","Complete dancer interactions","Complete mouse interaction","Complete Bare Minimum Requirements"],
  "n-queens": ["Complete board through col conflicts","Complete board.js","Complete N-rooks","Complete N-queens","Complete Bare Minimum Requirements"],
  "backcast": [],
  "recast.ly": [
      {message:"complete rendering app component to the dom", percent: 11},
      {message:"complete creating a dynamic video list component", percent:22},
      {message:"complete creating a dynamic video player component", percent:33},
      {message:"complete connecting video list and player components", percent:44},
      {message:"complete connecting app to the youtube api", percent:55},
      {message:"complete creating reusable api helper", percent:66},
      {message:"complete initializing the app with live data", percent:77},
      {message:"complete implementing live-search", percent: 88},
      {message:"complete bare minimum requirements", percent:100}
  ],
};

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

const printReports = (report) => {
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
      }
    }
    //color code the percents red, yellow, green?
    console.log('*******************************');
    console.log(`******* ${sprint} *******`);
    console.log('\x1b[37m','*******************************\n');
    noForks.forEach(name=> console.log('\x1b[31m', '👻 ', name, "has no fork."));
    console.log('\x1b[37m','\n******************************\n');
    inProgress.forEach(message => {
      //get just the number
      let beforeNumber = message.split('%')[0].split(' ');
      let afterNumber = message.split('%')[1];
      let number = parseInt(beforeNumber.pop());

      let numberColor = number < 50 ? '\x1b[31m'
        : number < 75 ? '\x1b[33m'
        : '\x1b[32m'
      console.log('\x1b[36m%s\x1b[0m', beforeNumber.join(' '), numberColor, number + '%', '\x1b[36m', afterNumber )
    });
    console.log('\x1b[37m','\n******************************\n');
    passedBMR.forEach(name => console.log('\x1b[32m', '💯 ', name + ' has completed bare minimum requirements'));
    //put back to white
    console.log('\x1b[37m');
  }
}

const printForCohort = async(cohort, sprints) => {
  let report = await checkCohort(cohort, sprints);
  printReports(report);
}

printForCohort(RPT11, ['underbar-review', 'recursion-review']);
printForCohort(RPT10, ['recast.ly']);















