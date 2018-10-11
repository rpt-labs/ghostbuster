const { thesisTeams, greenfieldTeams, legacyTeams } = require('../config/teams');
const Team = require('../helpers/team');

const getContributorsByTeam = async (teamType, teamName) => {
  let orgName = teamType[teamName].github;
  let students = teamType[teamName].students;
  let team = new Team(teamName, orgName, students);
  const repos = await team.getRepos();
  const repoList = await team.getRepoNames(repos);
  const allContributions = await team.getAllContributors(repoList);
  const sorted = sortContributionsByStudent(team, allContributions);
  const analyzed = analyzeContributions(sorted);

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
        contributions[student.firstName] = {github:contribution.login, numContributions: contribution.contributions};
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

const getContributorsAllTeams = async() => {
  let thesisReport = {};
  for (let team in thesisTeams) {
    let results1 = await getContributorsByTeam(thesisTeams, team);
    thesisReport[team] = results1;
  }
  let greenfieldReport = {};
  for (let group in greenfieldTeams) {
    let results2 = await getContributorsByTeam(greenfieldTeams, group);
    greenFieldReport[group] = results2;
  }
  let legacyReport = {};
  for (let gaggle in legacyTeams) {
    let results3 = await getContributorsByTeam(legacyTeams, gaggle);
    legacyReport[gaggle] = results3;
  }
  return {
    thesis: thesisReport,
    greenfield: greenfieldReport,
    legacy: legacyReport
  };
}

module.exports = async function getLifetimeContributionData(req, res, next) {
  let report = await getContributorsAllTeams();
  res.send(report);
}