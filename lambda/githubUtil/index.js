exports.handler = async (event) => {
  let { githubUrl } = event;
  let data = await queryGithub(githubUrl);

  data = data || [];
  return {message: "success", data};
};

const axios = require('axios');
const AUTH_GITHUB_TOKEN = process.env.AUTH_GITHUB_TOKEN;

async function queryGithub(url) {
  try {
    let response = await axios({
      method: 'get',
      url,
      headers: {
        'Authorization': `token ${AUTH_GITHUB_TOKEN}`
      }
    });
    return response.data;
  } catch(error) {
    console.log("In queryGithub", error);
  }
};
