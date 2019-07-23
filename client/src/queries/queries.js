import Api from './Api';

const graphqlUrl = '/graphql';
const expressUrl = '/ghostbuster';

const getCohortsQuery =
  '{cohorts{name: cohortName phase status id students{firstName: first_name lastName: last_name github status id}}}';

const getAllCohorts = () =>
  Api.get(graphqlUrl, {
    query: getCohortsQuery
  });

const getAllCohortsNoDb = () => Api.get(`${expressUrl}/cohorts`);

export { getAllCohorts, getAllCohortsNoDb };
