const githubQuery = require('./githubQuery');

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
    this.githubQuery = githubQuery;
  }

  get fullName() {
    return this.firstName + ' ' + this.lastName;
  }

  async checkFork(repoName) {
    try {
      let response = await this.githubQuery(`
        https://api.github.com/repos/${this.github}/${this.cohort}-${repoName}/commits
      `);
      if (response.length) {
        return response;
      } else {
        return [{commit:{message: "no fork"}}];
      }
    } catch(error) {
      console.log(error);
      return [{commit:{message: "no fork"}}];
    }
  }

  async getBranches(repoName) {
    try {
      let response = await this.githubQuery(`
        https://api.github.com/repos/${this.github}/${this.cohort}-${repoName}/branches
      `);
      return response;
    } catch(error)  {
      //console.log(`Error checking branches for ${this.firstName}'s ${repoName}`);
    }
  }

  async checkBranch(repoName, branchName) {
    try {
      let response = await this.githubQuery(`
      https://api.github.com/repos/${this.github}/${this.cohort}-${repoName}/commits?sha=${branchName}
      `);
      return response;
    } catch(error) {
      console.log(error);
    }
  }

  commitMessages(commitData) {
    if (commitData) {
      return commitData.map(commit => {
        if (!commit.commit.message.includes("Merge")){
          return commit.commit.message.replace(/['"-]+/g, '');
        } else {
          return "Merge commit";
        }
      });
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
};
