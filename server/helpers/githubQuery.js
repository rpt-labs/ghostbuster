const axios = require('axios');

const { GITHUB_UTIL_TOKEN, GITHUB_UTIL_URL } = process.env;

module.exports = async function githubQuery(githubUrl) {
  try {
    const response = await axios({
      method: 'post',
      url: GITHUB_UTIL_URL,
      data: { githubUrl },
      headers: {
        'x-api-key': GITHUB_UTIL_TOKEN,
        'content-type': 'application/json'
      }
    });

    return response.data.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
