// TODO: refactor to use DB instead of config files.  May need to refactor team helper.
const { thesisTeams, greenfieldTeams, legacyTeams } = require('../config/teams');
const Team = require('./team');

const sortContributionsByStudent = (team, contributionData) => {
  const contributions = {};
  for (const contribution of contributionData) {
    if (contribution !== '') {
      const student = team.students.filter(x => x.github === contribution.login)[0];
      // only count contributions of students, so a staff member creating content will not throw error
      if (student) {
        if (contributions[student.firstName]) {
          contributions[student.firstName].numContributions += contribution.contributions;
        } else {
          contributions[student.firstName] = {
            github: contribution.login,
            numContributions: contribution.contributions,
          };
        }
      }
    }
  }
  return contributions;
};

const analyzeContributions = (sortedContributions) => {
  const totalContributions = Object.entries(sortedContributions).reduce((a, b) => a + b[1].numContributions, 0);

  for (const student in sortedContributions) {
    const percentage = Math.floor(sortedContributions[student].numContributions / totalContributions * 100);
    sortedContributions[student].percentage = percentage;
  }

  return sortedContributions;
};

const getContributorsByTeam = async (teamType, teamName) => {
  const orgName = teamType[teamName].github;
  const { students } = teamType[teamName];
  const team = new Team(teamName, orgName, students);
  const repos = await team.getRepos();
  let analyzed = {};
  if (repos) {
    const repoList = await team.getRepoNames(repos);
    const allContributions = await team.getAllContributors(repoList);
    const sorted = sortContributionsByStudent(team, allContributions);
    analyzed = analyzeContributions(sorted);
  }
  return analyzed;
};

const getContributionsByCohort = async (teamType, cohort) => {
  const teamData = teamType === 'thesis'
    ? thesisTeams : teamType === 'legacy'
      ? legacyTeams : greenfieldTeams;
  const teams = Object.keys(teamData);
  const cohortTeams = teams.filter(team => teamData[team].cohort === cohort.toUpperCase());
  const report = {};
  for (const team of cohortTeams) {
    const contributions = await getContributorsByTeam(teamData, team);
    report[team] = contributions;
  }
  return report;
};

module.exports = getContributionsByCohort;
