const { query } = require('../index');

module.exports = {
  addCohort: cohort =>
    query(`
      INSERT INTO cohorts (cohort_name, phase)
      VALUES ('${cohort.cohortName}', '${cohort.phase}')
    `)
      .then(() =>
        query(`
        SELECT * FROM cohorts WHERE cohort_name='${cohort.cohortName}'`)
          .then(res => ({
            id: res.rows[0].id,
            cohortName: res.rows[0].cohort_name,
            phase: res.rows[0].phase
          }))
          .catch(err => err)
      )
      .catch(err => err),

  updateCohort: async (cohortId, newCohortInfo) => {
    // update cohort
    console.log('In controller');
    try {
      const update = await query(`
        UPDATE cohorts SET (cohort_name, phase) = (
          '${newCohortInfo.cohort_name}',
          '${newCohortInfo.phase}'
        ) WHERE id = ${cohortId}
      `);

      if (update.rowCount) {
        console.log(`Updated cohort ${cohortId}`);
      } else {
        return 'unable to update cohort record';
      }
    } catch (error) {
      console.log(error);
      return error;
    }

    // retrieve updated cohort
    try {
      const cohort = await module.exports.getCohortById(cohortId);
      return cohort;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  getAllCohorts: async () => {
    try {
      const cohortQuery = await query('SELECT * FROM cohorts ORDER BY id ASC');
      const cohorts = cohortQuery.rows.map(row => ({
        id: row.id,
        cohortName: row.cohort_name,
        phase: row.phase
      }));
      return cohorts;
    } catch (err) {
      console.log(err.detal || err);
      return err;
    }
  },
  getCohortById: async cohortId => {
    try {
      const cohort = await query(`SELECT * FROM cohorts WHERE id=${cohortId}`);
      return cohort.rows[0];
    } catch (err) {
      console.log(err);
      return err;
    }
  }
};
