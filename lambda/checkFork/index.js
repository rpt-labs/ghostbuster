exports.handler = async (event) => {
  let { github, cohort, repoName } = event;
  let data = await checkFork(github, cohort, repoName);

  return {message: "success", data};
};

const axios = require('axios');
const AUTH_GITHUB_TOKEN = process.env.AUTH_GITHUB_TOKEN;

//check a student's fork for a particular hack reactor repo
async function checkFork(githubHandle, cohort, repoName) {
  try {
    let response = await axios({
      method: 'get',
      url: `https://api.github.com/repos/${githubHandle}/${cohort}-${repoName}/commits`,
      headers: {
        'Authorization': `token ${AUTH_GITHUB_TOKEN}`
      }
    });
    return response.data;
  } catch(error) {
    return [{commit:{message: "no fork"}}];
  }
};
