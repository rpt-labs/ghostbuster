//TODO: refactor to use DB instead of config files.  May need to refactor team helper.
const { thesisTeams, greenfieldTeams, legacyTeams } = require('../config/teams');
const Team = require('./team');

const getContributorsByTeam = async (teamType, teamName) => {
  let orgName = teamType[teamName].github;
  let students = teamType[teamName].students;
  let team = new Team(teamName, orgName, students);
  const repos = await team.getRepos();
  let analyzed = {};
  if (repos) {
    const repoList = await team.getRepoNames(repos);
    const allContributions = await team.getAllContributors(repoList);
    const sorted = sortContributionsByStudent(team, allContributions);
    analyzed = analyzeContributions(sorted);
  }
  return analyzed;
}

const sortContributionsByStudent = (team, contributionData) => {
  let contributions = {};
  for (const contribution of contributionData) {
    if (contribution !== '') {
      let student = team.students.filter(x => x.github === contribution.login)[0];
      if (contributions[student.firstName]) {
        contributions[student.firstName].numContributions += contribution.contributions;
      } else {
        contributions[student.firstName] = {
          github:contribution.login,
          numContributions: contribution.contributions
        };
      }
    }
  }
  return contributions;
}

const analyzeContributions = (sortedContributions) => {
  let totalContributions = Object.entries(sortedContributions).reduce((a, b) => {
    return a + b[1].numContributions
  }, 0);

  for (const student in sortedContributions) {
    let percentage = Math.floor(sortedContributions[student].numContributions/ totalContributions * 100);
    sortedContributions[student].percentage = percentage;
  }

  return sortedContributions;
}

const getContributionsByCohort = async(teamType, cohort) => {
  let teamData = teamType === 'thesis'
    ? thesisTeams : teamType === 'legacy'
      ? legacyTeams : greenfieldTeams;
  const teams = Object.keys(teamData);
  const cohortTeams = teams.filter(team => teamData[team]['cohort'] === cohort.toUpperCase());
  let report = {};
  for (let team of cohortTeams) {
    let contributions = await getContributorsByTeam(teamData, team);
    report[team] = contributions;
  }
  return report;
};

module.exports = getContributionsByCohort;
