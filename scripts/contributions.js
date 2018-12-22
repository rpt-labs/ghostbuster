const { thesisTeams, greenfieldTeams, legacyTeams } = require('../server/config/teams');
const Team = require('../server/helpers/team');

const sortContributionsByStudent = (contributionData) => {
  const contributions = {};
  for (const contribution of contributionData) {
    if (contribution !== '') {
      if (contributions[contribution.login]) {
        contributions[contribution.login].numContributions += contribution.contributions;
      } else {
        contributions[contribution.login] = { numContributions: contribution.contributions };
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
  const repoList = await team.getRepoNames(repos);
  const allContributions = await team.getAllContributors(repoList);
  const sorted = sortContributionsByStudent(allContributions);
  const analyzed = analyzeContributions(sorted);

  return analyzed;
};

const getContributorsAllTeams = async () => {
  console.log('*******************************');
  console.log('***** THESIS TEAMS ************');
  console.log('*******************************\n');
  for (const team in thesisTeams) {
    const results1 = await getContributorsByTeam(thesisTeams, team);
    console.log(results1);
  }
  console.log('*******************************');
  console.log('***** GREENFIELD TEAMS ********');
  console.log('*******************************\n');
  for (const group in greenfieldTeams) {
    const results2 = await getContributorsByTeam(greenfieldTeams, group);
    console.log(results2);
  }
  console.log('*******************************');
  console.log('***** LEGACY TEAMS ************');
  console.log('*******************************\n');
  for (const gaggle in legacyTeams) {
    const results3 = await getContributorsByTeam(legacyTeams, gaggle);
    console.log(results3);
  }
};

getContributorsAllTeams();
