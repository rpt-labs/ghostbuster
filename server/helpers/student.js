/* eslint-disable class-methods-use-this */
const githubQuery = require('./githubQuery');

// so node won't throw an error and crash when a student doesn't have a fork
process.on('uncaughtException', err => {
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
    return `${this.firstName} ${this.lastName}`;
  }

  async checkFork(repoName) {
    try {
      const response = await this.githubQuery(`
        https://api.github.com/repos/${this.github}/${this.cohort}-${repoName}/commits
      `);
      if (response.length) {
        return response;
      }
      return [{ commit: { message: 'no fork' } }];
    } catch (error) {
      console.log(error);
      return [{ commit: { message: 'no fork' } }];
    }
  }

  async getBranches(repoName) {
    try {
      const response = await this.githubQuery(`
        https://api.github.com/repos/${this.github}/${this.cohort}-${repoName}/branches
      `);
      return response;
    } catch (error) {
      console.log(`Error checking branches for ${this.firstName}'s ${repoName}`);
      return error;
    }
  }

  async checkBranch(repoName, branchName) {
    try {
      const response = await this.githubQuery(`
      https://api.github.com/repos/${this.github}/${
        this.cohort
      }-${repoName}/commits?sha=${branchName}
      `);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  commitMessages(commitData) {
    if (commitData) {
      return commitData.map(commit => {
        if (commit.commit && commit.commit.message && !commit.commit.message.includes('Merge')) {
          const { message } = commit.commit;
          const normalizedMessage = message
            .toLowerCase()
            .trim()
            .replace(/['"]+/g, '');

          return { message, normalizedMessage };
        }
        return { message: 'Merge Commit', normalizedMessage: 'merge commit' };
      });
    }
    return null;
  }

  passBMR(commitData) {
    if (commitData) {
      return commitData.some(
        commit => commit.normalizedMessage === 'complete bare minimum requirements'
      );
    }
    return null;
  }

  // this version allows students to work out of order but does not account for human error of missing one of the milestone commits

  percentComplete(possibleCommits, commitData) {
    const possibleMessages = possibleCommits.map(x => x.message);
    // filter by matching the predetermined commit messages, then make unique in case students make more than one of the same milestone commit messages
    const matching = commitData
      .map(commit => commit.normalizedMessage)
      .filter(commit => possibleMessages.includes(commit))
      .reduce((a, b) => {
        if (!a.includes(b)) {
          a.push(b);
        }
        return a;
      }, []);
    const percent = Math.floor((matching.length / possibleMessages.length) * 100);
    return percent;
  }
};
