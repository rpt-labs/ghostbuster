exports.handler = async (event) => {
  let { github, cohort, repoName } = event;
  let data = await getBranches(github, cohort, repoName);

  return {message: "success", data};
};

const axios = require('axios');
const AUTH_GITHUB_TOKEN = process.env.AUTH_GITHUB_TOKEN;

//get all branches from a student's fork
async function getBranches(githubHandle, cohort, repoName) {
  try {
    let response = await axios({
      method: 'get',
      url: `https://api.github.com/repos/${githubHandle}/${cohort}-${repoName}/branches`,
      headers: {
        'Authorization': `token ${AUTH_GITHUB_TOKEN}`
      }
    });
    return response.data;
  } catch(error)  {
    //console.log(`Error checking branches for ${this.firstName}'s ${repoName}`);
  }
};
