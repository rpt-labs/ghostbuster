const axios = require('axios');
const { AUTH_GITHUB_TOKEN } = require('../config/config');
//so node won't throw an error and crash when a student doesn't have a fork
process.on('uncaughtException', function (err) {
  console.log('Caught exception: ', err);
});

module.exports = class Student {
  constructor(firstName, lastName, github, cohort) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.github = github;
    this.cohort = cohort;
  }

  get fullName() {
    return this.firstName + ' ' + this.lastName;
  }

  async checkFork(repoName) {
    try {
      let response = await axios({
        method: 'get',
        url: `https://api.github.com/repos/${this.github}/${this.cohort}-${repoName}/commits`,
        headers: {
          'Authorization': `token ${AUTH_GITHUB_TOKEN}`
        }
      });
      return response.data;
    } catch(error) {
      return [{commit:{message: "no fork"}}];
    }
  }

  async getBranches(repoName) {
    try {
      let response = await axios({
        method: 'get',
        url: `https://api.github.com/repos/${this.github}/${this.cohort}-${repoName}/branches`,
        headers: {
          'Authorization': `token ${AUTH_GITHUB_TOKEN}`
        }
      });
      return response.data;
    } catch(error)  {
      //console.log(`Error checking branches for ${this.firstName}'s ${repoName}`);
    }
  }

  async checkBranch(repoName, branchName) {
    try {
      let response = await axios({
        method: 'get',
        url: `https://api.github.com/repos/${this.github}/${this.cohort}-${repoName}/commits?sha=${branchName}`,
        headers: {
          'Authorization': `token ${AUTH_GITHUB_TOKEN}`
        }
      });
      return response.data;
    } catch(error) {
      console.log(error);
    }
  }

  commitMessages(commitData) {
    if (commitData) {
      return commitData.map(commit => commit.commit.message.replace(/['"-]+/g, ''));
    }
  }

  passBMR(commitData) {
    if (commitData) {
      let lowerCases = commitData.map(message => message.toLowerCase());
      return lowerCases.includes("complete bare minimum requirements");
    }
  }

  //this version allows students to work out of order but does not account for human error of missing one of the milestone commits

  percentComplete(possibleCommits, commitData) {
    let possibleMessages = possibleCommits.map(x => x.message);
    //filter by matching the predetermined commit messages, then make unique in case students make more than one of the same milestone commit messages
    let matching = commitData.filter(x => possibleMessages.includes(x.toLowerCase())).reduce((a, b) => {
      if (!a.includes(b)) {
        a.push(b);
      }
      return a;
    }, []);
    let percent = Math.floor((matching.length / possibleMessages.length)*100);
    return percent;
  }

  //this version attempts to account for human error in missing a milestone commit, but does not account for students working out of order
  // percentComplete(possibleCommits, commitData) {
  //   let highestPercent = 0;
  //   let possibleMessages = possibleCommits.map(x => x.message);
  //   let matching = commitData.filter(x => possibleMessages.includes(x));
  //   for (var i = 0; i < matching.length; i++) {
  //     let currentCommitMessage = matching[i];
  //     let fullCommit = possibleCommits.filter(x => x.message === currentCommitMessage)[0];
  //     if (fullCommit.percent > highestPercent) {
  //       highestPercent = fullCommit.percent
  //     }
  //   }
  //   return highestPercent;
  // }
}