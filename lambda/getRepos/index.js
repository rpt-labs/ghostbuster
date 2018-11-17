exports.handler = async (event) => {
  let { orgName } = event;
  let data = await getRepos(orgName);

  return {message: "success", data};
};

const axios = require('axios');
const AUTH_GITHUB_TOKEN = process.env.AUTH_GITHUB_TOKEN;

//so node won't throw an error and crash when a team doesn't yet have any repos
process.on('uncaughtException', function (err) {
  console.log('Caught exception: ', err);
});

async function getRepos(orgName) {
  try {
    let response = await axios({
      method: 'get',
      url: `https://api.github.com/orgs/${orgName}/repos`,
      headers: {
        'Authorization': `token ${AUTH_GITHUB_TOKEN}`
      }
    });
    return response.data;
  } catch(error) {
    console.log("In getRepos", error);
  }
};
