const { Api } = require('./Api');
const graphqlUrl = process.env.GRAPHQL_URL || '/graphql';
const expressUrl = process.env.EXPRESS_URL || 'http://localhost:1234/ghostbuster';

const getCohortsQuery = '{cohorts{name phase students{firstName lastName github}}}';

const getAllCohorts = () => {
  return Api.get(graphqlUrl, {
    query: getCohortsQuery
  });
};

export { getAllCohorts }
