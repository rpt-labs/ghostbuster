
const moment = require('moment');
const githubQuery = require('./githubQuery');


// so node won't throw an error and crash when a team doesn't yet have any repos
process.on('uncaughtException', (err) => {
  console.log('Caught exception: ', err);
});

module.exports = class Team {
  constructor(teamName, orgName, students) {
    this.teamName = teamName;
    this.orgName = orgName;
    this.students = students;
    this.githubQuery = githubQuery;
  }

  get firstNames() {
    return this.students.map(student => student.firstName);
  }

  get githubHandles() {
    return this.students.map(student => student.github);
  }

  getRepoNames(repos) {
    return repos.map(repo => repo.name);
  }

  async getContributorsByRepo(repo) {
    try {
      const response = await this.githubQuery(
        `https://api.github.com/repos/${this.orgName}/${repo}/contributors
      `,
      );

      return response;
    } catch (error) {
      console.log('In getContributors', error);
      return error;
    }
  }

  async getAllContributors(repoList) {
    let contributions = [];
    for (const repo of repoList) {
      const currentContributors = await this.getContributorsByRepo(repo);
      contributions = contributions.concat(currentContributors);
    }
    return contributions;
  }

  async getRepos() {
    try {
      const response = await this.githubQuery(`
        https://api.github.com/orgs/${this.orgName}/repos
      `);

      return response;
    } catch (error) {
      console.log('In getRepos', error);
      return error;
    }
  }

  async getCommitsByRepo(repoName, days) {
    const daysAgo = moment().subtract(days, 'days');

    try {
      const response = await this.githubQuery(`
        https://api.github.com/repos/${this.orgName}/${repoName}/commits?since=${daysAgo}
      `);

      return response;
    } catch (error) {
      console.log(`In getCommitsByRepo, error retrieving ${repoName}`, error);
      return error;
    }
  }

  async getAllCommits(days) {
    try {
      const repos = await this.getRepos();
      if (repos) {
        const repoNames = this.getRepoNames(repos);
        let allCommits = [];

        for (const repo of repoNames) {
          const commits = await this.getCommitsByRepo(repo, days);
          if (commits) {
            allCommits = allCommits.concat(commits);
          }
        }
        return allCommits;
      }
      return [];
    } catch (error) {
      console.log('In getAllCommits', error);
      return error;
    }
  }

  async analyzeCommit(commit) {
    try {
      const response = await this.githubQuery(commit.url);
      return response;
    } catch (error) {
      console.log('In analyzeCommit', error);
      return error;
    }
  }

  async sortCommitsByStudent(commits) {
    try {
      const commitsByStudent = {};
      for (const commit of commits) {
        if (!commit.author) {
          continue;
        }

        const studentGithub = commit.author.login;
        const { message } = commit.commit;

        if (!message.includes('Merge')) {
          const commitData = await this.analyzeCommit(commit);
          const changeTotal = commitData.stats.total;
          if (changeTotal < 5000) {
            if (commitsByStudent[studentGithub]) {
              commitsByStudent[studentGithub].push({ sha: commit.sha, changes: changeTotal });
            } else {
              commitsByStudent[studentGithub] = [{ sha: commit.sha, changes: changeTotal }];
            }
          }
        }
      }
      return commitsByStudent;
    } catch (error) {
      console.log('in sortCommitsByStudent', error);
      return error;
    }
  }
};
