
import Api from './Api';

const graphqlUrl = '/graphql';
const expressUrl = '/ghostbuster';

const getCohortsQuery = '{cohorts{cohort_name phase students{first_name last_name github}}}';

const getAllCohorts = () => Api.get(graphqlUrl, {
  query: getCohortsQuery
});

const getAllCohortsNoDb = () => Api.get(`${expressUrl}/cohorts`);

export { getAllCohorts, getAllCohortsNoDb };
