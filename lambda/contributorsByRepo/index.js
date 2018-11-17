exports.handler = async (event) => {
  let { orgName, repoName } = event;
  let data = await getContributorsByRepo(orgName, repoName);

  return {message: "success", data};
};

const axios = require('axios');
const AUTH_GITHUB_TOKEN = process.env.AUTH_GITHUB_TOKEN;

//so node won't throw an error and crash when a team doesn't yet have any repos
process.on('uncaughtException', function (err) {
  console.log('Caught exception: ', err);
});

//get all contributors for a single org's repo
async function getContributorsByRepo(orgName, repoName) {
  try {
    let response = await axios({
      method: 'get',
      url: `https://api.github.com/repos/${orgName}/${repoName}/contributors`,
      headers: {
        'Authorization': `token ${AUTH_GITHUB_TOKEN}`
      }
    });
    return response.data;

  } catch(error) {
    console.log("In getContributors", error);
  }
};
