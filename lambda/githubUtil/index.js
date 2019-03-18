const axios = require('axios');

const { AUTH_GITHUB_TOKEN } = process.env;

async function queryGithub(url) {
  try {
    const response = await axios({
      method: 'get',
      url,
      headers: {
        Authorization: `token ${AUTH_GITHUB_TOKEN}`
      }
    });
    return response.data;
  } catch (error) {
    console.log('In queryGithub', error);
  }
}
exports.handler = async event => {
  const { githubUrl } = event;
  let data = await queryGithub(githubUrl);

  data = data || [];
  return { message: 'success', data };
};
