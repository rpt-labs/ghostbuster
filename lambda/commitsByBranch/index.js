exports.handler = async (event) => {
  let { github, cohort, repoName, branchName } = event;
  let data = await checkBranch(github, cohort, repoName, branchName);

  return {message: "success", data};
};

const axios = require('axios');
const AUTH_GITHUB_TOKEN = process.env.AUTH_GITHUB_TOKEN;

//check a particular branch for commits
async function checkBranch(githubHandle, cohort, repoName, branchName) {
  try {
    let response = await axios({
      method: 'get',
      url: `https://api.github.com/repos/${githubHandle}/${cohort}-${repoName}/commits?sha=${branchName}`,
      headers: {
        'Authorization': `token ${AUTH_GITHUB_TOKEN}`
      }
    });
    return response.data;
  } catch(error) {
    console.log(error);
  }
};
