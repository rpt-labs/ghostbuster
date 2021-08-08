const axios = require('axios');
require('dotenv').config();

const { API_BASE_URL: host, API_PORT: port } = process.env;

const getData = url =>
  axios
    .get(url)
    .then(response => response.data)
    .catch(err => console.log(err));

module.exports = {
  getCurrentCohorts: () => {
    const url = `${host}:${port}/api/cohorts/current`;
    return getData(url);
  },
  getSprints: () => {
    const url = `${host}:${port}/api/sprints`;
    return getData(url);
  }
};
