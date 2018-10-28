
const { Api } = require('./Api');
const graphqlUrl =  '/graphql';
const expressUrl = '/ghostbuster';

const getCohortsQuery = '{cohorts{name phase students{firstName lastName github}}}';

const getAllCohorts = () => {
  return Api.get(graphqlUrl, {
    query: getCohortsQuery
  });
};

export { getAllCohorts }
