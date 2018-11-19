
const { Api } = require('./Api');
const graphqlUrl =  '/graphql';
const expressUrl = '/ghostbuster';

const getCohortsQuery = '{cohorts{cohort_name phase students{first_name last_name github}}}';

const getAllCohorts = () => {
  return Api.get(graphqlUrl, {
    query: getCohortsQuery
  });
};

const getAllCohortsNoDb = () => {
  return Api.get(`${expressUrl}/cohorts`);
}

export { getAllCohorts, getAllCohortsNoDb }
