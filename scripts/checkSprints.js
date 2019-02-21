const Student = require('../server/helpers/student.js');
const { allSprints } = require('../server/config/sprints.js');

const checkStudentFork = async (student, repoName) => {
  // master branch
  let commits = await student.checkFork(repoName);
  // check for any other branches, if found, add commits to those from master
  const branches = await student.getBranches(repoName);
  if (branches && branches.length > 1) {
    const notMaster = branches.slice(1);
    for (let i = 0; i < notMaster.length; i += 1) {
      const branchName = notMaster[i].name;
      const branchCommits = await student.checkBranch(repoName, branchName);
      commits = commits.concat(branchCommits);
    }
  }

  const commitMessages = student.commitMessages(commits);
  const BMR = student.passBMR(commitMessages);
  const percentComplete = student.percentComplete(allSprints[repoName], commitMessages);
  const summary = {
    name: student.fullName,
    BMR,
    percentComplete,
    commitMessages
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

const printReports = (report, includeMessages) => {
  for (const sprint in report) {
    const noForks = [];
    const passedBMR = [];
    const inProgress = [];
    for (const student of report[sprint]) {
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
    noForks.forEach(name => console.log('\x1b[31m', '👻 ', name, 'has no fork.'));
    console.log('\x1b[37m', '\n******************************\n');
    inProgress.forEach(message => {
      // get just the number
      if (Array.isArray(message)) {
        message.forEach(commit => console.log('\x1b[37m', commit));
      } else {
        const beforeNumber = message.split('%')[0].split(' ');
        const afterNumber = message.split('%')[1];
        const number = parseInt(beforeNumber.pop(), 10);

        // color code the percent complete green, yellow, or red
        let numberColor;
        if (number < 50) {
          numberColor = '\x1b[31m';
        } else {
          numberColor = number < 75 ? '\x1b[33m' : '\x1b[32m';
        }
        console.log(
          '\x1b[36m%s\x1b[0m',
          beforeNumber.join(' '),
          numberColor,
          `${number}%`,
          '\x1b[36m',
          afterNumber
        );
      }
    });
    console.log('\x1b[37m', '\n******************************\n');
    passedBMR.forEach(name =>
      console.log('\x1b[32m', '💯 ', `${name} has completed bare minimum requirements`)
    );
    // put back to white
    console.log('\x1b[37m');
  }
};

const printForCohort = async (cohort, sprints, includeMessages) => {
  const report = await checkCohort(cohort, sprints);
  printReports(report, includeMessages);
};

/* when you call printForCohort, pass true as the last argument if you want a detailed list of each student's commits.  Pass false if you just want the colorful report
  printForCohort(COHORT_OBJ, ['sprint-title', 'sprint2-title], false)
*/
