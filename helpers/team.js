const axios = require('axios');
const moment = require('moment');
const { GITHUB_TOKEN } = require('../config/config');

module.exports = class Team {
  constructor(teamName, orgName, students) {
    this.teamName = teamName;
    this.orgName = orgName;
    this.students = students;
  }

  get emails() {
    return this.students.map(student => student.email);
  }

  get firstNames() {
    return this.students.map(student => student.firstName);
  }

  get githubHandles() {
    return this.students.map(student => student.github);
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
      console.log(error);
    }
  }

  getRepoNames(repos) {
    return repos.map(repo => repo.name);
  }

  async getCommitsByRepo(repoName) {
    const weekAgo = moment().subtract(7, 'days');
    let response = await axios({
      method: 'get',
      url: `https://api.github.com/repos/${this.orgName}/${repoName}/commits?since=${weekAgo}`,
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`
      }
    });

    return response.data
  }

  async getAllCommits() {
    let repos = await this.getRepos();
    let repoNames = this.getRepoNames(repos);
    let allCommits = [];

    for (let repo of repoNames) {
      let commits = await this.getCommitsByRepo(repo);
      allCommits = allCommits.concat(commits);
    }
    return allCommits;
  }
}