const axios = require('axios');
const moment = require('moment');
const { GITHUB_TOKEN } = require('../config/config');

module.exports = class Team {
  constructor(teamName, orgName, students) {
    this.teamName = teamName;
    this.orgName = orgName;
    this.students = students;
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
      let response = await axios({
        method: 'get',
        url: `https://api.github.com/repos/${this.orgName}/${repo}/contributors`,
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`
        }
      });
      return response.data;

    } catch(error) {
      console.log("In getContributors", error);
    }
  }

  async getAllContributors(repoList) {
    let contributions = [];
    for (let repo of repoList) {
      let currentContributors = await this.getContributorsByRepo(repo);
      contributions = contributions.concat(currentContributors);
    }
    return contributions;
  }

  async getRepos() {
    try {
      let response = await axios({
        method: 'get',
        url: `https://api.github.com/orgs/${this.orgName}/repos`,
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`
        }
      });
      return response.data;
    } catch(error) {
      console.log("In getRepos", error);
    }
  }

  async getCommitsByRepo(repoName, days) {
    const daysAgo = moment().subtract(days, 'days');

    try {
      let response = await axios({
        method: 'get',
        url: `https://api.github.com/repos/${this.orgName}/${repoName}/commits?since=${daysAgo}`,
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`
        }
      });
      return response.data;
    } catch(error) {
      console.log(`In getCommitsByRepo, error retrieving ${repoName}`, error);
    }
  }

  async getAllCommits(days) {
    try {
      let repos = await this.getRepos();
      let repoNames = this.getRepoNames(repos);
      let allCommits = [];

      for (let repo of repoNames) {
        let commits = await this.getCommitsByRepo(repo, days);
        if (commits) {
          allCommits = allCommits.concat(commits);
        }
      }
      return allCommits;
    } catch(error) {
      console.log("In getAllCommits", error);
    }
  }
  async analyzeCommit(commit) {
    try {
      let response = await axios({
        method: 'get',
        url: commit.url,
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`
        }
      });
      return response.data;
    } catch(error) {
      console.log("In analyzeCommit", error);
    }
  }

  async sortCommitsByStudent(commits) {
    try {
      let commitsByStudent = {};
      for (let commit of commits) {
        if (!commit.author) {
          continue;
        }

        let studentGithub = commit.author.login;
        let message = commit.commit.message;

        if (!message.includes("Merge pull request")) {
          let commitData = await this.analyzeCommit(commit);
          let changeTotal = commitData.stats.total;
          if (commitsByStudent[studentGithub]) {
            let commitIds = commitsByStudent[studentGithub].map(x => x.sha);
            if (!commitIds.includes(commit.sha)) {
              commitsByStudent[studentGithub].push({sha: commit.sha, changes: changeTotal});
            }
          } else {
            commitsByStudent[studentGithub] = [{sha: commit.sha, changes: changeTotal}];
          }
        }
      }
      return commitsByStudent;
    } catch(error) {
      console.log("in sortCommitsByStudent", error);
    }
  }
}