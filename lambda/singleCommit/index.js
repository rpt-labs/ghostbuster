exports.handler = async (event) => {
  let { commit } = event;
  let data = await analyzeCommit(commit);

  return {message: "success", data};
};

const axios = require('axios');
const AUTH_GITHUB_TOKEN = process.env.AUTH_GITHUB_TOKEN;

//get more detailed info for a single commit
async function analyzeCommit(commit) {
  try {
    let response = await axios({
      method: 'get',
      url: commit.url,
      headers: {
        'Authorization': `token ${AUTH_GITHUB_TOKEN}`
      }
    });
    return response.data;
  } catch(error) {
    console.log("In analyzeCommit", error);
  }
};
