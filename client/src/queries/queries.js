import Api from './Api';

const graphqlUrl = '/graphql';
const expressUrl = '/ghostbuster';

const getCohortsQuery =
  '{cohorts{name: cohortName phase students{firstName: first_name lastName: last_name github}}}';

const getAllCohorts = () =>
  Api.get(graphqlUrl, {
    query: getCohortsQuery
  });

const getAllCohortsNoDb = () => Api.get(`${expressUrl}/cohorts`);

export { getAllCohorts, getAllCohortsNoDb };
