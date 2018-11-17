exports.handler = async (event) => {
  let { orgName, repoName, days } = event;
  let data = await getCommitsByRepo(orgName, repoName, days);

  return {message: "success", data};
};

const axios = require('axios');
const moment = require('moment');
const AUTH_GITHUB_TOKEN = process.env.AUTH_GITHUB_TOKEN;


//get all commits for a given time frame for a single org's repo
async function getCommitsByRepo(orgName, repoName, days) {
  const daysAgo = moment().subtract(days, 'days');
  try {
    let response = await axios({
      method: 'get',
      url: `https://api.github.com/repos/${orgName}/${repoName}/commits?since=${daysAgo}`,
      headers: {
        'Authorization': `token ${AUTH_GITHUB_TOKEN}`
      }
    });
    return response.data;
  } catch(error) {
    console.log(`In getCommitsByRepo, error retrieving ${repoName}`, error);
  }
};
