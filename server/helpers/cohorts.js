const axios = require('axios');
require('dotenv').config();

const host = process.env.API_BASE_URL || 'http://localhost';
const port = 9001;

module.exports = {
  getCurrentCohorts: () => {
    const url = `${host}:${port}/api/cohorts/current`;
    return axios
      .get(url)
      .then(response => response.data)
      .catch(err => console.log(err));
  }
};
