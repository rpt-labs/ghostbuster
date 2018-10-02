const { thesisTeams, greenfieldTeams, legacyTeams } = require('./teams');
const Team = require('./helpers/team');

const getContributorsByTeam = async (teamType, teamName) => {
  let orgName = teamType[teamName].github;
  let students = teamType[teamName].students;
  let team = new Team(teamName, orgName, students);
  const repos = await team.getRepos();
  const repoList = await team.getRepoNames(repos);
  const allContributions = await team.getAllContributors(repoList);
  const sorted = sortContributionsByStudent(allContributions);
  const analyzed = analyzeContributions(sorted);

  return analyzed;
}

const sortContributionsByStudent = (contributionData) => {
  let contributions = {};
  for (const contribution of contributionData) {
    if (contribution !== '') {

      if (contributions[contribution.login]) {
        contributions[contribution.login].numContributions += contribution.contributions;
      } else {
        contributions[contribution.login] = {numContributions: contribution.contributions};
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
  console.log('*******************************');
  console.log('***** THESIS TEAMS ************');
  console.log('*******************************\n');
  for (let team in thesisTeams) {
    let results1 = await getContributorsByTeam(thesisTeams, team);
    console.log(results1);
  }
  console.log('*******************************');
  console.log('***** GREENFIELD TEAMS ********');
  console.log('*******************************\n');
  for (let group in greenfieldTeams) {
    let results2 = await getContributorsByTeam(greenfieldTeams, group);
    console.log(results2);
  }
  console.log('*******************************');
  console.log('***** LEGACY TEAMS ************');
  console.log('*******************************\n');
  for (let gaggle in legacyTeams) {
    let results3 = await getContributorsByTeam(legacyTeams, gaggle);
    console.log(results3);
  }
}

getContributorsAllTeams();